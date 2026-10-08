"""Gera src/styles/icons.css com os SVGs de src/assets/img/icons e src/assets/img/brand
embutidos como data-URI (funciona inclusive abrindo o HTML direto do disco).

Uso:  python tools/build_icons.py
Cada arquivo vira a classe .i-<nome-do-arquivo>; logos de marca ficam .i-<nome>.
"""
import pathlib
import re
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
SOURCES = [ROOT / 'src/assets/img/brand', ROOT / 'src/assets/img/icons']
OUT = ROOT / 'src/styles/icons.css'


def data_uri(svg: str) -> str:
    svg = re.sub(r'\s+', ' ', svg).strip()
    return 'data:image/svg+xml,' + urllib.parse.quote(svg, safe=" =:/'\",;-.()")


lines = ['/* Gerado por tools/build_icons.py — não editar à mão. */\n']
for folder in SOURCES:
    for f in sorted(folder.glob('*.svg')):
        name = f.stem.replace('opella-logo', 'logo')
        uri = data_uri(f.read_text(encoding='utf-8-sig')).replace('"', "'")
        lines.append(f'.i-{name} {{ --src: url("{uri}"); }}\n')

OUT.write_text(''.join(lines), encoding='utf-8')
print(f'{OUT.relative_to(ROOT)}: {len(lines) - 1} ícones')
