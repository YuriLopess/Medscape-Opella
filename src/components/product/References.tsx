import type { ProductPageData } from '../../lib/types';

export function References({ references }: { references: ProductPageData['references'] }) {
  const { note, items, style } = references;
  const list =
    style === 'numbered' ? (
      <ol className="p-refs__list p-refs__list--numbered">
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ol>
    ) : (
      <ul className={`p-refs__list${style === 'compact' ? ' p-refs__list--compact' : ''}`}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    );

  return (
    <section className="p-refs" aria-labelledby="refs-title">
      <h2 className="p-refs__title" id="refs-title">
        Referências
      </h2>
      {note && <p className="p-refs__note">{note}</p>}
      {list}
    </section>
  );
}
