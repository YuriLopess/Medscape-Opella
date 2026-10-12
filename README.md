# Opella — Hub científico

Site em **React 19 + TypeScript**, com **Vite** e **React Router**.

```bash
npm install        # primeira vez
npm run dev        # desenvolvimento em http://localhost:5173
npm run build      # checa tipos e gera o site em dist/
npm run preview    # serve o build de dist/ em http://localhost:4173
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
| qualquer outra | Página não encontrada |

**Hospedagem:** como é uma SPA, o servidor precisa devolver o `index.html` para qualquer rota
(senão um F5 em `/allegra` dá 404). Exemplos: Netlify → arquivo `public/_redirects` com
`/* /index.html 200`; Vercel → `rewrites` para `/index.html`; Nginx → `try_files $uri /index.html`.
O `npm run preview` já faz isso.

## Estrutura

```
index.html                 Entrada do Vite (fontes pré-carregadas, favicon)
public/
  fonts/                   Opella Sans (woff2), servidas como /fonts/…
  documentos/              PDFs da SBP (ID13–ID15) para download, com os links limpos
  favicon.svg
src/
  main.tsx                 Monta o app com o roteador e os estilos globais
  App.tsx                  Tabela de rotas (gerada a partir dos dados)
  pages/                   Uma por tipo de página
    HomePage, ProductPage, DocumentPage, LegalPage, NotFoundPage
  components/
    layout/                PageShell (head + tema + header/footer), Header, Footer, ScrollToTop
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
- ID09: o PDF "Allegra D Mais que um descongestionante" (Documentos Relacionados) não foi entregue.
- Lorem ipsum (do próprio layout): só "Informações Regulatórias" do Os-Cal.
- `/os-cal/saude-ossea-feminina` ainda não tem link de entrada: definir de onde é acessada.
- Prévias da Shutterstock com marca d'água — trocar pela versão licenciada: card "Allegra D®"
  (stock-photo-…-2715886517) e card "Febre na Pediatria" (stock-photo-…-2537922789).
- Os-Cal: no layout o rótulo "DOCUMENTO CIENTÍFICO" do destaque sai azul sobre azul (ilegível);
  usado um lilás claro (`--feature-label` em themes.css).
- Novalgina: no .ai o ícone da busca é roxo (herdado do Os-Cal); mantido o laranja da Opella.
- A busca do header ainda não tem destino.

## Arquivos de origem

Os arquivos de design (.ai, fontes e imagens originais) foram removidos do projeto: tudo o que o
site usa já está em `src/` e `public/`. Os scripts `tools/extract_*.py` ficam como registro de como
cada imagem foi extraída e só rodam se as pastas `Opella_*` forem colocadas de volta na raiz.
**Não** coloque arquivos do site em `Assets/`: no Windows, `assets` e `Assets` são a mesma pasta.
