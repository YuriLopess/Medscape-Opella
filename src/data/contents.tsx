/**
 * Conteúdos científicos citados em "Conteúdo adicional" (cards da landing e
 * miniaturas da barra lateral dos documentos). Um conteúdo sem `to` ainda não
 * tem página: o link fica pendente com o ID do arquivo pedido pela revisão.
 */
import type { ContentItem } from '../lib/types';

export const contents: Record<string, ContentItem> = {
  // ---------- Allegra ----------
  'sedacao-nao-e-sono': {
    title: 'Sedação não é sono: por que anti-histamínicos sedativos podem prejudicar a criança',
    srLabel: 'sobre sedação e anti-histamínicos',
    card: 'conteudos/sedacao-nao-e-sono-card.webp',
    thumb: 'conteudos/sedacao-nao-e-sono-thumb.webp',
    doc: 'ID07',
  },
  'allegra-d-descongestionante': {
    title: (
      <>
        Allegra D<sup>®</sup>: mais que um descongestionante
      </>
    ),
    srLabel: 'sobre Allegra D',
    card: 'conteudos/allegra-d-descongestionante-card.webp',
    thumb: 'conteudos/allegra-d-descongestionante-thumb.webp',
    doc: 'ID09',
  },
  'muito-alem-da-sonolencia': {
    title: 'Muito além da sonolência: impactos dos antialérgicos de 1ª geração em crianças',
    srLabel: 'sobre antialérgicos de 1ª geração',
    card: 'conteudos/muito-alem-da-sonolencia-card.webp',
    thumb: 'conteudos/muito-alem-da-sonolencia-thumb.webp',
    doc: 'ID08', // o conteúdo inclui vídeo
  },

  // ---------- Enterogermina ----------
  'viroses-gastrointestinais': {
    title: 'Viroses gastrointestinais: do diagnóstico à restauração da microbiota intestinal',
    srLabel: 'sobre viroses gastrointestinais',
    card: 'conteudos/viroses-gastrointestinais-card.webp',
    thumb: 'conteudos/viroses-gastrointestinais-thumb.webp',
    doc: 'ID10',
  },
  'bacillus-clausii-diaa': {
    title: (
      <>
        <em>Bacillus clausii</em> (O/C, N/R, SIN e T), e prevenção da diarreia associada a antibióticos (DiAA):
        evidências de uma revisão sistemática atualizada
      </>
    ),
    srLabel: 'sobre Bacillus clausii e prevenção da DiAA',
    card: 'conteudos/bacillus-clausii-diaa-card.webp',
    thumb: 'conteudos/bacillus-clausii-diaa-thumb.webp',
    doc: 'ID12',
    long: true,
  },
  'virus-respiratorios-criancas': {
    title: 'Vírus respiratórios em crianças: por que os antibióticos nem sempre são a resposta',
    srLabel: 'sobre vírus respiratórios em crianças',
    card: 'conteudos/virus-respiratorios-criancas-card.webp',
    thumb: 'conteudos/virus-respiratorios-criancas-thumb.webp',
    doc: 'ID11',
  },

  // ---------- Os-Cal ----------
  'saude-ossea-da-mulher': {
    title: 'Saúde Óssea Da Mulher',
    srLabel: 'sobre saúde óssea da mulher',
    card: 'conteudos/saude-ossea-da-mulher-card.webp',
    thumb: 'conteudos/saude-ossea-da-mulher-thumb.webp',
    doc: 'ID02',
  },
  'desafio-osteoporose': {
    title: 'O desafio silencioso da osteoporose: por que o cuidado de hoje define o amanhã',
    srLabel: 'sobre osteoporose',
    card: 'conteudos/desafio-osteoporose-card.webp',
    thumb: 'conteudos/desafio-osteoporose-thumb.webp',
    doc: 'ID03',
  },

  // ---------- Novalgina ----------
  'escolite-volta-as-aulas': {
    title: 'Escolite na volta às aulas: o que está por trás da febre nas primeiras semanas',
    srLabel: 'sobre escolite na volta às aulas',
    card: 'conteudos/escolite-volta-as-aulas-card.webp',
    thumb: 'conteudos/escolite-volta-as-aulas-thumb.webp',
    doc: 'ID04',
  },
  'febre-na-pediatria': {
    title: 'Febre na Pediatria: o que realmente guia a conduta',
    srLabel: 'sobre febre na pediatria',
    card: 'conteudos/febre-na-pediatria-card.webp',
    thumb: 'conteudos/febre-na-pediatria-thumb.webp',
    doc: 'ID06',
  },
  'primeiras-24h-apos-vacina': {
    title: 'O que acontece nas primeiras 24 horas após a vacina. E o que fazer',
    srLabel: 'sobre as primeiras 24 horas após a vacina',
    card: 'conteudos/primeiras-24h-apos-vacina-card.webp',
    thumb: 'conteudos/primeiras-24h-apos-vacina-thumb.webp',
    doc: 'ID05',
  },
};
