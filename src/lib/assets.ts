/**
 * Resolve imagens de src/assets/img pelo caminho relativo, ex.: img('home/hero-medicos.webp').
 * Todas as imagens passam pelo Vite (nome com hash no build). Um caminho errado
 * quebra já no desenvolvimento, em vez de virar uma imagem quebrada em produção.
 */
const files = import.meta.glob<string>('../assets/img/**/*.{webp,png,jpg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function img(path: string): string {
  const url = files[`../assets/img/${path}`];
  if (!url) throw new Error(`Imagem não encontrada em src/assets/img: ${path}`);
  return url;
}
