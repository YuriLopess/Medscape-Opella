import type { ProductPageData } from '../../lib/types';
import { routes } from '../brands';

export const novalgina: ProductPageData = {
  brand: 'novalgina',
  title: 'Novalgina | Dor e Febre | Opella',
  description:
    'Conteúdo científico sobre o manejo da dor e da febre: documento da SBP, vídeos e artigos sobre dipirona na prática clínica.',

  hero: {
    art: 'novalgina/hero.webp',
    width: 1331,
    height: 281,
    srPrefix: 'Novalgina: ',
    title: (
      <>
        <strong>Alívio rápido da dor*</strong>
        <br />e <strong>duradouro</strong> da febre**
        <br />
        para toda a família
      </>
    ),
  },

  feature: {
    image: {
      src: 'novalgina/destaque-febre-aguda.webp',
      width: 664,
      height: 493,
      alt: 'Ilustração de um cérebro com áreas destacadas em vermelho e descargas elétricas',
    },
    title: (
      <>
        Abordagem da Febre Aguda
        <br />
        em Pediatria e Reflexões sobre
        <br />a febre nas arboviroses
      </>
    ),
    source: 'Atualização científica sobre avaliação e manejo da febre na prática pediátrica.',
    excerpt:
      'Confira as principais recomendações sobre avaliação da criança febril, uso adequado de antitérmicos e particularidades do manejo da febre nas arboviroses.',
    cta: {
      to: routes.docFebreAguda,
      doc: 'ID13',
      label: 'Ver conteúdo →',
      srLabel: 'sobre a abordagem da febre aguda em pediatria',
    },
  },

  video: {
    title: 'Manejo da febre e da dor: recomendações atuais para a prática clínica',
    expert: {
      name: 'Dr. Flávio Melo',
      avatar: 'experts/flavio-melo-avatar-verde.webp',
      meta: (
        <>
          Médico Pediatra – Hospital Regional de Guarabira
          <br />
          CRM-PB: 5239 | RQE: 3065
        </>
      ),
    },
    text: 'Pediatra com ampla experiência no manejo da febre, Dr. Flávio Melo discute recomendações para o manejo racional da febre em crianças e evidências sobre o tratamento da dor aguda em adultos',
    image: {
      src: 'novalgina/video-manejo-febre-dor.webp',
      width: 665,
      height: 602,
      alt: 'Ilustração de um cérebro translúcido sobre a mão de uma pessoa',
    },
  },

  moreContent: ['escolite-volta-as-aulas', 'febre-na-pediatria', 'primeiras-24h-apos-vacina'],

  product: {
    title: (
      <>
        Novalgina<sup>®</sup>: ação analgésica e antitérmica para o alívio da dor e da febre.<sup>1</sup>
      </>
    ),
    paragraphs: [
      <>
        Com ação analgésica e antitérmica, Novalgina<sup>®</sup> está presente no manejo da dor e da febre.<sup>1</sup> Na
        pediatria, oferece benefícios no manejo dos diferentes níveis de febre. Em adultos, Novalgina Flash
        <sup>®</sup> apresenta diferenciais clínicos no tratamento da dor aguda.<sup>2</sup>
      </>,
    ],
    image: {
      src: 'novalgina/produto-novalgina.webp',
      width: 547,
      height: 387,
      alt: 'Embalagens de Novalgina: efervescente, gotas, infantil e dipirona 1 g',
    },
  },

  areas: [
    { brand: 'allegra', image: 'areas/tile-allegra.webp', width: 206, height: 124 },
    { brand: 'enterogermina', image: 'areas/tile-enterogermina-flat.webp', width: 206, height: 124 },
    { brand: 'oscal', image: 'areas/tile-oscal-flat.webp', width: 205, height: 123 },
  ],

  references: {
    style: 'compact',
    items: [
      '1. Sociedade Brasileira de Pediatria. Abordagem da Febre Aguda em Pediatria e Reflexões sobre a Febre nas Arboviroses. Documento Científico nº 206. 15 maio 2025.',
      '2. NOVALGINA® FLASH (dipirona monoidratada + cafeína). Bula do medicamento. Opella Healthcare Brazil Ltda. Registro MS 1.8620.0023. MAT-BR-2600964-1.0-03/2026.',
    ],
  },

  regulatory: [
    <>
      <strong>NOVALGINA® (dipirona monoidratada).</strong>
      <br />
      Indicação: analgésico e antitérmico. MS 1.8620.0018. O USO DO MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia
      atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO.
    </>,
    <>
      <strong>NOVALGINA® FLASH (dipirona monoidratada + cafeína).</strong>
      <br />
      Indicação: analgésico. MS 1.8620.0023. O USO DO MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE
      PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO.
    </>,
  ],
};
