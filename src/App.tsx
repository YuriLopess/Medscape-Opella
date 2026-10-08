import { Route, Routes } from 'react-router';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { brandOrder, brands, routes } from './data/brands';
import { documents } from './data/documents';
import { products } from './data/products';
import { DocumentPage } from './pages/DocumentPage';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ProductPage } from './pages/ProductPage';

/**
 * Rotas:
 *   /                              home
 *   /<marca>                       página da marca (data/products)
 *   /<marca>/<documento>           documento científico (data/documents)
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

        <Route path={routes.privacy} element={<LegalPage page="privacy" />} />
        <Route path={routes.terms} element={<LegalPage page="terms" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
