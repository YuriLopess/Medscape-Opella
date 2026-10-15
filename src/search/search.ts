/**
 * Busca do site, toda no navegador. O índice (tools/searchIndex.ts) só é baixado na primeira vez que a
 * pessoa usa a busca. Ignora acentos e maiúsculas, exige que todas as palavras apareçam e ordena pelo
 * lugar onde aparecem: título > tags/marca > descrição > corpo do texto.
 */
import type { SearchEntry } from '../../tools/searchIndex';

export type { SearchEntry };

export const KIND_LABEL: Record<SearchEntry['kind'], string> = {
  artigo: 'Artigo',
  documento: 'Documento científico',
  marca: 'Página da marca',
  pagina: 'Página',
};

/** Trecho do texto com as partes que casaram com a busca marcadas. */
export type Snippet = { text: string; hit: boolean }[];

export interface SearchResult {
  entry: SearchEntry;
  score: number;
  snippet: Snippet;
}

interface Prepared {
  entry: SearchEntry;
  title: string;
  keywords: string;
  description: string;
  text: string;
}

/**
 * Sem acento e em minúsculas, caractere a caractere: o resultado tem sempre o mesmo comprimento do
 * original, então uma posição encontrada no texto normalizado vale também no original (trecho marcado).
 */
export function normalize(s: string): string {
  return s.replace(/[\s\S]/g, (ch) => {
    const n = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return n.length === 1 ? n : ch;
  });
}

const STOPWORDS = new Set(['a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'na', 'no', 'nas', 'nos', 'um', 'uma', 'para', 'por', 'com', 'que', 'se', 'ao']);

export function tokenize(query: string): string[] {
  const words = normalize(query).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length >= 2);
  const meaningful = words.filter((w) => !STOPWORDS.has(w));
  return meaningful.length ? meaningful : words;
}

let loading: Promise<Prepared[]> | null = null;

/** Baixa o índice uma vez só (chamado ao focar o campo de busca). */
export function loadIndex(): Promise<Prepared[]> {
  loading ??= import('virtual:search-index').then((m) =>
    m.default.map((entry) => ({
      entry,
      title: normalize(entry.title),
      keywords: normalize(entry.keywords),
      description: normalize(entry.description),
      text: normalize(entry.text),
    })),
  );
  return loading;
}

const count = (hay: string, needle: string) => {
  let n = 0;
  for (let i = hay.indexOf(needle); i !== -1 && n < 20; i = hay.indexOf(needle, i + needle.length)) n++;
  return n;
};

/** Pedaço do texto em volta da primeira ocorrência, com as palavras buscadas marcadas. */
function snippetOf(original: string, normalized: string, tokens: string[], size = 170): Snippet {
  const first = Math.min(...tokens.map((t) => normalized.indexOf(t)).filter((i) => i >= 0));
  if (!Number.isFinite(first)) return [{ text: original.slice(0, size).trim() + (original.length > size ? '…' : ''), hit: false }];
  let start = Math.max(0, first - 60);
  if (start > 0) start = original.indexOf(' ', start) + 1 || start;
  let end = Math.min(original.length, start + size);
  if (end < original.length) end = original.lastIndexOf(' ', end) > start ? original.lastIndexOf(' ', end) : end;

  const marks: [number, number][] = [];
  for (const t of tokens) {
    for (let i = normalized.indexOf(t, start); i !== -1 && i < end; i = normalized.indexOf(t, i + t.length)) {
      marks.push([i, Math.min(end, i + t.length)]);
    }
  }
  marks.sort((a, b) => a[0] - b[0]);

  const out: Snippet = [];
  if (start > 0) out.push({ text: '…', hit: false });
  let pos = start;
  for (const [a, b] of marks) {
    if (a < pos) continue;
    if (a > pos) out.push({ text: original.slice(pos, a), hit: false });
    out.push({ text: original.slice(a, b), hit: true });
    pos = b;
  }
  if (pos < end) out.push({ text: original.slice(pos, end), hit: false });
  if (end < original.length) out.push({ text: '…', hit: false });
  return out;
}

export function search(index: Prepared[], query: string): SearchResult[] {
  const tokens = tokenize(query);
  if (!tokens.length) return [];
  const results: SearchResult[] = [];

  for (const p of index) {
    let score = 0;
    let all = true;
    for (const t of tokens) {
      const inTitle = p.title.includes(t);
      const inKeywords = p.keywords.includes(t);
      const inDescription = p.description.includes(t);
      const inText = count(p.text, t);
      if (!inTitle && !inKeywords && !inDescription && !inText) {
        all = false;
        break;
      }
      score += (inTitle ? 12 : 0) + (inKeywords ? 6 : 0) + (inDescription ? 4 : 0) + (inText ? 1 + Math.min(inText, 10) * 0.3 : 0);
      if (inTitle && new RegExp(`(^|[^\\p{L}])${t}`, 'u').test(p.title)) score += 4; // começo de palavra no título
    }
    if (!all) continue;
    if (p.title === normalize(query.trim())) score += 20; // nome exato (ex.: "allegra")

    const useText = tokens.some((t) => p.text.includes(t));
    const snippet = useText
      ? snippetOf(p.entry.text, p.text, tokens)
      : snippetOf(p.entry.description, p.description, tokens);
    results.push({ entry: p.entry, score, snippet });
  }

  return results.sort((a, b) => b.score - a.score);
}
