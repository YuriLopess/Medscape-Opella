"""Converte os documentos científicos da SBP (ID13–ID15, PDFs com texto real) em JSX para as páginas de documento.

Para cada PDF:
  - lê o texto em ordem de leitura (duas colunas; tabelas e figuras de largura total quebram as colunas);
  - classifica as linhas: título de seção (h2), subtítulo (h3), legenda, item de lista, parágrafo, referência;
  - junta as linhas em blocos, desfaz a hifenização de fim de linha e marca sobrescritos/subscritos, negrito e itálico;
  - tabelas viram <table> (com colspan/rowspan), figuras vetoriais/raster viram imagem recortada do PDF;
  - grava src/data/docs/<id>.tsx e as figuras em src/assets/img/documentos/<id>/.

Uso:  python tools/extract_sbp_docs.py [ID13 ID14 ID15]      (requer os PDFs "IDxx - ….pdf" na raiz)
"""
import collections, glob, html, os, re, sys
import pymupdf
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_PDF = os.path.join(ROOT, 'public', 'documentos')
# nome do PDF oferecido para download em cada página de documento
PDF_NAMES = {
    'ID13': 'sbp-abordagem-da-febre-aguda-em-pediatria.pdf',
    'ID14': 'sbp-anti-histaminicos-em-doencas-alergicas.pdf',
    'ID15': 'sbp-uso-de-probioticos-em-criancas.pdf',
}
OUT_TSX = os.path.join(ROOT, 'src', 'data', 'docs')
OUT_IMG = os.path.join(ROOT, 'src', 'assets', 'img', 'documentos')

# figuras (página 1-based, retângulo em pontos do PDF, nome do arquivo, texto alternativo)
FIGURES = {
    'ID13': [
        (7, (57, 176, 540, 790), 'fluxograma-fssl',
         'Fluxograma da proposta atual para avaliação e seguimento de crianças de 0 a 36 meses com febre sem sinais de '
         'localização: conduta conforme a idade (menos de 30 dias, 1 a 3 meses com critérios de Rochester, 3 a 36 meses '
         'conforme a vacinação), exames laboratoriais, internação, antibioticoterapia empírica e reavaliação diária.'),
        (10, (305, 92, 541, 284), 'mecanismo-antitermicos',
         'Esquema do mecanismo de ação dos antitérmicos: fosfolipídios, pela fosfolipase A2, formam ácido araquidônico, '
         'que a cicloxigenase converte em prostaglandinas (PGE2), causando febre. Ibuprofeno, paracetamol e dipirona '
         'atuam inibindo a cicloxigenase.'),
    ],
    'ID14': [
        (4, (57, 535, 540, 772), 'figura-1-eventos-adversos',
         'Eventos adversos potenciais dos anti-histamínicos H1 de primeira geração: receptores H1 do SNC (menor '
         'prontidão, cognição, aprendizado, memória e psicomotricidade, com ou sem sedação); receptores muscarínicos '
         '(boca seca, retenção urinária, taquicardia sinusal); receptores de serotonina (aumento do apetite e ganho de '
         'peso); receptores alfa-adrenérgicos (tonturas, hipotensão postural); canais iônicos cardíacos (aumento do '
         'intervalo QT, arritmias ventriculares).'),
        (5, (57, 236, 540, 530), 'figura-2-ciclo-sono',
         'Gráfico do ciclo sono/vigília: o anti-histamínico de primeira geração tomado à noite deixa o sono REM latente '
         'ou reduzido e mantém a sonolência durante o dia seguinte.'),
    ],
    'ID15': [
        (3, (110, 180, 486, 512), 'figura-1-racional',
         'Racional teórico para o uso de probióticos em crianças com infecções repetidas: idade e imaturidade '
         'imunológica, escolarização precoce e número de irmãos, infecções de repetição, uso excessivo de medicamentos '
         'e antibióticos, microbiota disfuncional (disbiose) e disregulação imune formam um ciclo.'),
    ],
}

# trechos que o PDF desenha (setas) ou que a extração perde: (antes, depois) aplicados ao TSX gerado
FIXES = {
    'ID14': [
        ('Gq/G11 Estimulação', 'Gq/G11 → Estimulação'),
        ('Gs Estimulação da adenilato ciclase AMP cíclico', 'Gs → Estimulação da adenilato ciclase ↑ AMP cíclico'),
        ('Gi/o Inibição da adenilato ciclase AMP cíclico', 'Gi/o → Inibição da adenilato ciclase ↓ AMP cíclico'),
    ],
    'ID13': [
        ('ex-pert panel', 'expert panel'),
    ],
}

