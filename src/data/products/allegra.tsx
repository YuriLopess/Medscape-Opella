import type { ProductPageData } from '../../lib/types';
import { routes } from '../brands';

export const allegra: ProductPageData = {
  brand: 'allegra',
  title: 'Allegra | Alergia | Opella',
  description:
    'Atualizações científicas sobre rinite alérgica e manejo clínico: documentos, vídeos e conteúdos sobre anti-histamínicos.',

  hero: {
    art: 'allegra/hero.webp',
    width: 1331,
    height: 281,
    srPrefix: 'Allegra: ',
    title: <>Atualizações científicas sobre rinite alérgica e manejo clínico.</>,
  },

  feature: {
    image: { src: 'allegra/destaque-anti-histaminicos.webp', width: 664, height: 453, alt: 'Mulher espirrando em um lenço de papel' },
    title: 'Anti-histamínicos em doenças alérgicas: eventos adversos',
    source: (
      <>
        Sociedade Brasileira de Pediatria
        <br />
        Departamento Científico de Alergia
        <br />
        Nº 205, 13 de Maio de 2025
      </>
    ),
    excerpt:
      'Há dezenas de formulações de anti-histamínicos (AH) anti-H1 disponíveis no mundo para o tratamento da rinite alérgica (RA) e urticária crônica (UC).',
    cta: { to: routes.docAntiHistaminicos, doc: 'ID14', label: 'Ver mais →', srLabel: 'sobre anti-histamínicos em doenças alérgicas' },
  },

  video: {
    title: 'Manejo contemporâneo das doenças alérgicas: evidências clínicas e impacto na qualidade de vida',
    expert: {
      name: 'Dr. Carlos Maurício',
      avatar: 'experts/carlos-mauricio-avatar.webp',
      meta: (
        <>
          Médico Otorrinolaringologista – CLIAOD (Clínica de Otorrinolaringologia e Fonoaudiologia)
          <br />
          CRM-DF: 15474 | RQE: 15338
        </>
      ),
    },
    text: 'Conheça a perspectiva do especialista sobre as evidências relacionadas ao uso de anti-histamínicos no manejo das doenças alérgicas, considerando eficácia, segurança, sedação e seus impactos nas atividades diárias e na qualidade de vida dos pacientes.',
    image: { src: 'allegra/video-manejo-doencas-alergicas.webp', width: 665, height: 689, alt: 'Homem com as mãos no rosto, com sintomas de alergia' },
  },

  moreContent: ['sedacao-nao-e-sono', 'allegra-d-descongestionante', 'muito-alem-da-sonolencia'],

  product: {
    title: (
      <>
        Enquanto alguns outros antialérgicos podem causar sono, Allegra<sup>®</sup> não causará*<sup>1</sup>.
      </>
    ),
    paragraphs: [
      <>
        A fexofenadina, ingrediente ativo de Allegra<sup>®</sup> oferece alívio da alergia** sem causar sono*<sup>1</sup> e
        nem prejudicar o seu foco<sup>2</sup>, aliviando sintomas como espirros, coriza e coceira nos olhos<sup>1</sup>. Pois
        você não precisa escolher entre alívio da alergia** e sono!
      </>,
    ],
    image: {
      src: 'allegra/produto-allegra-120mg.webp',
      width: 570,
      height: 412,
      alt: 'Embalagem de Allegra 120 mg, cloridrato de fexofenadina, antialérgico 24 horas',
    },
  },

  areas: [
    { brand: 'enterogermina', image: 'areas/tile-enterogermina.webp', width: 205, height: 122 },
    { brand: 'oscal', image: 'areas/tile-oscal.webp', width: 205, height: 122 },
    { brand: 'novalgina', image: 'areas/tile-novalgina.webp', width: 205, height: 122 },
  ],

  references: {
    style: 'list',
    items: [
      '*Estudos não demonstraram associação do uso do produto com alteração no padrão do sono.',
      '**Rinite alérgica e urticária. Começa a agir em 1 hora.',
      '1. Bula do Produto.',
      '2. Ansotegui IJ, Bousquet J, Canonica GW, Demoly P, Gómez RM, Meltzer EO, Murrieta-Aguttes M, Naclerio RM, Rosario Filho N, Scadding GK. Why fexofenadine is considered as a truly non-sedating antihistamine with no brain penetration: a systematic review. Curr Med Res Opin. 2024 Aug;40(8):1297-1309. doi: 10.1080/03007995.2024.2378172. Epub 2024 Jul 19. PMID: 39028636.',
    ],
  },

  regulatory: [
    <>
      <strong>ALLEGRA® (cloridrato de fexofenadina).</strong> Indicações: é um anti-histamínico destinado ao tratamento das
      manifestações alérgicas, tais como sintomas de rinite alérgica (incluindo espirros, obstrução nasal, prurido,
      coriza, conjuntivite alérgica) e urticária (erupção avermelhada e pruriginosa na pele). MS: 1.8620.0010. O USO DO
      MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER
      CONSULTADO.
    </>,
  ],
};
