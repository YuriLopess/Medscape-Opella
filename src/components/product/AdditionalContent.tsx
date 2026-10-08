import { contents } from '../../data/contents';
import { img } from '../../lib/assets';
import { DocLink } from '../ui/DocLink';

/** "Conteúdo adicional": cards em faixa colorida (2 cards ficam centralizados). */
export function AdditionalContent({ ids }: { ids: string[] }) {
  return (
    <section className="p-more" aria-labelledby="more-title">
      <div className="container">
        <h2 className="p-more__title" id="more-title">
          Conteúdo adicional
        </h2>
        <div className={`p-more__grid${ids.length === 2 ? ' p-more__grid--2' : ''}`}>
          {ids.map((id) => {
            const c = contents[id];
            return (
              <article key={id} className="more-card">
                <figure className="more-card__media">
                  <img src={img(c.card)} alt="" loading="lazy" />
                </figure>
                <div className="more-card__body">
                  <p className="more-card__label">Artigo</p>
                  <h3 className={`more-card__title${c.long ? ' more-card__title--long' : ''}`}>{c.title}</h3>
                  <DocLink className="more-card__link" to={c.to} doc={c.doc}>
                    Ver conteúdo →<span className="visually-hidden"> {c.srLabel}</span>
                  </DocLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
