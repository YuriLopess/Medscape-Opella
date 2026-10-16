/** Blocos reutilizáveis do corpo dos artigos (classes em styles/article.css). */
import { useState, type ReactNode } from 'react';
import { img } from '../../lib/assets';

export function H2({ children, mt }: { children: ReactNode; mt?: number }) {
  return (
    <h2 className="art-h2" style={mt !== undefined ? { marginTop: mt } : undefined}>
      {children}
    </h2>
  );
}

/** Subtítulo com ícone redondo à esquerda. */
export function H3({ icon, children }: { icon?: string; children: ReactNode }) {
  return (
    <h3 className="art-h3">
      {icon && <img src={img(icon)} alt="" width={55} height={57} loading="lazy" />}
      {children}
    </h3>
  );
}

/** Faixa azul-clara (agrupa um trecho do texto). */
export function Panel({ children, pad }: { children: ReactNode; pad?: boolean }) {
  return <div className={`art-panel${pad ? ' art-panel--pad' : ''}`}>{children}</div>;
}

/** Figura com legenda centralizada. */
export function Figure({
  src,
  alt,
  width,
  height,
  center,
  left,
  captionLeft,
  mt,
  children,
}: {
  /** espaço acima (px) quando o original foge do ritmo padrão */
  mt?: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** imagem no tamanho natural, centralizada (a legenda ocupa a largura toda) */
  center?: boolean;
  /** imagem no tamanho natural, alinhada à esquerda */
  left?: boolean;
  captionLeft?: boolean;
  children?: ReactNode;
}) {
  const cls = ['art-fig', center && 'art-fig--center', left && 'art-fig--left', captionLeft && 'art-fig--cap-left'];
  return (
    <figure className={cls.filter(Boolean).join(' ')} style={mt !== undefined ? { marginTop: mt } : undefined}>
      {/* largura fixa (com max-width 100%) para reservar o espaço antes do carregamento preguiçoso */}
      <img
        src={img(src)}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={center || left ? { width } : undefined}
      />
      {children && <figcaption>{children}</figcaption>}
    </figure>
  );
}

/** Foto e minibiografia do autor. */
export function Author({ photo, name, children }: { photo: string; name: string; children: ReactNode }) {
  return (
    <div className="art-author">
      <img src={img(photo)} alt={name} width={348} height={477} loading="lazy" />
      <p>{children}</p>
    </div>
  );
}

/** Duas colunas (texto + figura), centralizadas na vertical. `media` fica à direita, ou à esquerda com `reverse`. */
export function Split({ media, reverse, tint, children }: { media: ReactNode; reverse?: boolean; tint?: string; children: ReactNode }) {
  return (
    <div className={`art-split${reverse ? ' art-split--rev' : ''}`} style={tint ? { background: tint } : undefined}>
      <div className="art-split__text">{children}</div>
      {media}
    </div>
  );
}

/** Ícones redondos com rótulo em caixa alta. */
export function IconRow({ items }: { items: { icon: string; label: string }[] }) {
  return (
    <ul className="art-icons" style={{ ['--cols' as string]: items.length }}>
      {items.map((it) => (
        <li key={it.label}>
          <img src={img(it.icon)} alt="" width={197} height={197} loading="lazy" />
          <span>{it.label}</span>
        </li>
      ))}
    </ul>
  );
}

/** Tabela azul de duas colunas. */
export function DataTable({ head, rows, caption }: { head: [ReactNode, ReactNode]; rows: [ReactNode, ReactNode][]; caption?: string }) {
  return (
    <table className="art-table">
      {caption && <caption className="visually-hidden">{caption}</caption>}
      <thead>
        <tr>
          <th scope="col">{head[0]}</th>
          <th scope="col">{head[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>{r[0]}</td>
            <td>{r[1]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Chamada com ícone grande que leva a um link externo. */
export function Cta({ href, icon, title, children }: { href: string; icon: string; title: ReactNode; children: ReactNode }) {
  return (
    <a className="art-cta" href={href} target="_blank" rel="noopener noreferrer">
      <img src={img(icon)} alt="" width={258} height={258} loading="lazy" />
      <span>
        <strong>{title}</strong>
        <small>{children}</small>
      </span>
    </a>
  );
}

/** Lista de referências numerada. */
export function References({
  items,
  title = 'Referências:',
  spaced,
  rule = true,
  wideMarker,
  titleGap,
  large,
  plainTitle,
  className,
}: {
  className?: string;
  /** título no tamanho do corpo, sem negrito (ID07) */
  plainTitle?: boolean;
  /** referências no tamanho do texto do corpo (ID06) */
  large?: boolean;
  /** espaço extra (px) entre o título e a lista */
  titleGap?: number;
  items: ReactNode[];
  title?: string;
  spaced?: boolean;
  /** o "---" que abre a lista nos artigos mais antigos */
  rule?: boolean;
  /** "1.  " (dois espaços após o número), como no ID03 */
  wideMarker?: boolean;
}) {
  return (
    <div className={`art-refs${spaced ? ' art-refs--spaced' : ''}${wideMarker ? ' art-refs--wide-marker' : ''}${large ? ' art-refs--large' : ''}${plainTitle ? ' art-refs--plain-title' : ''}${className ? ` ${className}` : ''}`}>
      {rule && <p>---</p>}
      <p className="art-refs__title" style={titleGap ? { marginBottom: titleGap } : undefined}>
        {title}
      </p>
      <ol>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ol>
    </div>
  );
}

/** Link externo (abre em nova aba). */
export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/**
 * Vídeo do YouTube que só carrega o player ao clicar (a capa vem do próprio PDF).
 * Sem `youtubeId` mostra apenas a capa: o link do vídeo ainda não foi enviado pelo cliente.
 * `framed`: a capa já traz a interface do player (título, botão de play), então não desenha a nossa por cima.
 */
export function Video({
  poster,
  title,
  youtubeId,
  framed,
}: {
  poster: string;
  title: string;
  youtubeId?: string;
  framed?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  if (youtubeId && playing) {
    return (
      <div className="art-video art-video--player">
        <iframe
          // rel=0: sugestões só do próprio canal, não de vídeos aleatórios do YouTube
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  const cover = (
    <>
      <img src={img(poster)} alt="" width={840} height={471} loading="lazy" />
      {!framed && (
        <>
          <span className="art-video__title">{title}</span>
          <span className="art-video__play" aria-hidden="true" />
        </>
      )}
    </>
  );
  const cls = `art-video art-video--cover${framed ? ' art-video--framed' : ''}`;
  return youtubeId ? (
    <button type="button" className={cls} onClick={() => setPlaying(true)} aria-label={`Assistir: ${title}`}>
      {cover}
    </button>
  ) : (
    <figure className={`${cls} art-video--soon`} aria-label={`${title} (vídeo em breve)`}>
      {cover}
      <span className="art-video__soon" aria-hidden="true">
        Em breve
      </span>
    </figure>
  );
}
