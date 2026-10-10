import { Suspense, use } from 'react';
import { PageShell } from '../components/layout/PageShell';
import type { ArticleEntry } from '../data/articles';
import { brands } from '../data/brands';
import type { ArticleContent, ArticleData } from '../lib/types';
import { img } from '../lib/assets';

/** Artigo no layout dos PDFs enviados pelo cliente (styles/article.css). */
export function ArticlePage({ data }: { data: ArticleData }) {
  const brand = brands[data.brand];
  const { hero } = data;
  return (
    <PageShell
      title={`${data.title} | ${brand.name} | Opella`}
      description={data.description}
      theme={brand.theme}
      mainClass="article-page"
    >
      <div className="container">
        <article className={`art-card${data.layout ? ` art-card--${data.layout}` : ''}`} aria-labelledby="art-title">
          <header className="art-top">
            <div>
              <ul className="art-tags" aria-label="Categorias">
                {data.tags.map((t) => (
                  <li key={t} className="art-tag">
                    {t}
                  </li>
                ))}
              </ul>
              <h1 className="art-title" id="art-title">
                {data.heading}
              </h1>
              <p className="art-lead">{data.lead}</p>
            </div>
            <figure className="art-hero">
              {data.heroMedia ?? <img src={img(hero.src)} width={hero.width} height={hero.height} alt={hero.alt} />}
            </figure>
          </header>

          <div className={`art-body${data.bodyClass ? ` ${data.bodyClass}` : ''}`}>
            {data.body}
            {data.mat && <p className="art-mat">{data.mat}</p>}
          </div>
        </article>
        {data.pageCode && <p className="art-page-code">{data.pageCode}</p>}
      </div>
    </PageShell>
  );
}

// um carregamento por artigo, reaproveitado ao voltar para a mesma rota
const loaded = new Map<string, Promise<{ default: ArticleContent }>>();

function LoadedArticle({ entry }: { entry: ArticleEntry }) {
  let promise = loaded.get(entry.id);
  if (!promise) {
    promise = entry.load();
    loaded.set(entry.id, promise);
  }
  const content = use(promise).default;
  return <ArticlePage data={{ ...content, id: entry.id, brand: entry.brand, slug: entry.slug }} />;
}

/** Rota do artigo: baixa o conteúdo sob demanda; enquanto isso mostra o cabeçalho e o rodapé com o fundo do artigo. */
export function ArticleRoute({ entry }: { entry: ArticleEntry }) {
  const brand = brands[entry.brand];
  return (
    <Suspense
      fallback={
        <PageShell title={`${brand.name} | Opella`} description="" theme={brand.theme} mainClass="article-page">
          <div className="container" aria-busy="true">
            <div className="art-card art-card--loading" />
          </div>
        </PageShell>
      }
    >
      <LoadedArticle entry={entry} />
    </Suspense>
  );
}
