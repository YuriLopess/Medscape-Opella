import { brands } from '../../data/brands';
import { KIND_LABEL } from '../../search/search';
import type { SearchResult } from '../../search/search';

/** Conteúdo de um resultado (rótulo de tipo/marca, título e trecho com o termo marcado). */
export function SearchResultBody({ result }: { result: SearchResult }) {
  const { entry, snippet } = result;
  return (
    <>
      <span className={`search-result__kind${entry.brand ? ` search-result__kind--${entry.brand}` : ''}`}>
        {KIND_LABEL[entry.kind]}
        {entry.brand && entry.kind !== 'marca' && <> · {brands[entry.brand].name}</>}
      </span>
      <span className="search-result__title">{entry.title}</span>
      <span className="search-result__snippet">
        {snippet.map((s, i) => (s.hit ? <mark key={i}>{s.text}</mark> : <span key={i}>{s.text}</span>))}
      </span>
    </>
  );
}
