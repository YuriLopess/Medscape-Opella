/**
 * Ícone SVG monocromático (cor = currentColor). As imagens ficam em
 * styles/icons.css, gerado por tools/build_icons.py a partir de src/assets/img/{brand,icons}.
 */
export type IconName =
  | 'logo'
  | 'search'
  | 'arrow-right'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'stat-conteudos'
  | 'stat-especialistas'
  | 'stat-areas'
  | 'stat-atualizacao';

interface Props {
  name: IconName;
  className?: string;
  label?: string; // ícone com significado próprio (role="img")
}

export function Icon({ name, className, label }: Props) {
  const cls = ['i', `i-${name}`, className].filter(Boolean).join(' ');
  return label ? <span className={cls} role="img" aria-label={label} /> : <span className={cls} aria-hidden="true" />;
}
