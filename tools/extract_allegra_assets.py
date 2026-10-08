"""Extrai os assets das páginas do Allegra a partir de "Opella B - Allegra.ai".

Prancheta 0 = allegra.html (landing) · prancheta 1 = página de documento (ID14).
Regiões raster são renderizadas em 2x de uma cópia sem textos, como na home.

Uso:  python tools/extract_allegra_assets.py
Dependências: pip install pymupdf pillow
"""
import io, os
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AI = os.path.join(ROOT, 'Opella_B_Allegra', 'Opella B - Allegra.ai')
LINKS = os.path.join(ROOT, 'Opella_B_Allegra', 'Links')
OUT = os.path.join(ROOT, 'static', 'img')


def textless(n):
    d = pymupdf.open(AI, filetype='pdf')
    p = d[n]
    p.add_redact_annot(p.rect)
    p.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE,
                       graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
    return d, p


def save(page, rect, name, scale=2, q=82):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=pymupdf.Rect(rect))
    im = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    path = os.path.join(OUT, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=q, method=6)
    print(f'   {name:52} {im.size}  {os.path.getsize(path) // 1024} KB')


# ---------- Landing (prancheta 0) ----------
d0, p0 = textless(0)
save(p0, (55, 136, 1386, 417), 'allegra/hero.webp', q=85)
save(p0, (55, 452.7, 719, 905.5), 'allegra/destaque-anti-histaminicos.webp')
save(p0, (720, 1067.5, 1385, 1756.8), 'allegra/video-manejo-doencas-alergicas.webp')
save(p0, (121.7, 1353, 166.7, 1398), 'experts/carlos-mauricio-avatar.webp', scale=3)
for slug, x in [('sedacao-nao-e-sono', 55.7), ('allegra-d-descongestionante', 513.0), ('muito-alem-da-sonolencia', 970.4)]:
    save(p0, (x, 1920.6, x + 414.6, 2058), f'conteudos/{slug}-card.webp')
save(p0, (499, 2761, 704, 2883), 'areas/tile-enterogermina.webp', q=85)
save(p0, (813, 2760, 1019, 2884), 'areas/tile-oscal.webp', q=85)
save(p0, (1129, 2761, 1332, 2884), 'areas/tile-novalgina.webp', q=85)

pack = Image.open(os.path.join(LINKS, 'Allegra120MG_Esquerda.png'))
pack = pack.resize((1140, round(1140 * pack.height / pack.width)), Image.LANCZOS)
pack.save(os.path.join(OUT, 'allegra/produto-allegra-120mg.webp'), 'WEBP', quality=86, method=6)
print('   allegra/produto-allegra-120mg.webp', pack.size)

# ---------- Página de documento (prancheta 1) ----------
d1, p1 = textless(1)
save(p1, (55, 142, 1386, 422.5), 'allegra/banner-documento.webp', q=85)
save(p1, (55, 456, 1016, 1097), 'conteudos/anti-histaminicos-eventos-adversos.webp')
for slug, y in [('sedacao-nao-e-sono', 570), ('allegra-d-descongestionante', 705), ('muito-alem-da-sonolencia', 836)]:
    save(p1, (1089.5, y, 1180, y + 91), f'conteudos/{slug}-thumb.webp', scale=3)
save(p1, (1081, 1112, 1366.5, 1217), 'areas/card-enterogermina.webp', q=85)
save(p1, (1081, 1237.7, 1366.5, 1341.6), 'areas/card-oscal.webp', q=85)
save(p1, (1081, 1362.6, 1366.5, 1466.5), 'areas/card-novalgina.webp', q=85)
