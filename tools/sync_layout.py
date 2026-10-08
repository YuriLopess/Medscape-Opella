"""Sincroniza header e footer de todas as páginas a partir do index.html.

O index.html é a fonte. Em cada outra página, os blocos entre os comentários
"===================== Header" ... </header> e "===================== Footer" ... </footer>
são substituídos. O item ativo do menu (aria-current) é definido por página:

  <body data-section="allegra.html">   -> marca "Allegra" no menu
  sem data-section                     -> marca o link para o próprio arquivo, se houver

Uso:  python tools/sync_layout.py
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
HEADER = re.compile(r'  <!-- =+ Header =+ -->.*?</header>\n', re.S)
FOOTER = re.compile(r'  <!-- =+ Footer =+ -->.*?</footer>\n', re.S)

home = (ROOT / 'index.html').read_text(encoding='utf-8')
header = HEADER.search(home).group(0).replace(' aria-current="page"', '')
footer = FOOTER.search(home).group(0).replace(' aria-current="page"', '')


def mark(block, target):
    return block.replace(f'href="{target}"', f'href="{target}" aria-current="page"', 1) if target else block


for page in sorted(ROOT.glob('*.html')):
    if page.name == 'index.html' or page.name.startswith('_'):
        continue
    html = page.read_text(encoding='utf-8')
    if not HEADER.search(html) or not FOOTER.search(html):
        print(f'{page.name}: sem marcadores de header/footer, ignorada')
        continue
    m = re.search(r'<body[^>]*data-section="([^"]+)"', html)
    section = m.group(1) if m else page.name
    new = HEADER.sub(lambda _: mark(header, section), html, count=1)
    new = FOOTER.sub(lambda _: mark(footer, page.name), new, count=1)
    if new != html:
        page.write_text(new, encoding='utf-8', newline='\n')
        print(f'{page.name}: atualizada (menu: {section})')
    else:
        print(f'{page.name}: ok')
