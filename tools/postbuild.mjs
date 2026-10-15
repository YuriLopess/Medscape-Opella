// Roda depois do `vite build` (ver "build" no package.json): gera dist/.htaccess para Apache.
//
// `--publico` (npm run build:publico): versão SEM login — as rotas servem o index.html (app direto),
// endereço inexistente responde 404, dotfiles e listagem de pastas bloqueados, cache dos assets.
//
// Sem a flag: o site inteiro fica atrás de login (ver README, seção "Login / acesso"): toda rota do app passa
// por index.php, que decide servir a tela de cadastro (sem sessão) ou o app (com sessão). O
// .htaccess também
//   - nega acesso direto a home.html (só index.php pode servi-lo, depois de checar a sessão);
//   - roteia /private/* para private.php, que só libera os scripts/estilos do app com sessão válida;
//   - bloqueia arquivos com ponto e a listagem de pastas (403);
//   - deixa os arquivos de /assets (nome com hash) em cache por 1 ano.
// A lista de rotas sai dos próprios dados do site, então uma página nova entra sozinha.
import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

const brands = Object.fromEntries(
  [...read('src/data/brands.ts').matchAll(/^\s{2}(\w+): \{\s*\n\s*id: '\w+',[\s\S]*?path: '([^']+)'/gm)].map((m) => [m[1], m[2]]),
);
const fixed = [...read('src/data/brands.ts').matchAll(/^\s{2}\w+: '(\/[^']*)',$/gm)].map((m) => m[1]);
const docs = [...read('src/data/documents.tsx').matchAll(/brand: '(\w+)',\s*\n\s*slug: '([^']+)'/g)].map(
  (m) => `${brands[m[1]]}/${m[2]}`,
);
const articles = [...read('src/data/articles/index.ts').matchAll(/brand: '(\w+)', slug: '([^']+)'/g)].map(
  (m) => `${brands[m[1]]}/${m[2]}`,
);

const routes = [...new Set([...fixed, ...Object.values(brands), ...docs, ...articles])].filter((r) => r !== '/');
if (Object.keys(brands).length < 4 || docs.length < 4 || articles.length < 12) {
  throw new Error(`postbuild: rotas incompletas (marcas ${Object.keys(brands).length}, docs ${docs.length}, artigos ${articles.length})`);
}
const pattern = routes.map((r) => r.slice(1).replace(/[.+*?^$()[\]{}|\\]/g, '\\$&')).join('|');

const htaccessPublico = `# GERADO por tools/postbuild.mjs — não editar à mão.
Options -Indexes
DirectoryIndex index.html
AddDefaultCharset utf-8

# endereço inexistente: index.html com status 404 (o app mostra a página "não encontrada")
ErrorDocument 404 /index.html

# arquivos e pastas com ponto (.htaccess, .git, .env…): 403
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule (^|/)\\. - [F]

  # rotas do site (${routes.length}): servem o index.html com status 200
  RewriteRule ^(${pattern})/?$ index.html [L]
</IfModule>

<IfModule mod_mime.c>
  AddType font/woff2 .woff2
  AddType image/webp .webp
  AddType image/svg+xml .svg
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  <FilesMatch "^index\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 week"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript image/svg+xml
</IfModule>
`;

const htaccessLogin = `# GERADO por tools/postbuild.mjs — não editar à mão.
DirectoryIndex index.php
Options -Indexes
AddDefaultCharset utf-8
ErrorDocument 404 /404.html

# home.html só é servido pelo index.php, depois de checar a sessão.
<Files "home.html">
  Require all denied
</Files>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule (^|/)\\. - [F]

  # scripts e estilos do app: passam pela checagem de sessão em private.php
  RewriteRule ^private/(.+)$ private.php?f=$1 [B,L,QSA]

  # rotas do app (${routes.length}): passam por index.php, que decide cadastro/login ou o app
  RewriteRule ^(${pattern})/?$ index.php [L]
</IfModule>

<IfModule mod_mime.c>
  AddType font/woff2 .woff2
  AddType image/webp .webp
  AddType image/svg+xml .svg
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"

  <FilesMatch "^[\\w-]+-[\\w-]{8}\\.(js|css|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "^(index|home)\\.(html|php)$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/pdf "access plus 1 week"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript image/svg+xml
</IfModule>
`;

const publico = process.argv.includes('--publico');
writeFileSync(new URL('../dist/.htaccess', import.meta.url), publico ? htaccessPublico : htaccessLogin);
console.log(`postbuild: dist/.htaccess com ${routes.length} rotas (${publico ? 'site público, sem login' : 'todas atrás do login'})`);
