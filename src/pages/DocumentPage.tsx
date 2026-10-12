import { Suspense, use, type ReactNode } from 'react';
import { PageShell } from '../components/layout/PageShell';
import { DocumentBanner } from '../components/document/DocumentBanner';
import { DocumentAside } from '../components/document/DocumentAside';
import { brands } from '../data/brands';
import type { DocumentPageData } from '../lib/types';
import { img } from '../lib/assets';

// um carregamento por documento, reaproveitado ao voltar para a mesma página
const loaded = new Map<string, Promise<{ default: ReactNode }>>();

function LoadedContent({ id, load }: { id: string; load: () => Promise<{ default: ReactNode }> }) {
  let promise = loaded.get(id);
  if (!promise) {
    promise = load();
    loaded.set(id, promise);
  }
  return <>{use(promise).default}</>;
}

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

            {data.download && (
              <a className="doc-download" href={data.download.href} download>
                {data.download.label}
                <span className="visually-hidden"> (PDF)</span>
              </a>
            )}

            <div className="doc-content">
              {data.content}
              {data.loadContent && (
                <Suspense fallback={<p className="doc-loading" aria-busy="true">Carregando o documento…</p>}>
                  <LoadedContent id={data.slug} load={data.loadContent} />
                </Suspense>
              )}
            </div>
          </article>

          <DocumentAside contentIds={data.aside} areas={data.asideAreas} />
        </div>
      </div>
    </PageShell>
  );
}
