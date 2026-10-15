/** Conteúdo da home. */
import type { ReactNode } from 'react';
import type { BrandId, DocTarget } from '../lib/types';
import type { IconName } from '../components/ui/Icon';
import { routes } from './brands';

// ---------- Áreas terapêuticas ----------
export interface TherapeuticArea {
  brand: BrandId;
  modifier: string; // area-card--<modifier>
  image: string;
  title: string;
  description: string;
  links: (DocTarget & { label: ReactNode })[];
}

export const therapeuticAreas: TherapeuticArea[] = [
  {
    brand: 'allegra',
    modifier: 'allegra',
    image: 'home/area-allegra.webp',
    title: 'Alergia',
    description: 'Atualizações científicas sobre rinite alérgica e manejo clínico.',
    links: [
      { to: routes.docAntiHistaminicos, doc: 'ID14', label: <>Gerações de<br />anti-histamínicos</> },
      { doc: 'ID09', label: 'Congestão nasal' }, // Mais que um descongestionante: Eficácia Comprovada, Segurança Garantida
    ],
  },
  {
    brand: 'enterogermina',
    modifier: 'enterogermina',
    image: 'home/area-enterogermina.webp',
    title: 'Saúde Digestiva',
    description: 'Equilíbrio da Flora Intestinal.',
    links: [
      { doc: 'ID12', label: 'Prevenção da DiAA' }, // Bacillus clausii (OC, NR, SIN e T) e prevenção da DiAA
      { doc: 'ID10', label: <>Viroses<br />gastrointestinais</> },
    ],
  },
  {
    brand: 'oscal',
    modifier: 'oscal',
    image: 'home/area-oscal.webp',
    title: 'Saúde Óssea Da Mulher',
    description: 'Informações científicas sobre cálcio e vitamina D.',
    links: [
      { doc: 'ID01', label: <>Calculadora de<br />ingestão de cálcio</> }, // Questionário de consumo de cálcio
      { doc: 'ID03', label: <>Prevenção da<br />osteoporose</> }, // O desafio silencioso da osteoporose
    ],
  },
  {
    brand: 'novalgina',
    modifier: 'novalgina',
    image: 'home/area-novalgina.webp',
    title: 'Dor e Febre',
    description: 'Conteúdo sobre manejo da dor e febre.',
    links: [
      { to: routes.docFebreAguda, doc: 'ID13', label: 'Algoritmo de febre' },
      { to: routes.docFebreAguda, doc: 'ID13', label: <>Dipirona vs.<br />paracetamol</> },
    ],
  },
];

// ---------- Especialistas ----------
/** Perfis enviados pelo cliente para o CTA "Ver publicações". */
const LATTES = {
  flavio: 'http://lattes.cnpq.br/7376017345403747',
  carlos: 'http://lattes.cnpq.br/3646363034328241',
  lucia: 'http://lattes.cnpq.br/7268850205181193',
};

export interface ExpertCard {
  name: string;
  photo: string;
  meta: ReactNode;
  bio: string;
  /** currículo Lattes do especialista (link externo, abre em nova aba) */
  profile: string;
}

export const experts: ExpertCard[] = [
  {
    name: 'Dr. Flávio Melo',
    photo: 'experts/flavio-melo.webp',
    meta: <>Médico Pediatra<br />Hospital Regional de Guarabira<br />CRM-PB: 5239<br />RQE: 3065</>,
    // um card só (pedido do cliente): reúne os conteúdos de Novalgina (febre e dor) e Enterogermina (microbiota)
    bio: 'Pediatra com experiência em saúde infantil, aborda o manejo da febre e da dor e compartilha orientações sobre a saúde da microbiota intestinal.',
    profile: LATTES.flavio,
  },
  {
    name: 'Dr. Carlos Maurício',
    photo: 'experts/carlos-mauricio.webp',
    meta: <>Médico Otorrinolaringologista<br />CLIAOD (Clínica de Otorrinolaringologia e Fonoaudiologia)<br />CRM-DF: 15474<br />RQE: 15338</>,
    bio: 'Otorrinolaringologista, aborda o manejo das doenças alérgicas e o papel dos anti-histamínicos no controle dos sintomas.',
    profile: LATTES.carlos,
  },
  {
    name: 'Dra. Lucia Costa Paiva',
    photo: 'experts/lucia-costa-paiva.webp',
    meta: <>Médica Ginecologista<br />UNICAMP<br />CRM-SP: 52.252<br />RQE: 129.821</>,
    bio: 'Ginecologista, aborda a importância do cálcio na saúde da mulher, da prevenção da perda óssea à suplementação durante a gestação.',
    profile: LATTES.lucia,
  },
];

