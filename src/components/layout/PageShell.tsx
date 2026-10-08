import type { ReactNode } from 'react';
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
 */
export function PageShell({ title, description, theme, mainClass, children }: Props) {
  return (
    <div className={theme}>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <Header />
      <main className={mainClass}>{children}</main>
      <Footer />
    </div>
  );
}
