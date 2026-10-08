import type { ProductPageData } from '../../lib/types';
import { img } from '../../lib/assets';

/** Bloco do produto: texto à esquerda, embalagem à direita. */
export function ProductHighlight({ product }: { product: ProductPageData['product'] }) {
  const { image } = product;
  return (
    <section className="p-product" aria-labelledby="product-title">
      <div className="p-product__body">
        <h2 className="p-product__title" id="product-title">
          {product.title}
        </h2>
        {product.paragraphs.map((p, i) => (
          <p key={i} className="p-product__text">
            {p}
          </p>
        ))}
      </div>
      <figure className="p-product__media">
        <img src={img(image.src)} width={image.width} height={image.height} alt={image.alt} loading="lazy" />
      </figure>
    </section>
  );
}
