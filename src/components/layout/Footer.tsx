import { Link, NavLink } from 'react-router';
import { routes } from '../../data/brands';
import { Icon } from '../ui/Icon';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Link className="site-footer__logo" to="/" aria-label="Opella — página inicial">
          <Icon name="logo" />
        </Link>
        <nav className="site-footer__links" aria-label="Institucional">
          <NavLink to={routes.privacy}>Política de Privacidade</NavLink>
          <NavLink to={routes.terms}>Termos de Uso</NavLink>
        </nav>
        <p className="site-footer__disclaimer">
          Desenvolvido pela Medscape com o apoio da Opella. As opiniões e os pontos de vista expressos não representam
          necessariamente a visão da Medscape, de seus editores, consultores ou anunciantes.
        </p>
      </div>
    </footer>
  );
}
