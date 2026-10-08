"""Extrai os assets das páginas do Enterogermina a partir de "Opella C - Enterogermina.ai".

Prancheta 0 = enterogermina.html (landing) · prancheta 1 = página de documento (ID15).
Neste layout os tiles de Os-Cal e Novalgina em "Explore outras áreas" são lisos (sem a arte
de fundo do layout do Allegra), por isso ganham o sufixo -flat.

Uso:  python tools/extract_enterogermina_assets.py
Dependências: pip install pymupdf pillow
"""
import io, os
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AI = os.path.join(ROOT, 'Opella_C_Enterogermina', 'Opella C - Enterogermina.ai')
OUT = os.path.join(ROOT, 'src', 'assets', 'img')


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
    print(f'   {name:56} {im.size}  {os.path.getsize(path) // 1024} KB')


# ---------- Landing (prancheta 0) ----------
d0, p0 = textless(0)
save(p0, (55, 136, 1386, 417), 'enterogermina/hero.webp', q=85)
save(p0, (55, 452.7, 719, 1026.4), 'enterogermina/destaque-probioticos.webp')
save(p0, (720, 1188.4, 1385, 1825), 'enterogermina/video-antibioticoterapia.webp')
save(p0, (121.7, 1480.8, 166.7, 1525.8), 'experts/flavio-melo-avatar.webp', scale=3)
for slug, x in [('viroses-gastrointestinais', 55.7), ('bacillus-clausii-diaa', 513.0), ('virus-respiratorios-criancas', 970.4)]:
    save(p0, (x, 1963.2, x + 414.6, 2161.2), f'conteudos/{slug}-card.webp')
save(p0, (815, 2438, 1382, 2783), 'enterogermina/produto-enterogermina.webp', q=86)
save(p0, (498, 2878, 704, 3002), 'areas/tile-allegra.webp', q=85)
save(p0, (813.9, 2877.9, 1018.9, 3001.3), 'areas/tile-oscal-flat.webp', q=85)
save(p0, (1129, 2878.3, 1331.3, 3001.5), 'areas/tile-novalgina-flat.webp', q=85)

# ---------- Página de documento (prancheta 1) ----------
d1, p1 = textless(1)
save(p1, (55, 142, 1386, 422.5), 'enterogermina/banner-documento.webp', q=85)
save(p1, (55, 456, 1016, 1097), 'conteudos/probioticos-criancas.webp')
for slug, y in [('viroses-gastrointestinais', 570), ('bacillus-clausii-diaa', 710), ('virus-respiratorios-criancas', 912)]:
    save(p1, (1089.5, y, 1180, y + 91), f'conteudos/{slug}-thumb.webp', scale=3)
save(p1, (1080.9, 1197, 1366.5, 1301), 'areas/card-allegra-logo.webp', q=85)
save(p1, (1080.9, 1322.1, 1366.5, 1426), 'areas/card-oscal-logo.webp', q=85)
save(p1, (1080.9, 1447, 1366.5, 1550.9), 'areas/card-novalgina-logo.webp', q=85)
