import { Link } from 'react-router';
import type { ReactNode } from 'react';
import type { Brand } from '../../data/brands';
import { img } from '../../lib/assets';

interface Props {
  brand: Brand;
  heading: ReactNode;
  title: string;
  banner?: string;
}

/** Banner com o título do documento e o breadcrumb. */
export function DocumentBanner({ brand, heading, title, banner }: Props) {
  return (
    <header className="doc-banner">
      {banner && <img className="doc-banner__art" src={img(banner)} width={1331} height={281} alt="" />}
      <h1 className="doc-banner__title">{heading}</h1>
      <nav className="breadcrumb" aria-label="Você está em">
        <ol>
          <li><Link to="/">Home</Link></li>
          <li><Link to={brand.path}>{brand.breadcrumb}</Link></li>
          <li>Documento científico</li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
    </header>
  );
}
