"""Extrai os assets das páginas do Os-Cal a partir de "Opella D - Oscal.ai".

Prancheta 0 = os-cal.html (landing) · prancheta 1 = página de documento
"Saúde óssea feminina: o papel da suplementação de cálcio na prática clínica".
O banner do documento é roxo liso (só cor, sem imagem).
Tiles de Allegra e Novalgina são os mesmos da página do Enterogermina (já em static/img/areas).

Uso:  python tools/extract_oscal_assets.py
Dependências: pip install pymupdf pillow
"""
import io, os
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AI = os.path.join(ROOT, 'Opella_D_Oscal', 'Opella D - Oscal.ai')
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
save(p0, (55.5, 136.9, 1385.5, 416.9), 'oscal/hero.webp', q=88)
save(p0, (55.5, 452.7, 719, 905.5), 'oscal/destaque-calculadora.webp')
save(p0, (720, 1067.5, 1385, 1646.8), 'oscal/video-saude-ossea-feminina.webp')
save(p0, (121.7, 1303, 166.7, 1348), 'experts/lucia-costa-paiva-avatar.webp', scale=3)
save(p0, (284, 1799.7, 698.6, 1948), 'conteudos/saude-ossea-da-mulher-card.webp')
save(p0, (741.4, 1799.7, 1156, 1948), 'conteudos/desafio-osteoporose-card.webp')
save(p0, (903, 2177, 1304, 2749), 'oscal/produto-oscal.webp', q=86)
save(p0, (813, 2824, 1019, 2948), 'areas/tile-enterogermina-flat.webp', q=85)

# ---------- Página de documento (prancheta 1) ----------
d1, p1 = textless(1)
save(p1, (55, 456, 1016, 1097), 'conteudos/saude-ossea-feminina.webp')
save(p1, (1089.5, 571, 1180, 662), 'conteudos/saude-ossea-da-mulher-thumb.webp', scale=3)
save(p1, (1089.5, 707.5, 1180, 798), 'conteudos/desafio-osteoporose-thumb.webp', scale=3)
save(p1, (1080.9, 1131, 1366.5, 1234.5), 'areas/card-enterogermina-logo.webp', q=85)
