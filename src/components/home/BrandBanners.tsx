import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { routes } from '../../data/brands';
import { useCarousel } from '../../hooks/useCarousel';
import { img } from '../../lib/assets';
import { CarouselDots } from '../ui/CarouselDots';

interface Slide {
  id: string;
  label: string;
  content: ReactNode;
}

const slides: Slide[] = [
  {
    id: 'allegra',
    label: 'Allegra',
    content: (
      <>
        <div className="promo__media">
          <img className="promo__product" src={img('home/banner-allegra-produto.webp')} width={105} height={174}
          alt="Embalagem de Allegra Pediátrico 150 mL com copinho" loading="lazy" />
        </div>
        <p className="promo__title">
          <strong>Atualização SBP:</strong> Fexofenadina não impacta funções cognitivas e desempenho psicomotor.<sup>1</sup>
        </p>
        <Link className="promo__cta" to="/allegra">Saiba mais</Link>
        <p className="promo__legal">
          <strong>ALLEGRA®</strong> (cloridrato de fexofenadina). Indicações: é um anti-histamínico destinado ao
          tratamento das manifestações alérgicas, tais como sintomas de rinite alérgica (incluindo espirros, obstrução
          nasal, prurido, coriza, conjuntivite alérgica) e urticária (erupção avermelhada e pruriginosa na pele).
        </p>
      </>
    ),
  },
  {
    id: 'enterogermina',
    label: 'Enterogermina',
    content: (
      <>
        <div className="promo__media">
          <img className="promo__product" src={img('home/banner-enterogermina-produto.webp')} width={214} height={125}
          alt="Embalagem de Enterogermina Criança e Adulto" loading="lazy" />
        </div>
        <p className="promo__kicker">Sua prescrição está alinhada às últimas evidências?</p>
        <div className="promo__copy">
          <p className="promo__title">Bacillus Clausii mostra redução significativa da Diarreia Associada a Antibióticos</p>
          {/* TODO: vincular ao arquivo ID12 (Bacillus clausii e prevenção da DiAA) quando o documento chegar */}
          <Link className="promo__cta" to="/enterogermina" data-doc="ID12">Saiba mais aqui</Link>
        </div>
        <p className="promo__legal">
          Enterogermina® - UM PRODUTO OPELLA
          <br />
          ENTEROGERMINA® / ENTEROGERMINA® PLUS / ENTEROGERMINA® ADULTO. “O Bacillus clausii O/C (CNCM-I276), SIN
          (CNCM-I-275), N/R (CNCM-I-274), T (CNCM-I-273) pode contribuir com a saúde do trato gastrointestinal.
        </p>
      </>
    ),
  },
  {
    id: 'oscal',
    label: 'Os-Cal',
    content: (
      <>
        <div className="promo__media">
          <img className="promo__product" src={img('home/banner-oscal-produto.webp')} width={103} height={174}
          alt="Embalagem de Os-Cal Cálcio 500 mg" loading="lazy" />
        </div>
        <p className="promo__title">
          Nova diretriz do MS: cálcio obrigatório no pré-natal.<sup>1</sup>
          <br />
          <span className="promo__title-sub">
            <span className="promo__highlight">Veja as evidências</span> por trás da recomendação.
          </span>
        </p>
        <Link className="promo__cta" to="/os-cal">Saiba mais</Link>
        <p className="promo__legal">
          1. Ministério da saúde. Nota técnica conjunta n° 251/2024-coemm/ogesmu/dgci/saps,ms e cgan/deppros/saps/ms
          [internet] [atado 2025 nov 13]. Disponível em: https://www.govbr/saude os-cal* comprimidos. Contém glúten.
          Mat-br-2601211 - 1.0 - 04/2026.
        </p>
      </>
    ),
  },
  {
    id: 'novalgina',
    label: 'Novalgina',
    content: (
      <>
        <div className="promo__media">
          <img className="promo__product" src={img('home/banner-novalgina-produto.webp')} width={152} height={188}
          alt="Embalagens de Novalgina Infantil, solução oral" loading="lazy" />
        </div>
        <p className="promo__title">
          <strong>A SBP atualizou a abordagem da febre em pediatria. Sua prática está alinhada?</strong>
        </p>
        <Link className="promo__cta" to={routes.docFebreAguda} data-doc="ID13">Acesse aqui o novo guia</Link>
        <p className="promo__legal">
          4. Sociedade Brasileira de Pediatria (SBP). Abordagem da febre aguda em pediatria e reflexões sobre a febre nas
          arboviroses. Documento Científico nº 206, de 15 de maio de 2025.
        </p>
      </>
    ),
  },
];

/** Banners das marcas: um por vez, troca automática a cada 7 s. */
export function BrandBanners() {
  const c = useCarousel({ count: slides.length, autoplay: 7000 });

  return (
    <section className="promo" aria-roledescription="carrossel" aria-label="Destaques das marcas">
      <div className="container">
        <div className="promo__carousel" {...c.rootProps}>
          <div className="promo__viewport" {...c.viewportProps}>
            <div className="promo__track" ref={(el) => { c.trackRef.current = el; }}>
              {c.order.map((i, pos) => {
                const s = slides[i];
                const hidden = pos !== 0; // só o slide visível recebe foco e é lido
                return (
                  <div
                    key={s.id}
                    className={`promo__box promo__box--${s.id}`}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} de ${slides.length}: ${s.label}`}
                    aria-hidden={hidden}
                    inert={hidden}
                  >
                    {s.content}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="promo__controls">
            <CarouselDots className="promo__dots" count={slides.length} active={c.index} onSelect={c.goTo} />
            <button
              className="promo__toggle"
              type="button"
              aria-pressed={c.stopped}
              aria-label={c.stopped ? 'Continuar a troca automática' : 'Pausar a troca automática'}
              onClick={c.toggle}
            >
              <span className="promo__toggle-icon" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
