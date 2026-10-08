import type { ReactNode } from 'react';
import { useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';

interface Props {
  title: string;
  description?: string;
  /** classe de tema da marca (styles/themes.css) */
  theme?: string;
  /** classe do <main> (ex.: product-page, document-page) */
  mainClass?: string;
  children: ReactNode;
}

/**
 * Estrutura comum de todas as páginas: <title>/<meta> (o React 19 os move para
 * o <head>), cabeçalho, conteúdo e rodapé. O tema envolve tudo para que menu,
 * busca e rodapé também recebam as cores da marca.
 *
 * O <main> usa a rota como `key`: ao navegar ele é recriado e a animação de
 * entrada (styles/motion.css) roda de novo, inclusive entre páginas do mesmo
 * modelo (ex.: /allegra → /enterogermina). Cabeçalho e rodapé não piscam.
 */
export function PageShell({ title, description, theme, mainClass, children }: Props) {
  const { pathname } = useLocation();
  return (
    <div className={theme}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <Header />
      <main key={pathname} className={['page-enter', mainClass].filter(Boolean).join(' ')}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
