// Roda depois do `vite build` (ver "build" no package.json): gera dist/.htaccess para Apache.
//
// O site é uma SPA: as rotas não existem como arquivos. O .htaccess
//   - serve o index.html nas rotas conhecidas (status 200);
//   - serve o index.html com status 404 em qualquer outro endereço (o React mostra "Página não encontrada");
//   - bloqueia arquivos com ponto e a listagem de pastas (403);
//   - deixa os arquivos de /assets (nome com hash) em cache por 1 ano e o index.html sem cache.
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

const htaccess = `# GERADO por tools/postbuild.mjs — não editar à mão.
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

writeFileSync(new URL('../dist/.htaccess', import.meta.url), htaccess);
console.log(`postbuild: dist/.htaccess com ${routes.length} rotas`);
