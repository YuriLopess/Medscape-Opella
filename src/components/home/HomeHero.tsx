import { img } from '../../lib/assets';
import { Icon } from '../ui/Icon';

export function HomeHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <div className="hero__brand">
            <Icon name="logo" className="hero__logo" label="Opella" />
            <p className="hero__tagline">
              <strong>Health.</strong> In your hands.
            </p>
          </div>

          <h1 className="hero__title" id="hero-title">
            Bem-vindo
          </h1>
          <p className="hero__text">
            Explore um hub científico com evidências, insights clínicos e ferramentas práticas nas áreas de dor, alergia
            e saúde digestiva, desenvolvido para apoiar decisões mais adequadas no cuidado ao paciente.
          </p>
        </div>

        <figure className="hero__media">
          <img
            src={img('home/hero-medicos.webp')}
            width={400}
            height={400}
            alt="Médica e médico sorrindo em um corredor de hospital"
          />
        </figure>
      </div>
    </section>
  );
}
