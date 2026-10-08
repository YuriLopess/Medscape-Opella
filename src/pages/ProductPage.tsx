import { PageShell } from '../components/layout/PageShell';
import { ProductHero } from '../components/product/ProductHero';
import { FeaturedDocument } from '../components/product/FeaturedDocument';
import { FeaturedVideo } from '../components/product/FeaturedVideo';
import { AdditionalContent } from '../components/product/AdditionalContent';
import { ProductHighlight } from '../components/product/ProductHighlight';
import { OtherAreas } from '../components/product/OtherAreas';
import { References } from '../components/product/References';
import { RegulatoryInfo } from '../components/product/RegulatoryInfo';
import { brands } from '../data/brands';
import type { ProductPageData } from '../lib/types';

/** Página de uma marca. Todas as marcas usam este modelo; o conteúdo vem de data/products. */
export function ProductPage({ data }: { data: ProductPageData }) {
  return (
    <PageShell title={data.title} description={data.description} theme={brands[data.brand].theme} mainClass="product-page">
      <div className="container">
        <ProductHero hero={data.hero} />
        <FeaturedDocument feature={data.feature} />
        <FeaturedVideo video={data.video} />
      </div>

      <AdditionalContent ids={data.moreContent} />

      <div className="container">
        <ProductHighlight product={data.product} />
        <OtherAreas areas={data.areas} />
        <References references={data.references} />
        <RegulatoryInfo paragraphs={data.regulatory} />
      </div>
    </PageShell>
  );
}