PREFIXES = {'anti', 'não', 'pró', 'pré', 'pós', 'sub', 'semi', 'auto', 'inter', 'super', 'extra', 'co', 'bem', 'mal',
            'recém', 'ex', 'vice', 'pan', 'pseudo', 'neo', 'micro', 'macro', 'multi', 'gastro', 'hemato', 'imuno',
            'neuro', 'psico', 'histamínico', 'dipirona', 'paracetamol', 'amoxicilina', 'ácido'}
BR = ' '  # marcador interno de quebra de linha (vira <br />)
CAPTION_RE = re.compile(r'^(Tabela|Quadro|Figura)\b')
SOURCE_RE = re.compile(r'^(Adaptado|Modificado|Fonte:|CVS:|BHE –|\* checar)')
BULLET_RE = re.compile(r'^[•–]\s*')
LETTER_RE = re.compile(r'^([a-e])\)\s+')
NUM_RE = re.compile(r'^\d{1,2}\.\s+')
REF_RE = re.compile(r'^(\d{1,2})\.\s+')


def clean_uri(u: str) -> str:
    """Desfaz o redirecionamento do filtro de e-mail: https://protect.checkpoint.com/v2/r01/___<url>___.<token>"""
    m = re.search(r'___(.+?)___', u)
    return (m.group(1) if m else u).replace('%23', '#')


def export_pdf(tag, doc):
    """Copia o PDF para public/documentos com os links limpos; devolve as URLs encontradas."""
    uris = []
    for page in doc:
        for l in page.get_links():
            if l.get('uri'):
                l['uri'] = clean_uri(l['uri'])
                uris.append(l['uri'])
                page.update_link(l)
    os.makedirs(OUT_PDF, exist_ok=True)
    doc.save(os.path.join(OUT_PDF, PDF_NAMES[tag]), garbage=3, deflate=True)
    return uris


def esc(t: str) -> str:
    t = html.escape(t, quote=False)
    return t.replace('{', '&#123;').replace('}', '&#125;')


# ---------------------------------------------------------------- linhas e trechos ----------
class Line:
    def __init__(self, page, l, size_main):
        self.page = page
        self.bbox = pymupdf.Rect(l['bbox'])
        spans = [s for s in l['spans'] if s['text'] != '']
        self.runs = []  # [text, bold, italic, pos('', 'sup', 'sub')]
        base = max(spans, key=lambda s: s['size'])
        for s in spans:
            t = s['text'].replace('\xad', '').replace('\t', ' ').replace('\u0007', '')
            bold = 'Bold' in s['font']
            italic = 'Italic' in s['font']
            pos = ''
            if s['size'] < base['size'] * 0.8 and t.strip():
                pos = 'sup' if s['origin'][1] < base['origin'][1] - 1 else 'sub'
            self.runs.append([t, bold, italic, pos])
        self.size = base['size']
        self.text = ''.join(r[0] for r in self.runs).strip()
        content = [r for r in self.runs if r[0].strip() and r[3] == '']
        self.all_bold = bool(content) and all(r[1] for r in content)
        self.colstart = 57 if self.bbox.x0 < 297 else 305
        self.indent = self.bbox.x0 - self.colstart

    @property
    def x0(self):
        return self.bbox.x0


