/**
 * Artigos ID01–ID12 (layout dos PDFs do cliente). A rota é `${brand.path}/${slug}`.
 * O conteúdo de cada artigo fica no próprio arquivo e só é baixado quando a rota é aberta.
 */
import type { ArticleContent, BrandId } from '../../lib/types';
import { brands } from '../brands';

export interface ArticleEntry {
  id: string; // ex.: "ID01" (código do PDF do cliente)
  brand: BrandId;
  slug: string;
  load: () => Promise<{ default: ArticleContent }>;
}

export const articles: ArticleEntry[] = [
  { id: 'ID01', brand: 'oscal', slug: 'questionario-de-consumo-de-calcio', load: () => import('./id01') },
  { id: 'ID02', brand: 'oscal', slug: 'menopausa-e-saude-ossea', load: () => import('./id02') },
  { id: 'ID03', brand: 'oscal', slug: 'desafio-silencioso-da-osteoporose', load: () => import('./id03') },
  { id: 'ID04', brand: 'novalgina', slug: 'escolite-na-volta-as-aulas', load: () => import('./id04') },
  { id: 'ID05', brand: 'novalgina', slug: 'primeiras-24-horas-apos-a-vacina', load: () => import('./id05') },
  { id: 'ID06', brand: 'novalgina', slug: 'febre-na-pediatria', load: () => import('./id06') },
  { id: 'ID07', brand: 'allegra', slug: 'sedacao-nao-e-sono', load: () => import('./id07') },
  { id: 'ID08', brand: 'allegra', slug: 'muito-alem-da-sonolencia', load: () => import('./id08') },
  { id: 'ID09', brand: 'allegra', slug: 'mais-que-um-descongestionante', load: () => import('./id09') },
  { id: 'ID10', brand: 'enterogermina', slug: 'viroses-gastrointestinais', load: () => import('./id10') },
  { id: 'ID11', brand: 'enterogermina', slug: 'virus-respiratorios-em-criancas', load: () => import('./id11') },
  { id: 'ID12', brand: 'enterogermina', slug: 'bacillus-clausii-prevencao-diaa', load: () => import('./id12') },
];

/** Rota de um artigo pelo ID do documento (ex.: articleRoute('ID01')); `undefined` se o ID não for um artigo. */
export function articleRoute(id: string | undefined): string | undefined {
  const a = id ? articles.find((x) => x.id === id) : undefined;
  return a && `${brands[a.brand].path}/${a.slug}`;
}
