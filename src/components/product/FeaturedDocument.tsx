import type { ProductPageData } from '../../lib/types';
import { img } from '../../lib/assets';
import { DocLink } from '../ui/DocLink';

/** Documento em destaque: imagem à esquerda, resumo e botão à direita. */
export function FeaturedDocument({ feature }: { feature: ProductPageData['feature'] }) {
  const { image, cta } = feature;
  return (
    <article className="p-feature">
      <figure className="p-feature__media">
        <img src={img(image.src)} width={image.width} height={image.height} alt={image.alt} />
      </figure>
      <div className="p-feature__body">
        <p className="eyebrow">Documento científico</p>
        <h2 className="p-feature__title">{feature.title}</h2>
        <p className="p-feature__source">{feature.source}</p>
        <p className="p-feature__excerpt">{feature.excerpt}</p>
        <DocLink className="btn-brand" to={cta.to} doc={cta.doc}>
          {cta.label}
          {cta.srLabel && <span className="visually-hidden"> {cta.srLabel}</span>}
        </DocLink>
      </div>
    </article>
  );
}
