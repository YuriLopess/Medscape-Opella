/**
 * Páginas de documento científico. A rota é `${brand.path}/${slug}`.
 * O corpo de cada documento fica em data/docs e só é baixado quando a página abre:
 * ID13–ID15 são gerados dos PDFs da SBP por tools/extract_sbp_docs.py; ID02 é o artigo "Menopausa e saúde óssea".
 */
import type { DocumentPageData } from '../lib/types';
import { DocLink } from '../components/ui/DocLink';

export const documents: DocumentPageData[] = [
  // ---------- Allegra · ID14 ----------
  {
    brand: 'allegra',
    slug: 'anti-histaminicos-em-doencas-alergicas',
    title: 'Anti-histamínicos em doenças alérgicas: eventos adversos',
    heading: (
      <>
        Anti-histamínicos em doenças alérgicas:
        <br />
        eventos adversos
      </>
    ),
    description:
      'Documento científico da Sociedade Brasileira de Pediatria sobre anti-histamínicos de primeira e segunda gerações: classificação, segurança e principais eventos adversos.',
    banner: 'allegra/banner-documento.webp',
    image: {
      src: 'conteudos/anti-histaminicos-eventos-adversos.webp',
      width: 961,
      height: 641,
      alt: 'Mulher espirrando em um lenço de papel',
    },
    source: (
      <>
        Sociedade Brasileira de Pediatria
        <br />
        Departamento Científico de Alergia
        <br />
        Nº 205, 13 de Maio de 2025
      </>
    ),
    loadContent: () => import('./docs/id14'),
    download: { href: '/documentos/sbp-anti-histaminicos-em-doencas-alergicas.pdf', label: 'Baixar o documento completo' },
    aside: ['sedacao-nao-e-sono', 'allegra-d-descongestionante', 'muito-alem-da-sonolencia'],
    asideAreas: [
      { brand: 'enterogermina', image: 'areas/card-enterogermina.webp', height: 105, showCta: true },
      { brand: 'oscal', image: 'areas/card-oscal.webp', height: 104, showCta: true },
      { brand: 'novalgina', image: 'areas/card-novalgina.webp', height: 104, showCta: true },
    ],
  },

  // ---------- Enterogermina · ID15 ----------
  {
    brand: 'enterogermina',
    slug: 'uso-de-probioticos-em-criancas',
    title: 'Uso de probióticos em crianças com infecções comuns da infância e na prevenção de alergias',
    heading: (
      <>
        Uso de probióticos em crianças com infecções comuns
        <br />
        da infância e na prevenção de alergias
      </>
    ),
    description:
      'Documento científico da Sociedade Brasileira de Pediatria sobre o uso de probióticos em crianças com infecções comuns da infância e na prevenção de alergias.',
    banner: 'enterogermina/banner-documento.webp',
    image: {
      src: 'conteudos/probioticos-criancas.webp',
      width: 961,
      height: 641,
      alt: 'Ilustração do sistema digestivo destacado em verde sobre o abdômen',
    },
    source: (
      <>
        Sociedade Brasileira de Pediatria
        <br />
        Departamento Científico de Alergia
        <br />
        Nº 213, 13 de Junho de 2025
      </>
    ),
    loadContent: () => import('./docs/id15'),
    download: { href: '/documentos/sbp-uso-de-probioticos-em-criancas.pdf', label: 'Baixar o documento completo' },
    aside: ['viroses-gastrointestinais', 'bacillus-clausii-diaa', 'virus-respiratorios-criancas'],
    asideAreas: [
      { brand: 'allegra', image: 'areas/card-allegra-logo.webp', height: 104 },
      { brand: 'oscal', image: 'areas/card-oscal-logo.webp', height: 104 },
      { brand: 'novalgina', image: 'areas/card-novalgina-logo.webp', height: 104 },
    ],
  },

  // ---------- Os-Cal ----------
  {
    brand: 'oscal',
    slug: 'saude-ossea-feminina',
    title: 'Saúde óssea feminina: o papel da suplementação de cálcio na prática clínica',
    heading: (
      <>
        Saúde óssea feminina: o papel da suplementação de
        <br />
        cálcio na prática clínica
      </>
    ),
    description:
      'Recomendações e evidências sobre a suplementação de cálcio ao longo da vida da mulher, incluindo seu papel na saúde óssea.',
    image: {
      src: 'conteudos/saude-ossea-feminina.webp',
      width: 961,
      height: 641,
      alt: 'Três gerações de mulheres sorrindo, lado a lado',
    },
    // corpo: texto do ID02; a fonte leva ao artigo "Menopausa e saúde óssea"
    source: <DocLink doc="ID02">Menopausa e saúde óssea</DocLink>,
    loadContent: () => import('./docs/id02'),
    aside: ['saude-ossea-da-mulher', 'desafio-osteoporose'],
    asideAreas: [
      { brand: 'allegra', image: 'areas/card-allegra-logo.webp', height: 104 },
      { brand: 'enterogermina', image: 'areas/card-enterogermina-logo.webp', height: 104 },
      { brand: 'novalgina', image: 'areas/card-novalgina-logo.webp', height: 104 },
    ],
  },

  // ---------- Novalgina · ID13 ----------
  {
    brand: 'novalgina',
    slug: 'abordagem-da-febre-aguda',
    title: 'Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses',
    heading: (
      <>
        Abordagem da Febre Aguda em Pediatria e Reflexões
        <br />
        sobre a febre nas arboviroses
      </>
    ),
    description:
      'Documento científico da Sociedade Brasileira de Pediatria sobre a abordagem da febre aguda em pediatria e a febre nas arboviroses.',
    banner: 'novalgina/banner-documento.webp',
    image: {
      src: 'conteudos/febre-aguda-arboviroses.webp',
      width: 961,
      height: 641,
      alt: 'Ilustração de um cérebro com áreas destacadas em vermelho e descargas elétricas',
    },
    source: (
      <>
        Sociedade Brasileira de Pediatria
        <br />
        Departamentos Científicos de Pediatria Ambulatorial e Infectologia
        <br />
        Nº 206, 15 de Maio de 2025
      </>
    ),
    loadContent: () => import('./docs/id13'),
    download: { href: '/documentos/sbp-abordagem-da-febre-aguda-em-pediatria.pdf', label: 'Baixar o documento completo' },
    aside: ['escolite-volta-as-aulas', 'febre-na-pediatria', 'primeiras-24h-apos-vacina'],
    asideAreas: [
      { brand: 'allegra', image: 'areas/card-allegra-logo.webp', height: 104 },
      { brand: 'enterogermina', image: 'areas/card-enterogermina-logo.webp', height: 104 },
      { brand: 'oscal', image: 'areas/card-oscal-logo.webp', height: 104 },
    ],
  },
];
