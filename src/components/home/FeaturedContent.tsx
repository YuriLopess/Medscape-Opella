import { featured } from '../../data/home';
import { img } from '../../lib/assets';
import { DocLink } from '../ui/DocLink';

export function FeaturedContent() {
  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="container">
        <h2 className="section-title" id="featured-title">
          Conteúdos em destaque
        </h2>

        <div className="featured__grid">
          {featured.map((item) => (
            <article key={item.title} className="content-card">
              <div className="content-card__media">
                <img src={img(item.image)} width={425} height={186} alt="" loading="lazy" />
                <span className={`content-card__badge content-card__badge--${item.badgeModifier}`}>{item.badge}</span>
              </div>
              <div className="content-card__body">
                <h3 className="content-card__title">{item.title}</h3>
                <p className="content-card__source">{item.source}</p>
                <p className="content-card__excerpt">{item.excerpt}</p>
                <DocLink className="content-card__more" to={item.to} doc={item.doc}>
                  Ver mais →<span className="visually-hidden"> {item.srLabel}</span>
                </DocLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
