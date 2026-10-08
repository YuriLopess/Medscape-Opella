"""Extrai os slides do carrossel da home a partir de "Opella G - Carrusel.ai".

Cada prancheta (1330x200) vira: fundo sem textos, sem botão e sem a embalagem
(src/assets/img/home/banner-<marca>-bg.webp) + embalagem em PNG transparente da pasta Links
(src/assets/img/home/banner-<marca>-produto.webp). O slide do Allegra já existia (extraído da home).

Uso:  python tools/extract_carousel_assets.py
Dependências: pip install pymupdf pillow
"""
import io, os
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'Opella_G_Carrusel')
AI = os.path.join(SRC, 'Opella G - Carrusel.ai')
OUT = os.path.join(ROOT, 'src', 'assets', 'img', 'home')

# prancheta: (marca, retângulo do botão, arquivo da embalagem, largura exibida da embalagem)
SLIDES = {
    1: ('enterogermina', (433, 84, 607, 138), 'Enterogermina Crianca e Adulto 10 uds - Mockup 3D - 26-02-2024.png', 214),
    2: ('oscal', (1109, 83, 1266, 137), 'Oscal PS.png', 103),
    3: ('novalgina', (1032, 64, 1305, 119), 'Novalgina Infantil_ solución oral de frambuesa.png', 152),
}

for n, (slug, button, pack_file, pack_w) in SLIDES.items():
    d = pymupdf.open(AI, filetype='pdf')
    p = d[n]
    p.add_redact_annot(p.rect)
    p.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
    p.add_redact_annot(pymupdf.Rect(button))
    p.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_COVERED)
    # remove a embalagem (imagem posicionada sobre o fundo), mantendo a arte
    for info in p.get_image_info(xrefs=True):
        x0, y0, x1, y1 = info['bbox']
        if info['xref'] and (x1 - x0) < 300:
            p.delete_image(info['xref'])
    pix = p.get_pixmap(matrix=pymupdf.Matrix(2, 2))
    bg = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    bg.save(os.path.join(OUT, f'banner-{slug}-bg.webp'), 'WEBP', quality=84, method=6)

    # nomes vindos do Mac podem estar em outra normalização Unicode: procura pelo prefixo
    links = os.listdir(os.path.join(SRC, 'Links'))
    match = next(f for f in links if f.startswith(pack_file.split('_')[0].split(' ')[0]) and f.lower().endswith('.png'))
    pack = Image.open(os.path.join(SRC, 'Links', match)).convert('RGBA')
    pack = pack.crop(pack.getbbox())
    w = pack_w * 2
    pack = pack.resize((w, round(w * pack.height / pack.width)), Image.LANCZOS)
    pack.save(os.path.join(OUT, f'banner-{slug}-produto.webp'), 'WEBP', quality=88, method=6)
    print(f'   {slug:14} bg {bg.size}  produto {pack.size}')
