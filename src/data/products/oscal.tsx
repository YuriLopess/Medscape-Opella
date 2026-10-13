import type { ProductPageData } from '../../lib/types';

export const oscal: ProductPageData = {
  brand: 'oscal',
  title: 'Os-Cal | Saúde Óssea da Mulher | Opella',
  description:
    'Informações científicas sobre cálcio e vitamina D na saúde óssea da mulher: calculadora de ingestão de cálcio, vídeos e conteúdos.',

  hero: {
    art: 'oscal/hero.webp',
    width: 1330,
    height: 280,
    srPrefix: 'Os-Cal: ',
    title: (
      <>
        Para a saúde óssea da
        <br />
        <strong>
          mulher, Oscal<sup>®</sup> é o essencial*
        </strong>
      </>
    ),
  },

  feature: {
    image: { src: 'oscal/destaque-calculadora.webp', width: 664, height: 453, alt: 'Ilustração em 3D da articulação do joelho' },
    title: 'Calculadora de ingestão de cálcio',
    source: 'Avalie a ingestão diária de cálcio de forma prática e identifique possíveis necessidades de adequação.',
    excerpt:
      'Uma ferramenta para apoiar a avaliação da ingestão de cálcio e contribuir para uma abordagem individualizada da saúde óssea.',
    // TODO: vincular ao arquivo ID01 — Questionário de consumo de cálcio
    cta: { doc: 'ID01', label: 'Acessar calculadora →' },
  },

  video: {
    title: 'Saúde óssea feminina: o papel da suplementação de cálcio na prática clínica',
    expert: {
      name: 'Dra. Lucia Costa Paiva',
      avatar: 'experts/lucia-costa-paiva-avatar.webp',
      meta: (
        <>
          Médica Ginecologista
          <br />
          UNICAMP
          <br />
          CRM-SP: 52.252
          <br />
          RQE: 129.821
        </>
      ),
    },
    text: 'Referência na área, a especialista discute recomendações e evidências sobre a suplementação de cálcio ao longo da vida da mulher.',
    image: {
      src: 'oscal/video-saude-ossea-feminina.webp',
      width: 665,
      height: 579,
      alt: 'Três gerações de mulheres sorrindo, lado a lado',
    },
  },

  moreContent: ['saude-ossea-da-mulher', 'desafio-osteoporose'],

  product: {
    title: (
      <>
        O cálcio é essencial para a manutenção da saúde óssea ao longo da vida.<sup>1</sup>
      </>
    ),
    paragraphs: [
      <>
        A ingestão adequada de cálcio contribui para a manutenção dos ossos, e as necessidades desse nutriente variam
        conforme a fase da vida.<sup>1</sup> Quando a ingestão alimentar é insuficiente, a suplementação pode ser
        considerada de acordo com as necessidades individuais e a orientação do profissional de saúde.<sup>2</sup>
      </>,
      <>
        Durante a gestação, a ingestão adequada de cálcio ganha ainda mais relevância. O Ministério da Saúde recomenda a
        suplementação de cálcio durante a gestação como estratégia para prevenção de distúrbios hipertensivos.<sup>2</sup>
      </>,
    ],
    image: {
      src: 'oscal/produto-oscal.webp',
      width: 401,
      height: 572,
      alt: 'Embalagem de Os-Cal Cálcio 500 mg, 60 comprimidos revestidos',
    },
  },

  areas: [
    { brand: 'allegra', image: 'areas/tile-allegra.webp', width: 206, height: 124 },
    { brand: 'enterogermina', image: 'areas/tile-enterogermina-flat.webp', width: 206, height: 124 },
    { brand: 'novalgina', image: 'areas/tile-novalgina-flat.webp', width: 202, height: 123 },
  ],

  references: {
    style: 'compact',
    note: '*A família Oscal apresenta uma linha de suplementos composta por cálcio e vitamina D, micronutrientes essenciais para a saúde óssea e recomentados em guidelines médicos.',
    items: [
      '1. National Institutes of Health (NIH), Office of Dietary Supplements. Calcium – Fact Sheet for Consumers. Updated September 14, 2023.',
      '2. Ministério da Saúde. Nota Técnica Conjunta nº 251/2024-COEMM/CGESMU/DGCI/SAPS/MS e CGAN/DEPPROS/SAPS/MS. Recomendações para suplementação de cálcio durante a gestação.',
    ],
  },

  // TODO: texto regulatório do Os-Cal ainda é lorem ipsum no layout
  regulatory: [
    <>
      <strong>OS-CAL® Cálcio – Contém glúten.</strong>
      <br />
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore
      magna aliquam erat volutpat.
    </>,
  ],
};
