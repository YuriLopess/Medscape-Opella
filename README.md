# Opella — Hub científico

Site em **React 19 + TypeScript**, com **Vite** e **React Router**. O conteúdo fica atrás de
cadastro/login de profissional de saúde — veja [Login / acesso](#login--acesso).

```bash
npm install        # primeira vez
npm run dev        # desenvolvimento em http://localhost:5173 (front só; API precisa do Docker, ver abaixo)
npm run build      # checa tipos, gera o site em dist/ e copia o backend PHP pra junto
npm run preview    # serve o build de dist/ em http://localhost:4173 (sem PHP — só pra conferir o front)
```

## Rotas

| Rota | Página |
|---|---|
| `/` | Home |
| `/allegra`, `/enterogermina`, `/os-cal`, `/novalgina` | Página de cada marca |
| `/allegra/anti-histaminicos-em-doencas-alergicas` | Documento ID14 |
| `/enterogermina/uso-de-probioticos-em-criancas` | Documento ID15 |
| `/os-cal/saude-ossea-feminina` | Documento com o texto do ID02 (vídeo em destaque do Os-Cal) |
| `/novalgina/abordagem-da-febre-aguda` | Documento ID13 |
| `/<marca>/<slug>` | Artigos ID01–ID12 (lista em `data/articles/index.ts`) |
| `/politica-de-privacidade`, `/termos-de-uso` | Textos legais |
| `/busca?q=…` | Resultados da busca do cabeçalho |
| qualquer outra | Página não encontrada |

**Hospedagem:** todas as rotas do site passam por `index.php` (gerado em `dist/.htaccess` por
`tools/postbuild.mjs`), que decide entre a tela de cadastro/login e o app conforme a sessão — ver
a seção seguinte. **Publicação (servidor da Medscape):** no ar em https://opellahub.medscapegrupo.com
(raiz `site/public`), **com login** (banco MySQL local da Medscape, tabelas criadas em 16/10/2026).
`VPS=root@179.236.232.166 VPS_KEY=~/.ssh/hpn_deploy bash tools/deploy.sh` (versão com login; sem login,
só se preciso: `BUILD=build:publico` antes do comando) —
build local, envio à VPS liberada e FTP (lftp) de lá; as senhas ficam só em `~/.opella.env` na VPS.
Use `--dry-run` para simular.

## Login / acesso

O site inteiro é protegido por cadastro, nos mesmos moldes do HPN Eu Existo: backend PHP puro (sem
dependências) com MariaDB, mesma validação na tela e no servidor.

- `/` (e qualquer outra rota do app) é atendida pelo `index.php`: **sem sessão**, entrega a tela de
  cadastro/login (`src/gate/`, construída em `index.html`); **com sessão**, entrega o app
  (`home.html`) — na própria URL pedida, sem redirecionar, então um link direto pra `/allegra` volta
  pra lá depois do login.
- O código e os estilos do app (inclusive os artigos e documentos, carregados sob demanda) ficam em
  `private-files/` e só saem por `/private/*` (via `private.php`) pra quem tem sessão válida — não é
  só uma tela escondida no React, o bundle em si não é servido sem sessão.
- O cadastro pede nome, sobrenome, e-mail, senha (8 a 200 caracteres, letras e números, gravada só
  como hash bcrypt), CRM, UF e especialidade, mais a declaração de ser profissional de saúde. Regras
  iguais na tela (`src/gate/CadastroPage.tsx`) e no servidor (`backend/web/server/bootstrap.php`), que
  devolve o erro de cada campo pra aparecer embaixo dele. Quem já tem cadastro entra com e-mail + senha.
  A sessão dura 30 dias (cookie `opella_session`) ou até clicar em "Sair".
- Depois de 5 senhas erradas pro mesmo e-mail (ou 20 do mesmo IP) em 15 minutos, o login fica
  bloqueado por 15 minutos. O cadastro aceita até 20 tentativas por IP por hora. Limites em
  `backend/web/server/config.php`.
- **CRM:** não há consulta oficial — o site só recusa números claramente inventados (zeros,
  dígito repetido, sequência) e grava todo cadastro como `nao_verificado`.
- Um campo "armadilha" (honeypot) invisível recusa cadastros de robô sem dizer o motivo.

### Vercel (ambiente de teste)

A Vercel publica um build **estático, sem backend** (`npm run build:vercel`, configurado em
`vercel.json`): o login é checado no navegador contra um único usuário de teste e o cadastro avisa
que está em fase de testes (`src/gate/demo.ts`, ligado por `.env.demo`). A senha não fica no código,
só o SHA-256 dela com sal. **Não é proteção de verdade** — o código do app vai junto no build —,
serve só para demonstração. O login real (banco + sessão no servidor) é o da publicação na Medscape.

Para trocar a senha de teste: `printf '%s' "opellahub-teste-v1:NOVA_SENHA" | sha256sum` e cole o
resultado em `passwordSha256` no `demo.ts`.

### Rodando localmente

Requisitos: Node.js e Docker Desktop.

```bash
npm install
npm run build          # gera dist/ (front + backend PHP)
docker compose up -d   # Apache + PHP em http://localhost:8081, MariaDB na porta 3308
```

As portas (8081/3308) são diferentes das do projeto HPN (8080/3307) pra rodar os dois ao mesmo tempo.
`npm run dev` (porta 5173) ainda funciona pro front, mas a API precisa do Docker rodando — o proxy em
`vite.config.ts` encaminha `/api` pra `localhost:8081`.

### Publicação no servidor da Medscape

Mesmos requisitos do HPN: PHP 7.4+ com `pdo_mysql`, Apache com `mod_rewrite` e `AllowOverride All`
(`mod_headers` recomendado), MariaDB 10.x (ou MySQL 5.7+), HTTPS.

1. `npm run build`.
2. Enviar o **conteúdo** de `dist/` pra raiz pública por FTP. Confira abrindo `/server/config.php` no
   navegador — tem que dar 403.
3. Criar `backend/web/server/config.local.php` no servidor (nunca vai no build; veja o modelo abaixo),
   com permissão **644**.
4. **Só no primeiro deploy**, criar as tabelas: envie `backend/database/instalar.php` com um nome
   aleatório (ex.: `instalar-<aleatório>.php`) e `backend/database/schema.sql` pra `server/`. Abra o
   instalador uma vez (diagnóstico) e depois com `?criar=1`. Se o Apache não conseguir apagar os
   arquivos enviados por FTP, apague **pelo FTP** o instalador e o `schema.sql` em seguida.
   (Feito em 16/10/2026: as tabelas já existem em produção.)

Os passos 1 e 2 são o que o `tools/deploy.sh` faz. Pedidos HTTP vindos da VPS são barrados pela
Cloudflare (erro 1005), então um script temporário é enviado pela VPS e aberto deste computador.

Modelo do `config.local.php`:

```php
<?php
return [
    'db_host' => 'localhost',
    'db_name' => '...',
    'db_user' => '...',
    'db_pass' => '...',
];
```

## Estrutura

```
index.html                 Tela pública de cadastro/login (src/gate/main.tsx)
home.html                  App — só servido pelo index.php, com sessão válida (src/main.tsx)
404.html                   Página de erro (ErrorDocument do Apache)
backend/
  database/                schema.sql, instalar.php (instalador avulso pro servidor da Medscape)
  web/                     Copiado pra dist/ no build (vite.config.ts) — vira a raiz do site
    index.php              Decide entre cadastro/login e o app, conforme a sessão
    private.php            Entrega os scripts/estilos do app (private-files/) com checagem de sessão
    api/                   login.php, register.php, logout.php
    server/                bootstrap.php, config.php (negados por .htaccess, nunca servidos direto)
docker/                    Dockerfile (Apache + PHP, espelha o servidor da Medscape)
docker-compose.yml         Ambiente local: Apache+PHP (8081) e MariaDB (3308)
public/
  fonts/                   Opella Sans (woff2), servidas como /fonts/…
  documentos/              PDFs para download: SBP (ID13–ID15, com os links limpos) e o Allegra D do ID09
  favicon.svg
src/
  gate/                    Tela de cadastro/login (CadastroPage, Select, api.ts, data/ — CRM, UF, especialidades)
  main.tsx                 Monta o app com o roteador e os estilos globais
  App.tsx                  Tabela de rotas (gerada a partir dos dados)
  pages/                   Uma por tipo de página
    HomePage, ProductPage, DocumentPage, LegalPage, SearchPage, NotFoundPage
  search/search.ts         Busca no navegador (sem acento/maiúsculas, todas as palavras, ranking e trecho marcado)
  components/
    layout/                PageShell (head + tema + header/footer), Header, SearchBox, Footer, ScrollToTop
    search/                Resultado da busca (usado nas sugestões e na página /busca)
    ui/                    Icon, DocLink (link de conteúdo, pendente ou não), CarouselDots
    home/                  Seções da home (hero, áreas, especialistas, destaques, números, banners, dizeres legais)
    product/               Seções da página de marca
    document/              Banner com breadcrumb e barra lateral do documento
  hooks/
    useCarousel.ts         Carrossel circular (setas, pontos, swipe, teclado, autoplay com pausa)
    useReducedMotion.ts
  data/                    TODO o conteúdo do site
    brands.ts              Marcas: nome, rota, tema, área terapêutica + rotas fixas
    products/<marca>.tsx   Conteúdo de cada página de marca
    documents.tsx          Páginas de documento (banner, fonte, barra lateral)
    docs/                  Corpo dos documentos, carregado sob demanda (id13–15 GERADOS, id02 à mão)
    articles/              Artigos ID01–ID12, carregados sob demanda
    contents.tsx           Conteúdos de "Conteúdo adicional" (card + miniatura + link)
    home.tsx               Conteúdo da home
    legal/*.html           Política de Privacidade e Termos de Uso
  lib/
    types.ts               Tipos dos dados (ProductPageData, DocumentPageData…)
    assets.ts              img('pasta/arquivo.webp') → URL da imagem em src/assets/img
  styles/                  CSS global, na ordem de index.css
    base.css               Fontes, tokens de cor/layout, reset
    icons.css              GERADO por tools/build_icons.py
    components.css         Header, menu, busca, dizeres legais, footer
    themes.css             Cores e ajustes finos de cada marca (.theme-<marca>)
    home.css / product.css / document.css / legal.css
  assets/img/              Imagens (o Vite gera nomes com hash no build)
tools/                     Scripts Python de apoio (ícones, imagens dos .ai e dos PDFs, documentos da SBP)
  searchIndex.ts           Gera o índice da busca no build a partir de src/data (nada a manter à mão)
```

## Como fazer…

- **Mudar um texto, imagem ou link:** edite o arquivo em `src/data/`. Os componentes não têm conteúdo.
- **Atualizar um documento da SBP (ID13–ID15):** troque o PDF na raiz e rode
  `python tools/extract_sbp_docs.py` (regera `src/data/docs/id1x.tsx`, as figuras e o PDF de download).
  Não edite esses `.tsx` à mão; correções pontuais vão em `FIXES` no script.
- **Ligar um documento que chegou:** crie a entrada em `data/documents.tsx` (a rota é criada sozinha)
  e, nos lugares que apontam para ele, troque `{ doc: 'IDxx' }` por `{ to: '/rota', doc: 'IDxx' }`.
  Links sem `to` ficam pendentes (`href="#"`, não navegam); busque por `doc: 'ID` para achar todos.
- **Nova marca:** adicione em `data/brands.ts` e `lib/types.ts` (`BrandId`), crie
  `data/products/<marca>.tsx`, registre em `data/products/index.ts` e crie o tema em `styles/themes.css`.
- **Novo ícone:** salve o SVG em `src/assets/img/icons/`, rode `python tools/build_icons.py` e use
  `<Icon name="..." />` (adicione o nome em `IconName`).
- **Imagens:** WebP em 2x do tamanho exibido, em `src/assets/img/<pasta>/`, usadas com `img('<pasta>/arquivo.webp')`.
  Um caminho errado quebra já no `npm run dev`.

O layout de referência é desktop 1440px; abaixo disso as páginas se adaptam (tablet e celular).

## Fonte Nexa (pendente)

As páginas das marcas usam a família **Nexa** (Regular, Bold, Heavy e itálicos), ainda não entregue.
Até lá a Opella Sans é usada no lugar (`--font-allegra` em `base.css`). Ao receber os arquivos:

1. coloque os `.woff2` em `public/fonts/` (ex.: `Nexa-Regular.woff2`, `Nexa-Bold.woff2`, `Nexa-Heavy.woff2`);
2. declare os `@font-face` em `styles/base.css` com `font-family: "Nexa"` e pesos 400, 700 e 900;
3. recalibre os espaçamentos das páginas das marcas (as quebras de linha mudam com a fonte).

## Pendências de conteúdo

- Vídeos: nenhum "Ver vídeo" tem arquivo/URL ainda. O ID08 mostra o quadro do vídeo; com o link,
  preencha `youtubeId` no `<Video>` de `data/articles/id08.tsx`.
- Lorem ipsum (do próprio layout): só "Informações Regulatórias" do Os-Cal.
- `/os-cal/saude-ossea-feminina` ainda não tem link de entrada: definir de onde é acessada.
- Prévias da Shutterstock com marca d'água — trocar pela versão licenciada: card "Allegra D®"
  (stock-photo-…-2715886517) e card "Febre na Pediatria" (stock-photo-…-2537922789).
- Os-Cal: no layout o rótulo "DOCUMENTO CIENTÍFICO" do destaque sai azul sobre azul (ilegível);
  usado um lilás claro (`--feature-label` em themes.css).
- Novalgina: no .ai o ícone da busca é roxo (herdado do Os-Cal); mantido o laranja da Opella.
- A busca (sugestões no cabeçalho e a página `/busca`) não tem layout no .ai: segue o visual do site.

## Arquivos de origem

Os arquivos de design (.ai, fontes e imagens originais) foram removidos do projeto: tudo o que o
site usa já está em `src/` e `public/`. Os scripts `tools/extract_*.py` ficam como registro de como
cada imagem foi extraída e só rodam se as pastas `Opella_*` forem colocadas de volta na raiz.
Os PDFs do cliente (ID01–ID15 e o PDF de revisão) ficam em `fontes/`, fora do Git; os scripts
`extract_article_images.py` e `extract_sbp_docs.py` leem de lá.
**Não** coloque arquivos do site em `Assets/`: no Windows, `assets` e `Assets` são a mesma pasta.
