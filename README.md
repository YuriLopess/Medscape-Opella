# Opella — Hub científico

Site estático (HTML + CSS + JS puro, sem build). Basta abrir `index.html` no navegador
ou servir a pasta com qualquer servidor estático (ex.: `python -m http.server`).

## Estrutura

```
index.html                  Home
<pagina>.html               Próximas páginas ficam na raiz (allegra.html, enterogermina.html,
                            os-cal.html, novalgina.html, politica-de-privacidade.html, termos-de-uso.html)
static/
  css/
    base.css                Fontes, tokens de cor/layout, reset, utilitários, títulos de seção
    icons.css               GERADO — SVGs embutidos (não editar; ver tools/build_icons.py)
    components.css          Partes comuns a todas as páginas: header, menu, busca, dizeres legais, footer
    home.css                Estilos exclusivos da home
    <pagina>.css            Um arquivo por página nova, se necessário
  js/
    main.js                 Comportamento global (menu mobile)
    carousel.js             Carrossel reutilizável (data-carousel)
  fonts/                    Opella Sans (Light, Regular, Bold) em woff2
  img/
    brand/                  Logo Opella (SVG)
    icons/                  Ícones SVG (fonte do icons.css)
    experts/                Fotos dos especialistas (reutilizáveis entre páginas)
    home/                   Imagens exclusivas da home
tools/
  build_icons.py            Regenera static/css/icons.css a partir de static/img/{brand,icons}
  extract_home_assets.py    Como os assets da home foram extraídos do .ai (referência)
```

## Convenções

- **Uma página nova** = um `.html` na raiz que inclui `base.css`, `icons.css`, `components.css`
  e, se precisar, o CSS dela. Header e footer são copiados da home; marque o item atual do menu
  com `aria-current="page"`.
- **Cores e medidas** vêm dos tokens em `base.css` (`--green-900`, `--cream`, cores de cada produto…).
- **Ícones**: salve o SVG em `static/img/icons/`, rode `python tools/build_icons.py` e use
  `<span class="i i-nome"></span>` (a cor segue `currentColor`).
- **Imagens**: WebP em 2x do tamanho exibido, em `static/img/<pagina>/`.
- O layout de referência é desktop 1440px; abaixo disso a página se adapta (tablet e celular).

## Pendências da home

- Links "Acesso principal" e "Ver mais" apontam para `#`. Cada um tem `data-doc="IDxx"` e um
  comentário `TODO` com o arquivo que a revisão pediu para vincular.
- A busca do header ainda não tem destino (`action="#"`).
- Os links "Ver publicações" e o menu apontam para as páginas de produto, que serão criadas.

## Arquivos de origem (temporários)

`Assets/`, `Opella_A_Home_Wireframe/` e o PDF de revisão podem ser apagados: tudo o que o site
usa já está em `static/`. **Não** coloque arquivos do site em `Assets/`: no Windows, `assets` e
`Assets` são a mesma pasta.
