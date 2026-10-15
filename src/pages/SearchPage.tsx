import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router';
import { PageShell } from '../components/layout/PageShell';
import { SearchResultBody } from '../components/search/SearchResultBody';
import { loadIndex, search } from '../search/search';
import type { SearchResult } from '../search/search';
import { Icon } from '../components/ui/Icon';

const EXAMPLES = ['febre', 'cálcio', 'probióticos', 'anti-histamínicos', 'vacina', 'osteoporose'];

/** /busca?q=… — todos os resultados da busca do cabeçalho. */
export function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q')?.trim() ?? '';
  const [draft, setDraft] = useState(q);
  const [results, setResults] = useState<SearchResult[] | null>(null);

  useEffect(() => {
    setDraft(q);
    let alive = true;
    if (!q) {
      setResults([]);
      return;
    }
    setResults(null);
    void loadIndex().then((index) => alive && setResults(search(index, q)));
    return () => {
      alive = false;
    };
  }, [q]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = draft.trim();
    setParams(next ? { q: next } : {});
  };

  return (
    <PageShell title={q ? `Busca: ${q} | Opella` : 'Busca | Opella'} mainClass="search-page">
      <div className="container search-page__inner">
        <h1 className="search-page__title">{q ? <>Resultados para “{q}”</> : 'Buscar no site'}</h1>

        <form className="search-page__form" role="search" onSubmit={onSubmit}>
          <label className="visually-hidden" htmlFor="search-page-input">
            Buscar no site
          </label>
          <input
            id="search-page-input"
            type="search"
            value={draft}
            placeholder="Busque por um tema, produto ou condição"
            autoComplete="off"
            onChange={(e) => setDraft(e.target.value)}
          />
          <button type="submit">
            <Icon name="search" />
            Buscar
          </button>
        </form>

        {results === null ? (
          <p className="search-page__status" role="status">
            Buscando…
          </p>
        ) : !q ? (
          <Examples />
        ) : results.length === 0 ? (
          <div className="search-page__empty" role="status">
            <p>Nenhum conteúdo encontrado para “{q}”. Confira a grafia ou tente um termo mais geral.</p>
            <Examples />
          </div>
        ) : (
          <>
            <p className="search-page__status" role="status">
              {results.length} resultado{results.length === 1 ? '' : 's'}
            </p>
            {/* key={q}: a cada nova busca a lista é recriada e os resultados entram em cascata */}
            <ol className="search-page__list" key={q}>
              {results.map((r, i) => (
                <li key={r.entry.to} style={{ ['--i' as string]: Math.min(i, 10) }}>
                  <Link className="search-result" to={r.entry.to}>
                    <SearchResultBody result={r} />
                  </Link>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </PageShell>
  );
}

function Examples() {
  return (
    <div className="search-page__examples">
      <p>Experimente:</p>
      <ul>
        {EXAMPLES.map((t) => (
          <li key={t}>
            <Link to={`?q=${encodeURIComponent(t)}`}>{t}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
