import { useEffect, useId, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { routes } from '../../data/brands';
import { loadIndex, search } from '../../search/search';
import type { SearchResult } from '../../search/search';
import { Icon } from '../ui/Icon';
import { SearchResultBody } from '../search/SearchResultBody';

const SUGGESTIONS = 6;

/** Campo de busca do cabeçalho: sugestões enquanto digita; Enter abre a página de resultados. */
export function SearchBox() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const listId = useId();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const boxRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ao navegar, fecha e limpa
  useEffect(() => {
    setOpen(false);
    setQuery('');
    setResults([]);
  }, [pathname]);

  // fecha ao clicar fora
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  const update = async (value: string) => {
    setQuery(value);
    setActive(-1);
    const index = await loadIndex();
    // a pessoa pode ter continuado digitando enquanto o índice baixava
    if (inputRef.current && inputRef.current.value !== value) return;
    setResults(search(index, value));
    setOpen(value.trim().length >= 2);
  };

  const goTo = (to: string) => {
    setOpen(false);
    inputRef.current?.blur();
    navigate(to);
  };

  const showAll = () => {
    const q = query.trim();
    if (q) goTo(`${routes.search}?q=${encodeURIComponent(q)}`);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (open && active >= 0 && results[active]) goTo(results[active].entry.to);
    else showAll();
  };

  const shown = results.slice(0, SUGGESTIONS);
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      // com sugestões abertas, o 1º Esc só fecha o painel (o navegador apagaria o texto); o 2º limpa
      if (expanded) e.preventDefault();
      setOpen(false);
      setActive(-1);
    } else if (e.key === 'ArrowDown' && shown.length) {
      e.preventDefault();
      setOpen(true);
      setActive((a) => (a + 1) % shown.length);
    } else if (e.key === 'ArrowUp' && shown.length) {
      e.preventDefault();
      setActive((a) => (a <= 0 ? shown.length - 1 : a - 1));
    }
  };

  const expanded = open && query.trim().length >= 2;
  // o painel continua no DOM durante a animação de saída e some quando ela termina
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    if (expanded) setRendered(true);
  }, [expanded]);

  return (
    <form className="search" role="search" onSubmit={onSubmit} ref={boxRef}>
      <label className="visually-hidden" htmlFor="search-input">
        Buscar no site
      </label>
      <input
        ref={inputRef}
        className="search__input"
        id="search-input"
        type="search"
        name="q"
        placeholder="Buscar"
        autoComplete="off"
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
        value={query}
        onFocus={() => {
          void loadIndex();
          if (query.trim().length >= 2) setOpen(true);
        }}
        onChange={(e) => void update(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button className="search__submit" type="submit" aria-label="Buscar">
        <Icon name="search" />
      </button>

      <div
        className={`search__panel${expanded ? ' is-open' : ' is-closing'}`}
        hidden={!rendered}
        onAnimationEnd={(e) => {
          if (e.target === e.currentTarget && !expanded) setRendered(false);
        }}
      >
        <p className="visually-hidden" role="status">
          {expanded ? `${results.length} resultado${results.length === 1 ? '' : 's'}` : ''}
        </p>
        {shown.length > 0 ? (
          <ul className="search__list" id={listId} role="listbox" aria-label="Sugestões">
            {shown.map((r, i) => (
              <li
                key={r.entry.to}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={`search-result search-result--compact${i === active ? ' is-active' : ''}`}
                style={{ ['--i' as string]: i }}
                onPointerDown={(e) => e.preventDefault()}
                onClick={() => goTo(r.entry.to)}
                onPointerEnter={() => setActive(i)}
              >
                <SearchResultBody result={r} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="search__empty">
            Nada encontrado para “{query.trim()}”. Tente outro termo, como <em>febre</em>, <em>cálcio</em> ou{' '}
            <em>probióticos</em>.
          </p>
        )}
        {results.length > 0 && (
          <button type="button" className="search__all" onPointerDown={(e) => e.preventDefault()} onClick={showAll}>
            Ver todos os resultados ({results.length}) →
          </button>
        )}
      </div>
    </form>
  );
}