// ---------- Conteúdos em destaque ----------
export interface FeaturedItem extends DocTarget {
  image: string;
  badge: string;
  badgeModifier: 'allegra' | 'entero' | 'novalgina';
  title: string;
  source: ReactNode;
  excerpt: string;
  srLabel: string;
}

export const featured: FeaturedItem[] = [
  {
    image: 'home/destaque-anti-histaminicos.webp',
    badge: 'Documento científico',
    badgeModifier: 'allegra',
    title: 'Anti-histamínicos em doenças alérgicas: eventos adversos',
    source: <>Sociedade Brasileira de Pediatria<br />Departamento Científico de Alergia<br />Nº 205, 13 de Maio de 2025</>,
    excerpt:
      'Há dezenas de formulações de anti-histamínicos (AH) anti-H1 disponíveis no mundo para o tratamento da rinite alérgica (RA) e urticária crônica (UC), incluindo formulações sistêmicas e tópicas.',
    to: routes.docAntiHistaminicos,
    doc: 'ID14',
    srLabel: 'sobre anti-histamínicos em doenças alérgicas',
  },
  {
    image: 'home/destaque-probioticos.webp',
    badge: 'Guia prático de atualização',
    badgeModifier: 'entero',
    title: 'Uso de probióticos em crianças com infecções comuns da infância e na prevenção de alergias',
    source: <>Sociedade Brasileira de Pediatria<br />Departamento Científico de Alergia<br />Nº 213, 13 de Junho de 2025</>,
    excerpt:
      'O microbioma humano desempenha um papel essencial na proteção do hospedeiro e no desenvolvimento de um sistema imunológico equilibrado.',
    to: routes.docProbioticos,
    doc: 'ID15',
    srLabel: 'sobre uso de probióticos em crianças',
  },
  {
    image: 'home/destaque-febre-aguda.webp',
    badge: 'Documento científico',
    badgeModifier: 'novalgina',
    title: 'Abordagem da febre aguda em pediatria e reflexões sobre a febre nas arboviroses',
    source: (
      <>
        Sociedade Brasileira de Pediatria<br />Departamentos Científicos de Pediatria Ambulatorial e Infectologia<br />Nº
        206, 15 de Maio de 2025
      </>
    ),
    excerpt:
      'A febre representa uma das queixas mais frequentes nos atendimentos pediátricos, tanto em consultas ambulatoriais como em atendimentos de emergência.',
    to: routes.docFebreAguda,
    doc: 'ID13',
    srLabel: 'sobre abordagem da febre aguda em pediatria',
  },
];

// ---------- Números ----------
export const stats: { icon: IconName; value: string; label: string; desc: string; textValue?: boolean }[] = [
  { icon: 'stat-conteudos', value: '14', label: 'conteúdos científicos', desc: 'Artigos, videos, infográficos e casos clínicos.' },
  { icon: 'stat-especialistas', value: '+4', label: 'especialistas', desc: 'Nacionais' },
  { icon: 'stat-areas', value: '4', label: 'áreas terapêuticas', desc: 'Alergia, Saúde Digestiva, Saúde Óssea e Dor e Febre.' },
  { icon: 'stat-atualizacao', value: 'Atualização', label: 'contínua', desc: 'Conteúdo novo toda semana.', textValue: true },
];

// ---------- Dizeres legais ----------
export const legalNotice: ReactNode[] = [
  <>
    <strong>ALLEGRA® (cloridrato de fexofenadina).</strong> Indicações: é um anti-histamínico destinado ao tratamento das
    manifestações alérgicas, tais como sintomas de rinite alérgica (incluindo espirros, obstrução nasal, prurido, coriza,
    conjuntivite alérgica) e urticária (erupção avermelhada e pruriginosa na pele). MS: 1.8620.0010. O USO DO MEDICAMENTO
    PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO.
  </>,
  <><strong>ENTEROGERMINA® – Não contém glúten.</strong></>,
  <>
    <strong>NOVALGINA® (dipirona monoidratada).</strong> Indicação: analgésico e antitérmico. MS 1.8620.0018. O USO DO
    MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER
    CONSULTADO.
  </>,
  <><strong>OS-CAL® Cálcio – Contém glúten.</strong></>,
  <><strong>TARGIFOR® Te ajuda! Stress – Não contém glúten.</strong></>,
  <>
    <strong>DULCOLAX® (bisacodil).</strong> Indicação: casos de constipação intestinal, no preparo para procedimentos
    diagnósticos, no pré e pós-operatório e em condições que exigem uma evacuação facilitada. MS 1.8620.0020.
  </>,
  <>
    <strong>NOVALGINA®</strong> (dipirona monoidratada). Indicação: analgésico e antitérmico. MS 1.8620.0018. O USO DO
    MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER
    CONSULTADO. MAT-BR-XXXXX-1.0-XX/2026.
  </>,
];
