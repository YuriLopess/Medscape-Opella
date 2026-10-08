import { Link } from 'react-router';
import { brands } from '../../data/brands';
import { therapeuticAreas } from '../../data/home';
import { img } from '../../lib/assets';
import { DocLink } from '../ui/DocLink';
import { Icon } from '../ui/Icon';

export function TherapeuticAreas() {
  return (
    <section className="areas" aria-labelledby="areas-title">
      <div className="container">
        <div className="areas__box">
          <h2 className="section-title" id="areas-title">
            Explore nossas áreas terapêuticas
          </h2>
          <p className="section-subtitle">Conteúdo científico especializado para apoiar sua prática clínica.</p>

          <div className="areas__grid">
            {therapeuticAreas.map((area) => {
              const brand = brands[area.brand];
              return (
                <article key={area.brand} className={`area-card area-card--${area.modifier}`}>
                  <Link className="area-card__head" to={brand.path}>
                    <img src={img(area.image)} width={303} height={243} alt={brand.name} />
                    <h3 className="area-card__title">{area.title}</h3>
                    <p className="area-card__desc">{area.description}</p>
                  </Link>
                  <p className="area-card__label">Acesso principal</p>
                  <ul className="area-card__links">
                    {area.links.map((link, i) => (
                      <li key={i}>
                        <DocLink className="area-card__link" to={link.to} doc={link.doc}>
                          {link.label}
                          <span className="area-card__arrow">
                            <Icon name="arrow-right" />
                          </span>
                        </DocLink>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
