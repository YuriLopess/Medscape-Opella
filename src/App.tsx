import { Route, Routes } from 'react-router';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { brandOrder, brands, routes } from './data/brands';
import { articles } from './data/articles';
import { documents } from './data/documents';
import { products } from './data/products';
import { ArticleRoute } from './pages/ArticlePage';
import { DocumentPage } from './pages/DocumentPage';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';
import { SearchPage } from './pages/SearchPage';

/**
 * Rotas:
 *   /                              home
 *   /<marca>                       página da marca (data/products)
 *   /<marca>/<documento>           documento científico (data/documents)
 *   /<marca>/<artigo>              artigo ID01–ID12 no layout dos PDFs (data/articles, carregado sob demanda)
 *   /busca?q=…                     resultados da busca do cabeçalho
 *   /politica-de-privacidade, /termos-de-uso
 */
export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path={routes.home} element={<HomePage />} />

        {brandOrder.map((id) => (
          <Route key={id} path={brands[id].path} element={<ProductPage data={products[id]} />} />
        ))}

        {documents.map((doc) => (
          <Route key={doc.slug} path={`${brands[doc.brand].path}/${doc.slug}`} element={<DocumentPage data={doc} />} />
        ))}

        {articles.map((a) => (
          <Route key={a.id} path={`${brands[a.brand].path}/${a.slug}`} element={<ArticleRoute entry={a} />} />
        ))}

        <Route path={routes.privacy} element={<LegalPage page="privacy" />} />
        <Route path={routes.terms} element={<LegalPage page="terms" />} />
        <Route path={routes.search} element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
