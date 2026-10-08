import type { ReactNode } from 'react';

/** Marcas com área terapêutica no site. */
export type BrandId = 'allegra' | 'enterogermina' | 'oscal' | 'novalgina';

/**
 * Destino de um link de conteúdo. `to` é a rota interna; sem `to`, o documento
 * ainda não foi entregue e o link fica pendente (href="#"). `doc` é o ID do
 * arquivo pedido na revisão do cliente (ex.: "ID14").
 */
export interface DocTarget {
  to?: string;
  doc?: string;
}

/** Imagem com dimensões intrínsecas (evita mudança de layout no carregamento). */
export interface Picture {
  src: string; // caminho relativo a src/assets/img
  width: number;
  height: number;
  alt: string;
}

/** Conteúdo listado em "Conteúdo adicional" (card na landing, miniatura no documento). */
export interface ContentItem extends DocTarget {
  title: ReactNode;
  /** texto extra só para leitores de tela no link "Ver conteúdo" */
  srLabel: string;
  card: string;
  thumb: string;
  /** títulos muito longos usam fonte menor no card */
  long?: boolean;
}

export interface Expert {
  name: string;
  avatar: string;
  meta: ReactNode;
}

/** Tile de "Explore outras áreas" na landing. */
export interface AreaTile {
  brand: BrandId;
  image: string;
  width: number;
  height: number;
}

/** Card de "Explore outras áreas" na barra lateral do documento. */
export interface AsideArea {
  brand: BrandId;
  image: string;
  height: number;
  /** o layout do Allegra mostra "Explorar conteúdo →" sobre o card */
  showCta?: boolean;
}

export interface ProductPageData {
  brand: BrandId;
  title: string;
  description: string;
  hero: { art: string; width: number; height: number; srPrefix: string; title: ReactNode };
  feature: {
    image: Picture;
    title: ReactNode;
    source: ReactNode;
    excerpt: ReactNode;
    cta: DocTarget & { label: string; srLabel?: string };
  };
  video: {
    title: ReactNode;
    expert: Expert;
    text: ReactNode;
    image: Picture;
  };
  moreContent: string[]; // ids de data/contents
  product: { title: ReactNode; paragraphs: ReactNode[]; image: Picture };
  areas: AreaTile[];
  references: {
    note?: ReactNode;
    items: ReactNode[];
    /** 'list' = um item por parágrafo; 'numbered' = <ol> compacta; 'compact' = <ul> compacta */
    style: 'list' | 'numbered' | 'compact';
  };
  regulatory: ReactNode[];
}

export interface DocumentPageData {
  brand: BrandId;
  slug: string;
  title: string; // usado no <title> e no breadcrumb
  heading: ReactNode; // título do banner (com quebras do layout)
  description: string;
  banner?: string; // arte do banner (sem arte = cor do tema)
  image: Picture;
  source: ReactNode;
  content: ReactNode;
  aside: string[]; // ids de data/contents
  asideAreas: AsideArea[];
}
