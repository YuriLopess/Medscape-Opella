import { PageShell } from '../components/layout/PageShell';
import { DocumentBanner } from '../components/document/DocumentBanner';
import { DocumentAside } from '../components/document/DocumentAside';
import { brands } from '../data/brands';
import type { DocumentPageData } from '../lib/types';
import { img } from '../lib/assets';

/** Página de documento científico de uma marca; o conteúdo vem de data/documents. */
export function DocumentPage({ data }: { data: DocumentPageData }) {
  const brand = brands[data.brand];
  const { image } = data;
  return (
    <PageShell title={`${data.title} | ${brand.name} | Opella`} description={data.description} theme={brand.theme} mainClass="document-page">
      <div className="container">
        <DocumentBanner brand={brand} heading={data.heading} title={data.title} banner={data.banner} />

        <div className="doc-layout">
          <article className="doc-body" aria-label="Documento">
            <figure className="doc-body__media">
              <img src={img(image.src)} width={image.width} height={image.height} alt={image.alt} />
            </figure>

            <div className="doc-source">
              <span className="doc-source__mark" aria-hidden="true" />
              <p>{data.source}</p>
            </div>

            <div className="doc-content">{data.content}</div>
          </article>

          <DocumentAside contentIds={data.aside} areas={data.asideAreas} />
        </div>
      </div>
    </PageShell>
  );
}
