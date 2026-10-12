"""Recorta as imagens dos artigos ID01–ID12 a partir dos PDFs (capturas 1:1 do portal Opella+).

Cada PDF é uma sequência de páginas-imagem; elas são empilhadas num "rolo" vertical e
as regiões listadas em CROPS (coordenadas do rolo, em px) são recortadas, aparadas do
fundo bege e salvas em src/assets/img/artigos/<id>/<nome>.webp.

Uso:  python tools/extract_article_images.py [ID01 ID02 ...]
Requer os PDFs "IDxx - ….pdf" em fontes/.  Dependências: pip install pymupdf pillow numpy
"""
import glob, os, sys
import numpy as np
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'fontes')  # PDFs de origem (fora do Git, ver .gitignore)
OUT = os.path.join(ROOT, 'src', 'assets', 'img', 'artigos')
BG = np.array([0xf7, 0xee, 0xe5])

# id -> {nome: (x0, y0, x1, y1, trim[, apagar])}   trim=True apara o fundo bege ao redor;
# apagar = lista de retângulos (coordenadas do rolo) preenchidos antes do recorte
CROPS: dict[str, dict[str, tuple]] = {}


def roll(tag: str) -> Image.Image:
    f = sorted(glob.glob(os.path.join(SRC, f'{tag} - *.pdf')))[0]
    d = pymupdf.open(f)
    pages = []
    for p in d:
        x = p.get_image_info(xrefs=True)[0]['xref']
        pix = pymupdf.Pixmap(d, x)
        if pix.n - pix.alpha > 3:
            pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
        pages.append(Image.frombytes('RGB', (pix.width, pix.height), pix.samples) if not pix.alpha
                     else Image.frombytes('RGBA', (pix.width, pix.height), pix.samples).convert('RGB'))
    W = pages[0].width
    pages = [p if p.width == W else p.resize((W, round(p.height * W / p.width))) for p in pages]
    out = Image.new('RGB', (W, sum(p.height for p in pages)), 'white')
    y = 0
    for p in pages:
        out.paste(p, (0, y)); y += p.height
    return out


def trim(im: Image.Image, tol: int = 18) -> Image.Image:
    a = np.asarray(im).astype(int)
    m = np.abs(a - BG).sum(axis=2) > tol
    ys, xs = np.where(m)
    if not len(ys):
        return im
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def erase(im: Image.Image, box: tuple) -> None:
    """Apaga um retângulo (texto da página que invadiu a figura) repetindo a coluna à esquerda."""
    x0, y0, x1, y1 = box
    col = im.crop((x0 - 1, y0, x0, y1))
    for x in range(x0, x1):
        im.paste(col, (x, y0))


def extract(tag: str):
    r = roll(tag)
    os.makedirs(os.path.join(OUT, tag.lower()), exist_ok=True)
    for name, (x0, y0, x1, y1, do_trim, *rest) in CROPS.get(tag, {}).items():
        for box in (rest[0] if rest else ()):
            erase(r, box)
        im = r.crop((x0, y0, x1, y1))
        if do_trim:
            im = trim(im)
        path = os.path.join(OUT, tag.lower(), f'{name}.webp')
        im.save(path, 'WEBP', quality=88, method=6)
        print(f'   {tag}/{name}.webp {im.size}')


if __name__ == '__main__':
    from article_crops import CROPS as _C  # noqa: E402  (definições ficam em article_crops.py)
    CROPS.update(_C)
    for tag in (sys.argv[1:] or sorted(CROPS)):
        extract(tag)
