import type { BrandId } from '../lib/types';

export interface Brand {
  id: BrandId;
  name: string; // como aparece no menu
  breadcrumb: string; // como aparece no breadcrumb dos documentos
  path: string; // rota da página da marca
  theme: string; // classe de tema (styles/themes.css)
  area: string; // área terapêutica
}

export const brands: Record<BrandId, Brand> = {
  allegra: {
    id: 'allegra',
    name: 'Allegra',
    breadcrumb: 'Allegra',
    path: '/allegra',
    theme: 'theme-allegra',
    area: 'Alergia',
  },
  enterogermina: {
    id: 'enterogermina',
    name: 'Enterogermina',
    breadcrumb: 'Enterogermina',
    path: '/enterogermina',
    theme: 'theme-enterogermina',
    area: 'Saúde Digestiva',
  },
  oscal: {
    id: 'oscal',
    name: 'Os-Cal',
    breadcrumb: 'Oscal',
    path: '/os-cal',
    theme: 'theme-oscal',
    area: 'Saúde Óssea Da Mulher',
  },
  novalgina: {
    id: 'novalgina',
    name: 'Novalgina',
    breadcrumb: 'Novalgina',
    path: '/novalgina',
    theme: 'theme-novalgina',
    area: 'Dor e Febre',
  },
};

/** Ordem do menu principal. */
export const brandOrder: BrandId[] = ['allegra', 'enterogermina', 'oscal', 'novalgina'];

/** Rotas das páginas de documento (uma por documento entregue). */
export const routes = {
  home: '/',
  privacy: '/politica-de-privacidade',
  terms: '/termos-de-uso',
  search: '/busca',
  docAntiHistaminicos: '/allegra/anti-histaminicos-em-doencas-alergicas',
  docProbioticos: '/enterogermina/uso-de-probioticos-em-criancas',
  docSaudeOssea: '/os-cal/saude-ossea-feminina',
  docFebreAguda: '/novalgina/abordagem-da-febre-aguda',
} as const;
