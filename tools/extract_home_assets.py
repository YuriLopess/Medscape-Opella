"""Extrai os assets da home a partir do arquivo Illustrator (.ai é compatível com PDF).

Regiões raster são renderizadas de uma cópia da prancheta sem textos, para que
máscaras, degradês e sobreposições fiquem idênticos ao layout. Ícones e o logo
Opella são reconstruídos como SVG a partir dos vetores.

Referência para as próximas páginas: as pastas de origem são temporárias, então
este script só roda enquanto elas existirem. Os resultados já estão em src/assets/img e public/fonts.

Uso:  python tools/extract_home_assets.py <pasta 003_Opella_Fonts extraída do zip>
Dependências: pip install pymupdf pillow
"""
import os, io, shutil, sys
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AI = os.path.join(ROOT, 'Opella_A_Home_Wireframe', 'Opella_Home_Wireframe.ai')
LINKS = os.path.join(ROOT, 'Opella_A_Home_Wireframe', 'Links')
FONTS = sys.argv[1]  # pasta de fontes extraída de Assets/Opella-Code-Brand.zip
OUT = os.path.join(ROOT, 'src', 'assets')
FONTS_OUT = os.path.join(ROOT, 'public', 'fonts')

for sub in ('img/home', 'img/brand', 'img/icons', 'img/experts'):
    os.makedirs(os.path.join(OUT, sub), exist_ok=True)


# ---------- raster ----------
def text_free_page():
    d = pymupdf.open(AI, filetype='pdf')
    p = d[0]
    p.add_redact_annot(p.rect)
    p.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                       graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
    # drop vector overlays that will be rebuilt in HTML (badges, banner button)
    for r in [(74, 1982, 309, 2014), (526, 1982, 809, 2014), (979, 1982, 1214, 2014),
              (1176, 2908, 1330, 2961)]:
        p.add_redact_annot(pymupdf.Rect(r))
    p.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                       graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)
    p.delete_image(16)  # banner product packshot -> separate transparent PNG
    return d, p


def render(page, rect, scale=2):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=pymupdf.Rect(rect))
    return Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')


