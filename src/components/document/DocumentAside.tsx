import { Link } from 'react-router';
import { brands } from '../../data/brands';
import { contents } from '../../data/contents';
import type { AsideArea } from '../../lib/types';
import { img } from '../../lib/assets';
import { DocLink } from '../ui/DocLink';

interface Props {
  contentIds: string[];
  areas: AsideArea[];
}

/** Barra lateral: conteúdos relacionados e outras áreas terapêuticas. */
export function DocumentAside({ contentIds, areas }: Props) {
  return (
    <aside className="doc-aside">
      <section className="aside-box" aria-labelledby="aside-more-title">
        <h2 className="aside-box__title" id="aside-more-title">
          Conteúdo adicional
        </h2>
        <ul className="aside-list">
          {contentIds.map((id) => {
            const c = contents[id];
            return (
              <li key={id} className="aside-item">
                <img src={img(c.thumb)} width={91} height={91} alt="" loading="lazy" />
                <div>
                  <h3 className="aside-item__title">{c.title}</h3>
                  <DocLink className="aside-item__link" to={c.to} doc={c.doc}>
                    Ver conteúdo →<span className="visually-hidden"> {c.srLabel}</span>
                  </DocLink>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <nav className="aside-box" aria-labelledby="aside-areas-title">
        <h2 className="aside-box__title" id="aside-areas-title">
          Explore outras áreas terapêuticas
        </h2>
        <div className="aside-tiles">
          {areas.map((a) => {
            const brand = brands[a.brand];
            return (
              <Link key={a.brand} className="aside-tile" to={brand.path}>
                <img src={img(a.image)} width={286} height={a.height} alt={`${brand.name} — ${brand.area}`} loading="lazy" />
                {a.showCta && <span>Explorar conteúdo →</span>}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
