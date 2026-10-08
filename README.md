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
| `/os-cal/saude-ossea-feminina` | Documento (vídeo em destaque do Os-Cal) |
| `/novalgina/abordagem-da-febre-aguda` | Documento ID13 |
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
    documents.tsx          Conteúdo das páginas de documento
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
tools/                     Scripts Python de apoio (ícones e extração de assets dos .ai)
```

## Como fazer…

- **Mudar um texto, imagem ou link:** edite o arquivo em `src/data/`. Os componentes não têm conteúdo.
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

- Links para documentos ainda não entregues (ID01 a ID12) ficam pendentes; ID13, ID14 e ID15 já têm página.
- Vídeos: nenhum "Ver vídeo" tem arquivo/URL ainda (o conteúdo ID08 também tem vídeo).
- Corpo em lorem ipsum (do próprio layout): documentos ID13, ID15 e `/os-cal/saude-ossea-feminina`;
  "Informações Regulatórias" do Os-Cal.
- `/os-cal/saude-ossea-feminina` ainda não tem link de entrada: definir de onde é acessada.
- Prévias da Shutterstock com marca d'água — trocar pela versão licenciada: card "Allegra D®"
  (stock-photo-…-2715886517) e card "Febre na Pediatria" (stock-photo-…-2537922789).
- Os-Cal: no layout o rótulo "DOCUMENTO CIENTÍFICO" do destaque sai azul sobre azul (ilegível);
  usado um lilás claro (`--feature-label` em themes.css).
- Novalgina: no .ai o ícone da busca é roxo (herdado do Os-Cal); mantido o laranja da Opella.
- Banner do Enterogermina na home aponta para `/enterogermina` até o ID12 chegar.
- A busca do header ainda não tem destino.

## Arquivos de origem (temporários)

`Assets/`, `Opella_*/` e o PDF de revisão ficam fora do git e podem ser apagados: tudo o que o site
usa já está em `src/` e `public/`. Os scripts `tools/extract_*.py` só rodam enquanto essas pastas
existirem. **Não** coloque arquivos do site em `Assets/`: no Windows, `assets` e `Assets` são a mesma pasta.