def page_lines(page, skip_rects, size_main):
    out = []
    for b in page.get_text('dict')['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            if not ''.join(s['text'] for s in l['spans']).strip():
                continue
            ln = Line(page.number, l, size_main)
            c = pymupdf.Point((ln.bbox.x0 + ln.bbox.x1) / 2, (ln.bbox.y0 + ln.bbox.y1) / 2)
            if any(r.contains(c) for r in skip_rects):
                continue
            if ln.bbox.y1 < 45 or ln.size >= 14.5:  # cabeçalho corrido e número da página
                continue
            out.append(ln)
    return merge_segments(out)


def merge_segments(lines):
    """O PDF às vezes parte uma linha justificada em pedaços na mesma altura: junta-os de volta."""
    lines.sort(key=lambda l: (l.colstart, round(l.bbox.y0), l.bbox.x0))
    out = []
    for l in lines:
        prev = out[-1] if out else None
        if prev and prev.colstart == l.colstart and abs(prev.bbox.y0 - l.bbox.y0) < 2.5 and l.bbox.x0 >= prev.bbox.x1 - 1:
            if prev.runs and not prev.runs[-1][0].endswith(' '):
                prev.runs[-1][0] += ' '
            prev.runs += l.runs
            prev.bbox |= l.bbox
            prev.text = ''.join(r[0] for r in prev.runs).strip()
            content = [r for r in prev.runs if r[0].strip() and r[3] == '']
            prev.all_bold = bool(content) and all(r[1] for r in content)
            continue
        out.append(l)
    return out


# ---------------------------------------------------------------- texto corrido ------------
def word_counts(doc):
    c = collections.Counter()
    for p in doc:
        c.update(w.lower() for w in re.findall(r'[\wÀ-ÿ-]+', p.get_text().replace('\xad', '')))
    return c


def join_runs(runs, nxt, words):
    """Acrescenta os trechos da linha seguinte, desfazendo a hifenização do fim da linha."""
    if not runs:
        runs.extend([list(r) for r in nxt])
        return
    nxt = [list(r) for r in nxt]
    while nxt and not nxt[0][0].strip():
        nxt.pop(0)
    if not nxt:
        return
    last = runs[-1]
    last[0] = last[0].rstrip()
    first = nxt[0]
    first[0] = first[0].lstrip()
    tail = re.search(r'(\S+)$', last[0])
    tail = tail.group(1) if tail else ''
    if last[0].endswith('-') and first[0].startswith('-'):
        first[0] = first[0][1:]  # o PDF repete o hífen no início da linha seguinte ("anti-" / "-H1")
    elif ('http' in tail or 'www.' in tail or tail.endswith('/')) and not re.match(r'[A-ZÀ-Ý][a-zà-ÿ]', first[0]):
        pass  # URL quebrada: junta sem espaço (a menos que a linha seguinte comece com uma palavra, ex.: "Acessado")
    elif last[0].endswith('-') and first[0][:1].isalpha():
        w1 = re.search(r'([\wÀ-ÿ]+)-$', last[0])
        w2 = re.match(r'([\wÀ-ÿ]+)', first[0])
        if w1 and w2:
            a, b = w1.group(1), w2.group(1)
            joined, hyph = (a + b).lower(), (a + '-' + b).lower()
            keep = words[hyph] > words[joined] or (words[joined] == 0 and (a.lower() in PREFIXES or b[0].isupper()))
            if not keep:
                last[0] = last[0][:-1]
    else:
        last[0] += ' '
    runs.extend(nxt)


def plain(runs):
    return ''.join(r[0] for r in runs if not r[3]).strip()


def runs_to_jsx(runs):
    out = []
    # funde trechos vizinhos com o mesmo estilo
    merged = []
    for r in runs:
        if merged and merged[-1][1:] == r[1:]:
            merged[-1][0] += r[0]
        else:
            merged.append(list(r))
    for t, bold, italic, pos in merged:
        if not t:
            continue
        s = esc(t)
        s = re.sub(r'(https?://[^\s<]+|www\.[^\s<]+)', lambda m: link(m.group(1)), s)
        if pos:
            s = f'<{pos}>{s.strip()}</{pos}>'
        if italic and t.strip():
            s = f'<em>{s}</em>'
        if bold and t.strip():
            s = f'<strong>{s}</strong>'
        out.append(s)
    txt = ''.join(out).strip().replace(BR, '<br />')
    txt = re.sub(r'</strong>(\s*)<strong>', r'\1', txt)
    txt = re.sub(r'</em>(\s*)<em>', r'\1', txt)
    # espaços na borda do negrito/itálico ficam do lado de fora
    txt = re.sub(r'<(strong|em)>(\s+)', r'\2<\1>', txt)
    txt = re.sub(r'(\s+)</(strong|em)>', r'</\2>\1', txt)
    return re.sub(r'\s{2,}', ' ', txt).strip()


def link(u):
    u = u.rstrip('.,;)')
    href = u if u.startswith('http') else 'https://' + u
    return f'<a href="{href}" target="_blank" rel="noopener noreferrer">{u}</a>'


# ---------------------------------------------------------------- tabelas ------------------
def table_jsx(page, t, words, size_main):
    cells = [c for c in t.cells if c]
    xs = sorted({round(c[0]) for c in cells} | {round(c[2]) for c in cells})
    ys = sorted({round(c[1]) for c in cells} | {round(c[3]) for c in cells})

    def snap(v, arr):
        return min(range(len(arr)), key=lambda i: abs(arr[i] - v))

    grid = collections.defaultdict(list)
    for c in cells:
        r0, r1 = snap(c[1], ys), snap(c[3], ys)
        c0, c1 = snap(c[0], xs), snap(c[2], xs)
        grid[r0].append((c0, r1 - r0, c1 - c0, pymupdf.Rect(c)))
    rows = []
    for r in sorted(grid):
        tds = []
        for c0, rs, cs, rect in sorted(grid[r]):
            lines = page_lines_clip(page, rect, size_main)
            runs, bold = [], bool(lines) and all(l.all_bold for l in lines)
            for l in lines:
                prev = plain(runs)
                if runs and not bold and re.match(r'^[A-ZÀ-Ý0-9–*]', l.text) and not re.search(r'[-,/]$', prev)                         and not re.match(r'^(Estimulação|Inibição|AMP)', l.text):
                    runs[-1][0] = runs[-1][0].rstrip()
                    runs.append([BR, False, False, ''])  # vira <br />
                    runs.extend([list(r) for r in l.runs])
                else:
                    join_runs(runs, l.runs, words)
            tds.append((runs_to_jsx(runs), rs, cs, bold))
        rows.append(tds)
    head = 1
    # cabeçalho de duas linhas (ex.: "Classe funcional" sobre "1ª/2ª geração")
    if len(rows) > 2 and rows[1] and all(b and t for t, _, _, b in rows[1]):
        head = 2
    parts = ['<div className="doc-table-wrap">', '<table className="doc-table">']
    for i, tds in enumerate(rows):
        if i == 0:
            parts.append('<thead>')
        if i == head:
            parts.append('<tbody>')
        cells_s = []
        for txt, rs, cs, bold in tds:
            tag = 'th' if i < head or (bold and tds.index((txt, rs, cs, bold)) == 0) else 'td'
            attrs = (f' rowSpan={{{rs}}}' if rs > 1 else '') + (f' colSpan={{{cs}}}' if cs > 1 else '')
            if tag == 'th' and i >= head:
                attrs += ' scope="row"'
            elif tag == 'th':
                attrs += ' scope="col"' if cs == 1 else ' scope="colgroup"'
            inner = re.sub(r'</?strong>', '', txt) if tag == 'th' else txt
            cells_s.append(f'<{tag}{attrs}>{inner}</{tag}>')
        parts.append('<tr>' + ''.join(cells_s) + '</tr>')
        if i == head - 1:
            parts.append('</thead>')
    parts += ['</tbody>', '</table>', '</div>']
    return '\n'.join(parts)


def page_lines_clip(page, rect, size_main):
    out = []
    for b in page.get_text('dict', clip=rect)['blocks']:
        if b['type'] != 0:
            continue
        for l in b['lines']:
            if ''.join(s['text'] for s in l['spans']).strip():
                out.append(Line(page.number, l, size_main))
    out.sort(key=lambda l: (round(l.bbox.y0), l.bbox.x0))
    return out


# ---------------------------------------------------------------- documento ----------------
def convert(tag):
    pdf = sorted(glob.glob(os.path.join(ROOT, f'{tag} - *.pdf')))[0]
    doc = pymupdf.open(pdf)
    words = word_counts(doc)
    figs = FIGURES.get(tag, [])
    os.makedirs(os.path.join(OUT_IMG, tag.lower()), exist_ok=True)
    items = []  # (kind, payload) em ordem de leitura
    for page in doc:
        if 'DIRETORIA DE PUBLICAÇÕES' in page.get_text():
            break  # página da diretoria da SBP (e o que vier depois): fora do conteúdo
        tables = [t for t in page.find_tables().tables]
        pfigs = [(pymupdf.Rect(r), name, alt) for (pg, r, name, alt) in figs if pg == page.number + 1]
        skip = [pymupdf.Rect(t.bbox) for t in tables] + [f[0] for f in pfigs]
        lines = page_lines(page, skip, 10.5)
        if page.number == 0:
            intro = min((l.bbox.y0 for l in lines if l.text == 'Introdução'), default=0)
            # descarta o cabeçalho (título, comissão) e a nota de rodapé ("Este documento foi elaborado…")
            # (a coluna direita pode começar um pouco acima do título "Introdução" da esquerda)
            lines = [l for l in lines if intro - 15 <= l.bbox.y0 < 750]
        elems = [('line', l.bbox, l) for l in lines]
        elems += [('table', pymupdf.Rect(t.bbox), t) for t in tables]
        elems += [('figure', r, (name, alt)) for r, name, alt in pfigs]

        def wide(r):
            return r.width > 320 or (r.x0 < 285 and r.x1 > 315)

        wide_els = [e for e in elems if e[0] != 'line' and wide(e[1])]
        wide_ids = {id(e) for e in wide_els}
        # legendas logo acima e fontes logo abaixo de um elemento largo também quebram as colunas
        for w in wide_els:
            top = w[1].y0
            for e in sorted([e for e in elems if e[0] == 'line'], key=lambda e: -e[1].y1):
                if e[1].y1 <= top + 1 and top - e[1].y1 < 14 and e[2].all_bold:
                    wide_ids.add(id(e)); top = e[1].y0
            bottom = w[1].y1
            for e in sorted([e for e in elems if e[0] == 'line'], key=lambda e: e[1].y0):
                if e[1].y0 >= bottom - 1 and e[1].y0 - bottom < 22 and (SOURCE_RE.match(e[2].text) or e[2].size < 9.6):
                    wide_ids.add(id(e)); bottom = e[1].y1
        bands = sorted([e for e in elems if id(e) in wide_ids], key=lambda e: e[1].y0)
        rest = [e for e in elems if id(e) not in wide_ids]
        # cada elemento largo fecha uma faixa: lê-se a coluna esquerda, depois a direita, depois o elemento largo
        prev = -1e9
        for b in bands + [None]:
            cut = b[1].y0 if b else 1e9
            region = [e for e in rest if prev <= (e[1].y0 + e[1].y1) / 2 < cut]
            left = sorted([e for e in region if e[1].x0 < 297], key=lambda e: e[1].y0)
            right = sorted([e for e in region if e[1].x0 >= 297], key=lambda e: e[1].y0)
            items += [(e[0], e[2], page) for e in left + right]
            if b:
                items.append((b[0], b[2], page))
            prev = cut
    return doc, items, words


def build(tag):
    doc, items, words = convert(tag)
    blocks = []  # [kind, runs, extra]
    in_refs = False
    # recuo pendente de cada tipo de marcador neste documento: deslocamento mais comum da linha seguinte
    seq = [o for k_, o, _ in items if k_ == 'line']
    diffs = collections.defaultdict(collections.Counter)
    for a, b in zip(seq, seq[1:]):
        if BULLET_RE.match(a.text) and a.page == b.page and a.colstart == b.colstart and 0 < b.bbox.y0 - a.bbox.y0 < 20                 and b.x0 - a.x0 > 4:
            diffs[a.text[0]][round(b.x0 - a.x0)] += 1
    hang = {mk: c.most_common(1)[0][0] for mk, c in diffs.items()}
    for idx, (kind, obj, page) in enumerate(items):
        nxt_line = next((o for k_, o, _ in items[idx + 1:idx + 2] if k_ == 'line'), None)
        if kind == 'table':
            blocks.append(['table', table_jsx(page, obj, words, 10.5), None])
            continue
        if kind == 'figure':
            name, alt = obj
            rect = next(pymupdf.Rect(r) for (pg, r, n, a) in FIGURES[tag] if n == name)
            pix = page.get_pixmap(clip=rect, dpi=216)
            path = os.path.join(OUT_IMG, tag.lower(), f'{name}.webp')
            Image.frombytes('RGB', (pix.width, pix.height), pix.samples).save(path, 'WEBP', quality=90, method=6)
            blocks.append(['figure', f'documentos/{tag.lower()}/{name}.webp', (alt, pix.width, pix.height)])
            continue
        l = obj
        t = l.text
        if t == 'REFERÊNCIAS BIBLIOGRÁFICAS':
            in_refs = True
            blocks.append(['h2', [[ 'Referências bibliográficas', False, False, '']], None])
            continue
        last = blocks[-1] if blocks else None
        if in_refs:
            m = REF_RE.match(t)
            if m:
                runs = [list(r) for r in l.runs]
                runs[0][0] = REF_RE.sub('', runs[0][0].lstrip(), count=1)
                blocks.append(['ref', runs, int(m.group(1))])
            elif last and last[0] == 'ref':
                join_runs(last[1], l.runs, words)
            continue
        if l.all_bold and l.size >= 12:
            k = 'h2'
        elif CAPTION_RE.match(t) and (l.all_bold or l.runs[0][1]):
            k = 'caption'
        elif SOURCE_RE.match(t) or (l.size < 9.6 and not l.all_bold):
            k = 'source'
        elif all(r[1] and r[2] for r in l.runs if r[0].strip()):
            k = 'h4'
        elif l.all_bold and l.size >= 9.4:
            k = 'h3'
        elif BULLET_RE.match(t):
            k = 'li'
        elif LETTER_RE.match(t):
            k = 'lli'
        elif NUM_RE.match(t) and l.indent < 4 and not l.all_bold:
            k = 'nli'
        else:
            k = 'p'
        runs = [list(r) for r in l.runs]
        if last and last[0] == 'caption' and l.all_bold and k in ('h3', 'caption') and not CAPTION_RE.match(t):
            join_runs(last[1], runs, words)  # legenda em duas linhas
            continue
        if k == 'p' and last and last[0] in ('li', 'lli', 'nli') and t[:1].islower():
            join_runs(last[1], runs, words)  # item continua (linha começa em minúscula)
            continue
        if k in ('li', 'lli', 'nli'):
            rx = {'li': BULLET_RE, 'lli': LETTER_RE, 'nli': NUM_RE}[k]
            runs[0][0] = rx.sub('', runs[0][0].lstrip(), count=1)
            off = hang.get(t[0], 12) if k == 'li' else (nxt_line.x0 - l.x0 if nxt_line and nxt_line.page == l.page and 4 < nxt_line.x0 - l.x0 < 24 else 12)
            blocks.append([k, runs, (l.indent, off), t[0]])
            continue
        if k == 'p' and l.indent < 8 and last and last[0] in ('li', 'lli', 'nli') and nxt_line is not None                 and nxt_line.colstart == l.colstart and abs(nxt_line.indent - last[2][0] - last[2][1]) < 1.6:
            # parágrafo sem marcador dentro do item (primeira linha rente, demais com o recuo do item)
            last[1][-1][0] = last[1][-1][0].rstrip()
            last[1].append([BR, False, False, ''])
            last[1].extend(runs)
            continue
        if last and last[0] == k and k in ('h2', 'h3', 'h4', 'caption', 'source'):
            join_runs(last[1], runs, words)
            continue
        new_par = k == 'p' and abs(l.indent - 17) < 1.5 and last and last[0] in ('li', 'lli', 'nli') and re.search(r'[.;]$', plain(last[1])) and not t[:1].islower()
        if k in ('p', 'source', 'h3') and last and last[0] in ('li', 'lli', 'nli') and abs(l.indent - last[2][0] - last[2][1]) < 1.6                 and not new_par:
            # continuação do item (mesmo recuo pendente); frase nova depois de ponto ou dois-pontos vira nova linha
            if re.search(r'[.:;)]$', plain(last[1])) and not t[:1].islower():
                last[1][-1][0] = last[1][-1][0].rstrip()
                last[1].append([BR, False, False, ''])
                last[1].extend(runs)
            else:
                join_runs(last[1], runs, words)
            continue
        if k == 'p' and l.indent < 8:
            # continua o último parágrafo, mesmo que uma figura/tabela (e sua legenda) tenha aparecido no meio
            j = len(blocks) - 1
            while j >= 0 and blocks[j][0] in ('figure', 'table', 'caption', 'source'):
                j -= 1
            if j >= 0 and blocks[j][0] == 'p' and (j == len(blocks) - 1 or not re.search(r'[.:!?]\W*$', plain(blocks[j][1]))):
                join_runs(blocks[j][1], runs, words)
                continue
        if k == 'h3' and last and last[0] == 'p' and l.indent < 8 and not re.match(r'^(\d+|[a-z])\.\s', t)                 and not re.search(r'[.:!?]\W*$', plain(last[1])):
            # linha toda em negrito no meio de um parágrafo (destaque), não um subtítulo
            join_runs(last[1], runs, words)
            continue
        blocks.append([k, runs, None])

    # ---- JSX
    out = []
    i = 0
    while i < len(blocks):
        k, runs, extra = blocks[i][:3]
        if k in ('li', 'lli', 'nli', 'ref'):
            tagname = {'li': 'ul', 'lli': 'ol', 'nli': 'ol', 'ref': 'ol'}[k]
            cls = {'li': '', 'lli': ' className="doc-list-alpha"', 'nli': '', 'ref': ' className="doc-refs"'}[k]
            group = []
            while i < len(blocks) and blocks[i][0] == k:
                group.append(blocks[i]); i += 1
            start = f' start={{{group[0][2]}}}' if k == 'ref' and group[0][2] != 1 else ''
            out.append(f'<{tagname}{cls}{start}>')
            j = 0
            while j < len(group):
                g = group[j]; j += 1
                subs = []
                while k == 'li' and j < len(group) and group[j][3] == '–' and g[3] == '•':
                    subs.append(group[j]); j += 1
                if subs:
                    out.append(f'  <li>')
                    out.append(f'    {runs_to_jsx(g[1])}')
                    out.append('    <ul>')
                    out += [f'      <li>{runs_to_jsx(x[1])}</li>' for x in subs]
                    out.append('    </ul>')
                    out.append('  </li>')
                else:
                    out.append(f'  <li>{runs_to_jsx(g[1])}</li>')
            out.append(f'</{tagname}>')
            continue
        i += 1
        if k == 'table':
            out.append(runs)
        elif k == 'figure':
            alt, w, h = extra
            out.append(f'<figure className="doc-figure">\n  <img src={{img(\'{runs}\')}} alt="{esc(alt)}" '
                       f'width={{{w}}} height={{{h}}} loading="lazy" />\n</figure>')
        elif k == 'h2':
            out.append(f'<h2>{runs_to_jsx([[r[0], False, r[2], r[3]] for r in runs])}</h2>')
        elif k == 'h3':
            out.append(f'<h3>{runs_to_jsx([[r[0], False, r[2], r[3]] for r in runs])}</h3>')
        elif k == 'h4':
            out.append(f'<h4>{runs_to_jsx([[r[0], False, False, r[3]] for r in runs])}</h4>')
        elif k == 'caption':
            out.append(f'<p className="doc-caption">{runs_to_jsx(runs)}</p>')
        elif k == 'source':
            out.append(f'<p className="doc-source-note">{runs_to_jsx(runs)}</p>')
        else:
            out.append(f'<p>{runs_to_jsx(runs)}</p>')
    body = '\n'.join(out)
    pdfname = os.path.basename(sorted(glob.glob(os.path.join(ROOT, f'{tag} - *.pdf')))[0])
    tsx = (f'/* {tag} — gerado por tools/extract_sbp_docs.py a partir de "{pdfname}". Não editar à mão: rode o script. */\n'
           "import { img } from '../../lib/assets';\n\n"
           'const content = (\n  <>\n' + '\n'.join('    ' + ln for ln in body.split('\n')) + '\n  </>\n);\n\n'
           'export default content;\n')
    # links das referências: usa a URL completa da anotação do PDF quando o texto visível estiver truncado
    for u in export_pdf(tag, pymupdf.open(sorted(glob.glob(os.path.join(ROOT, f'{tag} - *.pdf')))[0])):
        for href in set(re.findall(r'href="([^"]+)"', tsx)):
            same = href.split('?')[0] == u.split('?')[0] or href.replace('-', '') == u.replace('-', '')
            if href != u and (u.startswith(href) or same):
                tsx = tsx.replace(f'href="{href}"', f'href="{html.escape(u)}"')
                if same:  # texto visível também perdeu o hífen na quebra de linha
                    tsx = tsx.replace(f'>{href}</a>', f'>{html.escape(u)}</a>')
    for a, b in FIXES.get(tag, []):
        if a not in tsx:
            print(f'   aviso: correção não aplicada em {tag}: {a!r}')
        tsx = tsx.replace(a, b)
    os.makedirs(OUT_TSX, exist_ok=True)
    with open(os.path.join(OUT_TSX, f'{tag.lower()}.tsx'), 'w', encoding='utf-8') as f:
        f.write(tsx)
    print(tag, 'blocos', len(blocks), 'tabelas', sum(b[0] == 'table' for b in blocks),
          'figuras', sum(b[0] == 'figure' for b in blocks), 'refs', sum(b[0] == 'ref' for b in blocks))


if __name__ == '__main__':
    for t in (sys.argv[1:] or ['ID13', 'ID14', 'ID15']):
        build(t)
