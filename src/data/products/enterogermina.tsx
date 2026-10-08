import type { ProductPageData } from '../../lib/types';
import { routes } from '../brands';

export const enterogermina: ProductPageData = {
  brand: 'enterogermina',
  title: 'Enterogermina | Saúde Digestiva | Opella',
  description:
    'Evidências sobre microbiota, probióticos e equilíbrio da flora intestinal: documentos, vídeos e conteúdos sobre Bacillus clausii.',

  hero: {
    art: 'enterogermina/hero.webp',
    width: 1331,
    height: 281,
    srPrefix: 'Enterogermina: ',
    title: (
      <>
        O Probiótico Nº 1 do mundo<sup>1</sup>
        <br />
        que Restabelece e Equilibra
        <br />a Flora intestinal*<sup>2</sup>
      </>
    ),
  },

  feature: {
    image: {
      src: 'enterogermina/destaque-probioticos.webp',
      width: 664,
      height: 574,
      alt: 'Ilustração do sistema digestivo destacado em verde sobre o abdômen',
    },
    title: (
      <>
        {'Uso de probióticos em '}
        <br />
        crianças com infecções comuns da infância e na prevenção de alergias
      </>
    ),
    source:
      'Recomendações da Sociedade Brasileira de Pediatria para o uso racional e seguro de probióticos na prática pediátrica.',
    excerpt:
      'Confira as evidências sobre cepas específicas, indicações e tempo de uso dos probióticos na prevenção de alergias e infecções comuns da infância e no manejo de condições gastrointestinais.',
    cta: { to: routes.docProbioticos, doc: 'ID15', label: 'Ver mais →', srLabel: 'sobre o uso de probióticos em crianças' },
  },

  video: {
    title: 'Antibioticoterapia e microbiota intestinal: evidências e aplicações dos probióticos na prática clínica',
    expert: {
      name: 'Dr. Flávio Melo',
      avatar: 'experts/flavio-melo-avatar.webp',
      meta: (
        <>
          Médico Pediatra – Hospital Regional de Guarabira
          <br />
          CRM-PB: 5239 | RQE: 3065
        </>
      ),
    },
    text: 'Com mais de 20 anos de experiência em Pediatria, Dr. Flávio Melo discute os impactos da antibioticoterapia na microbiota intestinal e as evidências sobre o uso de probióticos durante e após o tratamento.',
    image: {
      src: 'enterogermina/video-antibioticoterapia.webp',
      width: 665,
      height: 637,
      alt: 'Médica conversando com uma paciente, ambas de máscara',
    },
  },

  moreContent: ['viroses-gastrointestinais', 'bacillus-clausii-diaa', 'virus-respiratorios-criancas'],

  product: {
    title: (
      <>
        Enterogermina<sup>®</sup> contribui para a saúde gastrointestinal.
      </>
    ),
    paragraphs: [
      <>
        A antibioticoterapia pode alterar o equilíbrio da microbiota intestinal e estar associada a sintomas
        gastrointestinais, como a diarreia associada a antibióticos (DAA).<sup>3</sup>
      </>,
      <>
        Enterogermina<sup>®</sup>, com <em>Bacillus clausii</em> (O/C, SIN, N/R, T), contribui para o equilíbrio da flora
        intestinal.<sup>4</sup>
      </>,
    ],
    image: {
      src: 'enterogermina/produto-enterogermina.webp',
      width: 567,
      height: 345,
      alt: 'Embalagens de Enterogermina Criança e Adulto, Adulto e Plus',
    },
  },

  areas: [
    { brand: 'allegra', image: 'areas/tile-allegra.webp', width: 206, height: 124 },
    { brand: 'oscal', image: 'areas/tile-oscal-flat.webp', width: 205, height: 123 },
    { brand: 'novalgina', image: 'areas/tile-novalgina-flat.webp', width: 202, height: 123 },
  ],

  references: {
    style: 'numbered',
    note: '*Uma flora intestinal equilibrada promove um ambiente desfavorável para bactérias patogênicas, promovendo a saúde intestinal.',
    items: [
      'Lopetuso L et al 2016; Paixão e Castro, 2016.',
      <>
        Giua et al (2024). A Prospective Real-World Study of <em>Bacillus clausii</em> Evaluating Use, Treatment Habits and
        Patient Satisfaction in Italian Community Pharmacies: The PEGASO Study. Drugs - Real World Outcomes (2024)
        11:137–147
      </>,
      <>
        Acosta-Rodríguez-Bueno CP, et al. Effectiveness of <em>Bacillus clausii</em> (O/C, N/R, SIN, T) in the Prevention
        of Antibiotic-Associated Diarrhea and Gastrointestinal Symptoms: A Systematic Review. Antibiotics.
        2025;14(5):439.
      </>,
      'Rotulagem de Enterogermina® vigente no Brasil.',
    ],
  },

  regulatory: [
    <>
      <strong>Enterogermina® - UM PRODUTO OPELLA</strong>
      <br />
      ENTEROGERMINA® / ENTEROGERMINA® PLUS / ENTEROGERMINA® ADULTO. “O <em>Bacillus clausii</em> O/C (CNCM-I276), SIN
      (CNCM-I-275), N/R (CNCM-I-274), T (CNCM-I-273) pode contribuir com a saúde do trato gastrointestinal”. NÃO CONTÉM
      GLÚTEN.
    </>,
  ],
};
