# Opella — Hub científico

Site estático (HTML + CSS + JS puro, sem build). Basta abrir `index.html` no navegador
ou servir a pasta com qualquer servidor estático (ex.: `python -m http.server`).

## Estrutura

```
index.html                    Home
allegra.html                  Página de produto: Allegra (alergia)
enterogermina.html            Página de produto: Enterogermina (saúde digestiva)
os-cal.html                   Página de produto: Os-Cal (saúde óssea da mulher)
<marca>-<documento>.html      Páginas de documento de cada área (ex.: allegra-anti-histaminicos-em-doencas-alergicas)
politica-de-privacidade.html  Medscape Network Privacy Policy
termos-de-uso.html            Medscape Network Terms of Use
static/
  css/
    base.css                  Fontes, tokens de cor/layout, reset, utilitários, títulos de seção
    icons.css                 GERADO — SVGs embutidos (não editar; ver tools/build_icons.py)
    components.css            Comum a todas as páginas: header, menu, busca, dizeres legais, footer
    themes.css                Cores, fonte e ajustes finos de cada marca (.theme-allegra, .theme-enterogermina, .theme-oscal, …)
    product.css               Modelo de página de produto (banner, destaque, vídeo, conteúdo adicional…)
    document.css              Modelo de página de documento (banner com breadcrumb, texto, barra lateral)
    home.css                  Exclusivo da home
    legal.css                 Páginas legais (texto justificado, listas aninhadas de até 4 níveis)
  js/
    main.js                   Comportamento global (menu mobile)
    carousel.js               Carrossel reutilizável (data-carousel)
  fonts/                      Opella Sans (Light, Regular, Bold) em woff2
  img/
    brand/                    Logo Opella (SVG)
    icons/                    Ícones SVG (fonte do icons.css)
    experts/                  Fotos dos especialistas (reutilizáveis entre páginas)
    areas/                    Tiles das áreas terapêuticas ("Explore outras áreas")
    conteudos/                Imagens de cada conteúdo/documento (card, miniatura, destaque)
    home/, allegra/, …        Imagens exclusivas de cada página
tools/
  sync_layout.py              Copia header e footer do index.html para todas as páginas
  build_icons.py              Regenera static/css/icons.css a partir de static/img/{brand,icons}
  extract_*_assets.py         Como os assets de cada página foram extraídos do .ai (referência)
```

## Convenções

- **Header e footer** só se editam no `index.html`; depois rode `python tools/sync_layout.py`.
  Nas outras páginas eles aparecem como stub e o script preenche:
  ```html
  <body class="theme-allegra" data-section="allegra.html">
    <!-- ===================== Header ===================== -->
    </header>
    …
    <!-- ===================== Footer ===================== -->
    </footer>
  ```
  `data-section` define qual item do menu fica ativo (documentos apontam para a página da marca).
- **Página de produto** = `themes.css` + `product.css` e `<body class="theme-<marca>">`.
  **Página de documento** = `themes.css` + `document.css`. Uma marca nova só precisa de um tema
  em `themes.css`.
- **Cores e medidas** vêm dos tokens em `base.css` e dos temas em `themes.css`.
- **Ícones**: salve o SVG em `static/img/icons/`, rode `python tools/build_icons.py` e use
  `<span class="i i-nome"></span>` (a cor segue `currentColor`).
- **Imagens**: WebP em 2x do tamanho exibido.
- O layout de referência é desktop 1440px; abaixo disso a página se adapta (tablet e celular).

## Fonte Nexa (pendente)

As páginas do Allegra usam a família **Nexa** (Regular, Bold, Heavy), ainda não entregue.
Até lá a Opella Sans é usada no lugar (`--font-allegra` em `base.css`). Ao receber os arquivos:

1. coloque os `.woff2` em `static/fonts/` (ex.: `Nexa-Regular.woff2`, `Nexa-Bold.woff2`, `Nexa-Heavy.woff2`);
2. declare os `@font-face` em `base.css` com `font-family: "Nexa"` e pesos 400, 700 e 900;
3. recalibre os espaçamentos das páginas do Allegra (as quebras de linha mudam com a fonte).

## Pendências

- Links para documentos ainda não entregues apontam para `#`. Cada um tem `data-doc="IDxx"` e um
  comentário `TODO` com o arquivo que a revisão pediu para vincular (ID01, 02, 03, 07, 08, 09, 10,
  11, 12, 13). ID14 e ID15 já têm página.
- Vídeos: "Ver vídeo" (Allegra) e o conteúdo ID08 precisam do arquivo/URL do vídeo.
- A imagem do card "Allegra D®" é uma prévia da Shutterstock com marca d'água
  (stock-photo-…-2715886517): trocar pela versão licenciada.
- Página de documento: o círculo laranja ao lado da fonte (SBP) é um espaço reservado do layout,
  provavelmente para o logo da instituição.
- Documento ID15 (Enterogermina) e `oscal-saude-ossea-feminina.html`: o corpo é o lorem ipsum do
  próprio layout; aguardando o texto.
- `oscal-saude-ossea-feminina.html` ainda não tem link de entrada: o título é o do vídeo em destaque
  do Os-Cal e a fonte aponta para o ID02. Definir de onde a página é acessada.
- Os-Cal: o texto de "Informações Regulatórias" é lorem ipsum no layout.
- Os-Cal: no layout o rótulo "DOCUMENTO CIENTÍFICO" do destaque sai azul sobre azul (ilegível);
  foi usado um lilás claro (`--feature-label` em themes.css).
- A busca do header ainda não tem destino (`action="#"`).

## Arquivos de origem (temporários)

`Assets/`, `Opella_*/` e o PDF de revisão ficam fora do git e podem ser apagados: tudo o que o
site usa já está em `static/`. **Não** coloque arquivos do site em `Assets/`: no Windows, `assets` e
`Assets` são a mesma pasta.
