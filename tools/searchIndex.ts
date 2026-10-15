/**
 * Índice da busca do site, gerado no build (e no `npm run dev`) a partir dos próprios arquivos de
 * conteúdo — nada a manter à mão. Exposto ao app como o módulo virtual `virtual:search-index`, que o
 * cabeçalho só baixa quando a pessoa usa a busca.
 *
 * Entra: artigos (src/data/articles), documentos (src/data/documents.tsx + src/data/docs), páginas das
 * marcas (src/data/products) e textos legais. Ficam de fora as referências bibliográficas (repetem
 * termos em todo artigo e encheriam a busca de resultados irrelevantes).
 */
import { readFileSync } from 'node:fs';
import { parseSync } from 'vite';
import type { Plugin } from 'vite';

export interface SearchEntry {
  kind: 'artigo' | 'documento' | 'marca' | 'pagina';
  brand?: 'allegra' | 'enterogermina' | 'oscal' | 'novalgina';
  title: string;
  description: string;
  /** rótulos extras (tags, área terapêutica), pesam mais que o corpo */
  keywords: string;
  text: string;
  to: string;
}

const VIRTUAL = 'virtual:search-index';
const RESOLVED = '\0' + VIRTUAL;

const root = new URL('../', import.meta.url);
const read = (p: string) => readFileSync(new URL(p, root), 'utf8');

/** Atributos JSX `x={…}` que não aparecem como texto na tela. */
const HIDDEN_ATTRS = new Set(['className', 'src', 'alt', 'href', 'poster', 'loading', 'media', 'icon', 'tint', 'width', 'height', 'mt', 'p', 'rule', 'titleGap', 'id', 'key', 'style', 'to', 'target', 'rel']);
/** Atributos `x="…"` que são texto na tela (o resto, como scope="col", não é). */
const TEXT_ATTRS = new Set(['caption', 'title', 'label']);
/** Tags que ficam no meio da frase (as demais separam palavras). */
const INLINE = new Set(['strong', 'em', 'b', 'i', 'u', 'span', 'a', 'mark', 'small', 'sub', 'abbr']);
const isPath = (s: string) => /^(https?:|\/|\.\.?\/)|\.(webp|png|jpe?g|svg|pdf|mp4)$/i.test(s);

type AstNode = { type: string; [key: string]: unknown };
type JsxElement = AstNode & {
  openingElement: { name: { name?: string }; attributes: { name: { name: string }; value: AstNode | null }[] };
  children: AstNode[];
};

/** A lista de referências bibliográficas: dali em diante nada entra (repetiria termos em todo resultado). */
function isReferences(el: JsxElement): boolean {
  const tag = el.openingElement.name.name;
  const cls = el.openingElement.attributes.find((a) => a.name?.name === 'className')?.value;
  const first = el.children[0] as { value?: unknown } | undefined;
  return (
    tag === 'References' ||
    (cls?.type === 'Literal' && /(^|\s)(doc|art)-refs\b/.test(String(cls.value))) ||
    (tag === 'h2' && String(first?.value ?? '').trim().startsWith('Referências'))
  );
}

/**
 * Texto que a pessoa vê num trecho de código TSX: texto do JSX, legendas e células de tabela; sem
 * classes, imagens, alt, números de citação (<sup>) nem referências. Strings soltas fora do JSX só
 * entram com `looseStrings` (frases das páginas das marcas, ex.: descrições).
 */