def save_webp(im, name, q=82):
    path = os.path.join(OUT, name)
    im.save(path, 'WEBP', quality=q, method=6)
    print('  ', name, im.size, os.path.getsize(path) // 1024, 'KB')


doc, page = text_free_page()

save_webp(render(page, (956, 123, 1356, 523), 2), 'img/home/hero-medicos.webp')

for slug, x in [('allegra', 90), ('enterogermina', 409), ('oscal', 728), ('novalgina', 1047)]:
    save_webp(render(page, (x, 740, x + 303, 983), 2), f'img/home/area-{slug}.webp', 85)

for slug, x in [('flavio-melo', 57), ('carlos-mauricio', 393), ('lucia-costa-paiva', 1066)]:
    save_webp(render(page, (x, 1410, x + 128, 1733), 2), f'img/experts/{slug}.webp')

for slug, x in [('anti-histaminicos', 56), ('probioticos', 508), ('febre-aguda', 961)]:
    save_webp(render(page, (x, 1959, x + 425, 2145), 2), f'img/home/destaque-{slug}.webp')

# banner texture: left art fades into the flat brand purple on the right
bg = render(page, (55, 2843, 1108, 3044), 2)
flat = (0x87, 0x00, 0x80)
w, h = bg.size
fade = 240
for i in range(fade):
    a = i / fade
    for y in range(h):
        c = bg.getpixel((w - fade + i, y))
        bg.putpixel((w - fade + i, y), tuple(round(c[k] * (1 - a) + flat[k] * a) for k in range(3)))
save_webp(bg, 'img/home/banner-allegra-bg.webp')

pack = Image.open(os.path.join(LINKS, 'Mockup_AllegraKIDS_Copinho_150ml_Frente 600px.png'))
pack.save(os.path.join(OUT, 'img/home/banner-allegra-produto.webp'), 'WEBP', quality=88, method=6)
print('   img/home/banner-allegra-produto.webp', pack.size)


# ---------- vector ----------
src = pymupdf.open(AI, filetype='pdf')[0]
drawings = src.get_drawings()


def fmt(v):
    s = f'{v:.2f}'.rstrip('0').rstrip('.')
    return '0' if s == '-0' else s


def to_svg(region, name, mode='fill', pad=0, color='currentColor'):
    x0, y0, x1, y1 = region
    paths = []
    for dr in drawings:
        r = dr['rect']
        if not (r.x0 >= x0 - 1 and r.y0 >= y0 - 1 and r.x1 <= x1 + 2 and r.y1 <= y1 + 2):
            continue
        if r.width < 0.5 and r.height < 0.5:
            continue
        if mode == 'fill' and not dr.get('fill'):
            continue
        if mode == 'stroke' and not dr.get('color'):
            continue
        d, cur = [], None
        for it in dr['items']:
            op = it[0]
            if op == 're':
                rc = it[1]
                d.append(f'M{fmt(rc.x0-x0+pad)} {fmt(rc.y0-y0+pad)}h{fmt(rc.width)}v{fmt(rc.height)}h{fmt(-rc.width)}Z')
                cur = None
                continue
            if op == 'qu':
                q = it[1]
                pts = [q.ul, q.ur, q.lr, q.ll]
                d.append('M' + 'L'.join(f'{fmt(p.x-x0+pad)} {fmt(p.y-y0+pad)}' for p in pts) + 'Z')
                cur = None
                continue
            start = it[1]
            if cur is None or abs(cur.x - start.x) > 0.01 or abs(cur.y - start.y) > 0.01:
                d.append(f'M{fmt(start.x-x0+pad)} {fmt(start.y-y0+pad)}')
            if op == 'l':
                p = it[2]
                d.append(f'L{fmt(p.x-x0+pad)} {fmt(p.y-y0+pad)}')
            elif op == 'c':
                c1, c2, p = it[2], it[3], it[4]
                d.append('C' + ' '.join(f'{fmt(q.x-x0+pad)} {fmt(q.y-y0+pad)}' for q in (c1, c2, p)))
            cur = it[-1]
        if dr.get('closePath'):
            d.append('Z')
        attrs = f'd="{"".join(d)}"'
        if mode == 'fill':
            if dr.get('even_odd'):
                attrs += ' fill-rule="evenodd"'
        else:
            attrs += f' stroke-width="{fmt(dr.get("width") or 1)}"'
        paths.append(f'<path {attrs}/>')
    vw, vh = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
    if mode == 'fill':
        g = f'<g fill="{color}">'
    else:
        g = f'<g fill="none" stroke="{color}" stroke-linecap="round" stroke-linejoin="round">'
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {fmt(vw)} {fmt(vh)}" '
           f'width="{fmt(vw)}" height="{fmt(vh)}" aria-hidden="true">{g}{"".join(paths)}</g></svg>\n')
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
        f.write(svg)
    print('  ', name, len(paths), 'paths')


to_svg((55, 66, 200, 107), 'img/brand/opella-logo.svg')
to_svg((1359, 73, 1378, 92), 'img/icons/search.svg')
to_svg((335, 1053, 349, 1068), 'img/icons/arrow-right.svg')
to_svg((29, 1526, 42, 1551), 'img/icons/chevron-left.svg', 'stroke', pad=2)
to_svg((1400, 1526, 1413, 1551), 'img/icons/chevron-right.svg', 'stroke', pad=2)
to_svg((1321, 3155, 1346, 3168), 'img/icons/chevron-up.svg', 'stroke', pad=2)
to_svg((85, 2626, 170, 2697), 'img/icons/stat-conteudos.svg')
to_svg((418, 2624, 512, 2692), 'img/icons/stat-especialistas.svg')
to_svg((739, 2625, 814, 2697), 'img/icons/stat-areas.svg')
to_svg((1078, 2636, 1137, 2695), 'img/icons/stat-atualizacao.svg')

# ---------- fonts ----------
fam = os.path.join(FONTS, 'Opella Full Family_All formats', 'Opella Sans', 'WOFF2')
for f in ('OpellaSans-Regular.woff2', 'OpellaSans-Bold.woff2', 'OpellaSans-Light.woff2'):
    shutil.copy(os.path.join(fam, f), os.path.join(FONTS_OUT, f))
print('   fonts copied')

