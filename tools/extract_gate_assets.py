"""Faixas de marca da tela de cadastro/login (src/gate), em src/assets/img/gate/.

São as mesmas faixas da barra lateral "Explore outras áreas", mas exibidas pequenas (140 px de
largura): em vez de reduzir o asset de 572 px no navegador (logo borrado), renderiza o vetor do .ai
em 6x e reduz com Lanczos para 3x do tamanho exibido (420 px), nítido também em telas retina.

Uso:  python tools/extract_gate_assets.py
Requer "Opella_C_Enterogermina/Opella C - Enterogermina.ai" e "Opella_D_Oscal/Opella D - Oscal.ai" na raiz.
"""
import io, os
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'assets', 'img', 'gate')
ENTERO = os.path.join(ROOT, 'Opella_C_Enterogermina', 'Opella C - Enterogermina.ai')
OSCAL = os.path.join(ROOT, 'Opella_D_Oscal', 'Opella D - Oscal.ai')
WIDTH = 420  # 3x de 140 px


def textless(path, n):
    d = pymupdf.open(path, filetype='pdf')
    p = d[n]
    p.add_redact_annot(p.rect)
    p.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_NONE, graphics=pymupdf.PDF_REDACT_LINE_ART_NONE)
    return d, p


def save(page, rect, name):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(6, 6), clip=pymupdf.Rect(rect), alpha=False)
    im = Image.open(io.BytesIO(pix.tobytes('png'))).convert('RGB')
    im = im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS)
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, name)
    im.save(path, 'WEBP', quality=92, method=6)
    print(f'   gate/{name:24} {im.size}  {os.path.getsize(path) // 1024} KB')


if __name__ == '__main__':
    _, pe = textless(ENTERO, 1)  # página de documento do Enterogermina: faixas Allegra, Os-Cal e Novalgina
    _, po = textless(OSCAL, 1)  # página de documento do Os-Cal: faixa Enterogermina
    save(pe, (1080.9, 1197, 1366.5, 1301), 'marca-allegra.webp')
    save(po, (1080.9, 1131, 1366.5, 1234.5), 'marca-enterogermina.webp')
    save(pe, (1080.9, 1322.1, 1366.5, 1426), 'marca-oscal.webp')
    save(pe, (1080.9, 1447, 1366.5, 1550.9), 'marca-novalgina.webp')
