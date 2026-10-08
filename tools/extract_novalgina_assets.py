"""Extrai os assets das páginas do Novalgina a partir de "Opella F - Novalgina.ai".

Prancheta 0 = novalgina.html (landing) · prancheta 1 = página de documento ID13
"Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses".
Tiles de Allegra, Enterogermina e Os-Cal já existem em static/img/areas.

Uso:  python tools/extract_novalgina_assets.py
Dependências: pip install pymupdf pillow
"""
import io, os
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AI = os.path.join(ROOT, 'Opella_F_Novalgina', 'Opella F - Novalgina.ai')
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
save(p0, (55, 136, 1386, 417), 'novalgina/hero.webp', q=88)
save(p0, (55.5, 452.7, 719, 946), 'novalgina/destaque-febre-aguda.webp')
save(p0, (720, 1108, 1385, 1709.9), 'novalgina/video-manejo-febre-dor.webp')
save(p0, (121.7, 1343.5, 166.7, 1388.5), 'experts/flavio-melo-avatar-verde.webp', scale=3)
for slug, x in [('escolite-volta-as-aulas', 55.7), ('febre-na-pediatria', 513.0), ('primeiras-24h-apos-vacina', 970.4)]:
    save(p0, (x, 1873.7, x + 414.6, 2012.2), f'conteudos/{slug}-card.webp')
save(p0, (815, 2244, 1362, 2631), 'novalgina/produto-novalgina.webp', q=86)

# ---------- Página de documento (prancheta 1) ----------
d1, p1 = textless(1)
save(p1, (55, 142, 1386, 422.5), 'novalgina/banner-documento.webp', q=88)
save(p1, (55, 456, 1016, 1097), 'conteudos/febre-aguda-arboviroses.webp')
for slug, y in [('escolite-volta-as-aulas', 570), ('febre-na-pediatria', 713.5), ('primeiras-24h-apos-vacina', 849)]:
    save(p1, (1089.5, y, 1180, y + 91), f'conteudos/{slug}-thumb.webp', scale=3)
