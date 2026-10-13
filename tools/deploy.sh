#!/usr/bin/env bash
# Publica o site no servidor da Medscape.
#
# A Medscape só aceita FTP vindo do IP liberado (a VPS da Hostinger), então o deploy sai da VPS:
#   1. build local (npm run build → dist/, com o .htaccess gerado);
#   2. dist/ empacotado e enviado à VPS por scp;
#   3. na VPS, o lftp espelha os arquivos na raiz pública da Medscape (apaga o que sobrou de versões antigas).
#
# As senhas do FTP ficam SÓ na VPS, em ~/.opella.env (chmod 600), e nunca passam por este computador:
#   FTP_HOST=194.224.158.215              (IP do servidor: o domínio passa pela Cloudflare, que não repassa FTP)
#   FTP_USER=usuario
#   FTP_PASS='senha'
#   FTP_DIR=site/public                   (raiz pública confirmada com arquivo de teste)
#
# Opella Hub: https://opellahub.medscapegrupo.com — VPS root@179.236.232.166 (chave ~/.ssh/hpn_deploy).
# dns:order inet força IPv4: a Medscape libera o IPv4 da VPS, que também tem IPv6.
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
set dns:order "inet"
set ftp:ssl-allow yes
set ssl:verify-certificate no
set net:max-retries 2
set net:timeout 20
mirror -R --delete --verbose=1 --parallel=4 $DRY \
  --exclude-glob config.php --exclude-glob .well-known/ \
  "$WORK/" "$FTP_DIR/"
bye
LFTP
echo "ok: ${DRY:+simulação de }publicação em $FTP_DIR"
REMOTE
