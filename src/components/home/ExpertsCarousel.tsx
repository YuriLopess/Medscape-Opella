import { experts } from '../../data/home';
import { useCarousel } from '../../hooks/useCarousel';
import { img } from '../../lib/assets';
import { CarouselDots } from '../ui/CarouselDots';
import { Icon } from '../ui/Icon';

export function ExpertsCarousel() {
  const c = useCarousel({ count: experts.length });

  return (
    <section className="experts" aria-labelledby="experts-title">
      <div className="container">
        <h2 className="section-title" id="experts-title">
          Conheça nossos especialistas
        </h2>
        <p className="section-subtitle">Conteúdo científico especializado para apoiar sua prática clínica.</p>

        <div className="experts__carousel" {...c.rootProps}>
          <button className="carousel-btn carousel-btn--prev" type="button" aria-label="Especialista anterior" onClick={c.prev}>
            <Icon name="chevron-left" />
          </button>

          <div className="experts__viewport" {...c.viewportProps}>
            <ul className="experts__track" ref={(el) => { c.trackRef.current = el; }}>
              {c.order.map((i) => {
                const e = experts[i];
                return (
                  <li key={i} className="expert-card">
                    <figure className="expert-card__photo">
                      <img src={img(e.photo)} width={128} height={323} alt={e.name} loading="lazy" />
                    </figure>
                    <div className="expert-card__body">
                      <h3 className="expert-card__name">{e.name}</h3>
                      <p className="expert-card__meta">{e.meta}</p>
                      <p className="expert-card__bio">{e.bio}</p>
                      <a className="expert-card__link" href={e.profile} target="_blank" rel="noopener noreferrer">
                        Ver publicações →
                        <span className="visually-hidden"> de {e.name} no Currículo Lattes (abre em nova aba)</span>
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <button className="carousel-btn carousel-btn--next" type="button" aria-label="Próximo especialista" onClick={c.next}>
            <Icon name="chevron-right" />
          </button>

          <CarouselDots count={experts.length} active={c.index} onSelect={c.goTo} />
        </div>
      </div>
    </section>
  );
}
