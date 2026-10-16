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
# server/config.local.php (credenciais do banco) é criado só no servidor e fica fora do espelhamento:
# o --delete nunca o apaga e nenhum deploy o sobrescreve.
#
# Opella Hub: https://opellahub.medscapegrupo.com — VPS root@179.236.232.166 (chave ~/.ssh/hpn_deploy).
# dns:order inet força IPv4: a Medscape libera o IPv4 da VPS, que também tem IPv6.
#
# Uso:  VPS=usuario@ip-da-vps [VPS_KEY=~/.ssh/chave] [BUILD=build] bash tools/deploy.sh [--dry-run]
#   --dry-run  mostra o que o lftp enviaria/apagaria, sem mudar nada no servidor.
set -euo pipefail

: "${VPS:?defina VPS=usuario@ip-da-vps}"
SSH_OPTS=(-o BatchMode=yes -o ConnectTimeout=15)
[[ -n "${VPS_KEY:-}" ]] && SSH_OPTS+=(-i "$VPS_KEY")
DRY=""
[[ "${1:-}" == "--dry-run" ]] && DRY="--dry-run"

cd "$(dirname "$0")/.."
echo "› build"
# BUILD escolhe a versão: build (padrão, com login: index.php + backend PHP + banco) ou
# build:publico (sem login, só se for preciso abrir o site sem cadastro).
BUILD="${BUILD:-build}"
echo "  (npm run $BUILD)"
npm run "$BUILD" --silent
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
# server/ sempre existe no pacote: se faltasse (ex.: build antigo, sem login), o --delete removeria a
# pasta inteira do servidor, e o --exclude abaixo não protegeria o config.local.php.
mkdir -p "$WORK/server"

# a senha vai por variável de ambiente (--env-password), não aparece na lista de processos
export LFTP_PASSWORD="$FTP_PASS"
lftp --env-password -u "$FTP_USER" "$FTP_HOST" <<LFTP
set dns:order "inet"
set ftp:ssl-allow yes
set ssl:verify-certificate no
set net:max-retries 2
set net:timeout 20
mirror -R --delete --verbose=1 --parallel=4 $DRY \
  --exclude '^server/config\.local\.php$' --exclude-glob .well-known/ \
  "$WORK/" "$FTP_DIR/"
bye
LFTP
# Os arquivos de entrada têm sempre o mesmo nome e quase sempre o mesmo tamanho; se a data do servidor
# parecer mais nova (fuso), o mirror pula e o site fica apontando para scripts já apagados. Então eles
# sobem sempre, por último, depois que os assets novos já estão no lugar.
if [[ -z "$DRY" ]]; then
  ENTRY=""
  for f in .htaccess index.html index.php home.html 404.html private.php; do
    [[ -f "$WORK/$f" ]] && ENTRY+="put \"$WORK/$f\" -o \"$FTP_DIR/$f\"; chmod 644 \"$FTP_DIR/$f\"; "
  done
  lftp --env-password -u "$FTP_USER" "$FTP_HOST" -e "set dns:order inet; set ftp:ssl-allow yes; set ssl:verify-certificate no; set net:max-retries 2; $ENTRY bye"
fi
echo "ok: ${DRY:+simulação de }publicação em $FTP_DIR"
REMOTE
