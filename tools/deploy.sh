#!/usr/bin/env bash
# Publica o site no servidor da Medscape.
#
# A Medscape só aceita FTP vindo do IP liberado (a VPS da Hostinger), então o deploy sai da VPS:
#   1. build local (npm run build → dist/, com o .htaccess gerado);
#   2. dist/ empacotado e enviado à VPS por scp;
#   3. na VPS, o lftp espelha os arquivos na raiz pública da Medscape (apaga o que sobrou de versões antigas).
#
# As senhas do FTP ficam SÓ na VPS, em ~/.opella.env (chmod 600), e nunca passam por este computador:
#   FTP_HOST=ftp.exemplo.com
#   FTP_USER=usuario
#   FTP_PASS='senha'
#   FTP_DIR=/caminho/da/raiz/publica      (descoberto no passo 3 do guia; ex.: site/public)
#
# Uso:  VPS=usuario@ip-da-vps [VPS_KEY=~/.ssh/chave] bash tools/deploy.sh [--dry-run]
#   --dry-run  mostra o que o lftp enviaria/apagaria, sem mudar nada no servidor.
set -euo pipefail

: "${VPS:?defina VPS=usuario@ip-da-vps}"
SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=15)
[[ -n "${VPS_KEY:-}" ]] && SSH_OPTS+=(-i "$VPS_KEY")
DRY=""
[[ "${1:-}" == "--dry-run" ]] && DRY="--dry-run"

cd "$(dirname "$0")/.."
echo "› build"
npm run build --silent
test -f dist/index.html && test -f dist/.htaccess

PKG="opella-$(date +%Y%m%d-%H%M%S).tar.gz"
echo "› empacotando $PKG"
tar -czf "/tmp/$PKG" -C dist .

echo "› enviando à VPS"
scp "${SSH_OPTS[@]}" "/tmp/$PKG" "$VPS:/tmp/$PKG"
rm -f "/tmp/$PKG"

echo "› publicando via FTP ${DRY:+(simulação)}"
ssh "${SSH_OPTS[@]}" "$VPS" PKG="$PKG" DRY="$DRY" 'bash -s' <<'REMOTE'
set -euo pipefail
ENV="$HOME/.opella.env"
[[ -f "$ENV" ]] || { echo "faltando $ENV na VPS"; exit 1; }
[[ "$(stat -c %a "$ENV")" == "600" ]] || { echo "$ENV precisa de chmod 600"; exit 1; }
set -a; . "$ENV"; set +a
: "${FTP_HOST:?}" "${FTP_USER:?}" "${FTP_PASS:?}" "${FTP_DIR:?}"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK" "/tmp/$PKG"' EXIT
tar -xzf "/tmp/$PKG" -C "$WORK"

# a senha vai por variável de ambiente (--env-password), não aparece na lista de processos
export LFTP_PASSWORD="$FTP_PASS"
lftp --env-password -u "$FTP_USER" "$FTP_HOST" <<LFTP
set ftp:ssl-allow yes
set net:max-retries 2
set net:timeout 20
mirror -R --delete --verbose=1 --parallel=4 $DRY \
  --exclude-glob config.php --exclude-glob .well-known/ \
  "$WORK/" "$FTP_DIR/"
bye
LFTP
echo "ok: publicado em $FTP_DIR"
REMOTE