function visibleText(code: string, { looseStrings = false } = {}): string {
  const { program, errors } = parseSync('conteudo.tsx', code, { lang: 'tsx' });
  if (errors.length) throw new Error(`searchIndex: JSX ilegível (${errors[0].message})`);
  const out: string[] = [];
  let stop = false;

  const walk = (node: unknown, inJsx: boolean): void => {
    if (stop || !node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      for (const child of node) walk(child, inJsx);
      return;
    }
    const n = node as AstNode;
    if (n.type === 'JSXText') {
      out.push(String(n.value));
      return;
    }
    if (n.type === 'Literal') {
      const s = n.value;
      if (typeof s !== 'string' || isPath(s)) return;
      if (inJsx || (looseStrings && s.length >= 25 && s.includes(' ') && !/^\d+\. /.test(s))) out.push(` ${s} `);
      return;
    }
    if (n.type === 'JSXElement') {
      const el = n as JsxElement;
      const tag = el.openingElement.name.name ?? '';
      if (tag === 'sup') return;
      if (isReferences(el)) {
        stop = true;
        return;
      }
      const gap = INLINE.has(tag) ? '' : ' ';
      out.push(gap);
      for (const { name, value } of el.openingElement.attributes) {
        const visible = value?.type === 'Literal' ? TEXT_ATTRS.has(name?.name) : !HIDDEN_ATTRS.has(name?.name);
        if (visible) walk(value, true);
      }
      walk(el.children, true);
      out.push(gap);
      return;
    }
    if (n.type === 'JSXFragment') {
      walk(n.children, true);
      return;
    }
    for (const [key, value] of Object.entries(n)) if (key !== 'type') walk(value, inJsx);
  };

  walk(program, false);
  return out
    .join('')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#123;/g, '{')
    .replace(/&#125;/g, '}')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?)])/g, '$1')
    .trim();
}

/** Primeiro literal de string atribuído a `key:` (aceita quebra de linha antes do valor). */
function field(src: string, key: string): string {
  const m = src.match(new RegExp(`\\b${key}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1].replace(/\\'/g, "'") : '';
}

function brandPaths(): Record<string, { path: string; name: string; area: string }> {
  const src = read('src/data/brands.ts');
  const out: Record<string, { path: string; name: string; area: string }> = {};
  for (const m of src.matchAll(/^\s{2}(\w+): \{([\s\S]*?)\n\s{2}\},/gm)) {
    out[m[1]] = { path: field(m[2], 'path'), name: field(m[2], 'name'), area: field(m[2], 'area') };
  }
  return out;
}

export function buildSearchIndex(): SearchEntry[] {
  const brands = brandPaths();
  const entries: SearchEntry[] = [];

  // ---------- artigos ----------
  const registry = read('src/data/articles/index.ts');
  for (const m of registry.matchAll(/brand: '(\w+)', slug: '([^']+)', load: \(\) => import\('\.\/(id\d+)'\)/g)) {
    const [, brand, slug, file] = m;
    const src = read(`src/data/articles/${file}.tsx`);
    const tags = [...(src.match(/tags: \[([^\]]*)\]/)?.[1].matchAll(/'([^']+)'/g) ?? [])]
      .map((t) => t[1])
      .filter((t) => !/^(novo\.?|artigo|não promocional)$/i.test(t));
    const start = src.indexOf('body: (') + 'body: ('.length;
    const body = src.slice(start, src.indexOf('\n  ),', start));
    entries.push({
      kind: 'artigo',
      brand: brand as SearchEntry['brand'],
      title: field(src, 'title'),
      description: field(src, 'description'),
      keywords: [brands[brand].name, brands[brand].area, ...tags].join(' '),
      text: [field(src, 'lead'), visibleText(`(${body})`)].join(' ').trim(),
      to: `${brands[brand].path}/${slug}`,
    });
  }

  // ---------- documentos ----------
  const docs = read('src/data/documents.tsx');
  for (const block of docs.split(/\n  \{\n/).slice(1)) {
    const brand = field(block, 'brand');
    const slug = field(block, 'slug');
    const file = block.match(/import\('\.\/docs\/(\w+)'\)/)?.[1];
    if (!brand || !slug) continue;
    // só o JSX do conteúdo: o comentário de cabeçalho e os imports não são texto da página
    const docSrc = file ? read(`src/data/docs/${file}.tsx`) : '';
    const jsx = docSrc.slice(docSrc.indexOf('const content = (') + 'const content = ('.length, docSrc.lastIndexOf('\n);'));
    const body = file ? visibleText(`(${jsx})`) : '';
    entries.push({
      kind: 'documento',
      brand: brand as SearchEntry['brand'],
      title: field(block, 'title'),
      description: field(block, 'description'),
      keywords: [brands[brand].name, brands[brand].area, 'Sociedade Brasileira de Pediatria SBP'].join(' '),
      text: body,
      to: `${brands[brand].path}/${slug}`,
    });
  }

  // ---------- páginas das marcas ----------
  for (const [brand, b] of Object.entries(brands)) {
    const src = read(`src/data/products/${brand}.tsx`);
    // sem o lorem ipsum que o layout ainda tem no lugar do texto regulatório do Os-Cal
    const text = visibleText(src, { looseStrings: true }).replace(/Lorem ipsum[^.]*\.\s*/g, '');
    entries.push({
      kind: 'marca',
      brand: brand as SearchEntry['brand'],
      title: b.name,
      description: field(src, 'description'),
      keywords: `${b.name} ${b.area}`,
      text,
      to: b.path,
    });
  }

  // ---------- textos legais (em inglês: entram só pelo título e por palavras-chave) ----------
  entries.push(
    { kind: 'pagina', title: 'Política de Privacidade', description: 'Medscape Network Privacy Policy', keywords: 'privacidade privacy cookies dados pessoais LGPD', text: '', to: '/politica-de-privacidade' },
    { kind: 'pagina', title: 'Termos de Uso', description: 'Medscape Network Terms of Use', keywords: 'termos de uso condições terms', text: '', to: '/termos-de-uso' },
  );

  return entries;
}

/** Plugin do Vite: `import('virtual:search-index')` devolve o índice. */
export function searchIndex(): Plugin {
  return {
    name: 'search-index',
    resolveId: (id) => (id === VIRTUAL ? RESOLVED : undefined),
    load(id) {
      if (id !== RESOLVED) return undefined;
      return `export default ${JSON.stringify(buildSearchIndex())};`;
    },
  };
}
