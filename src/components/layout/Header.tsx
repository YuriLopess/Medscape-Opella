import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { brandOrder, brands } from '../../data/brands';
import { Icon } from '../ui/Icon';
import { SearchBox } from './SearchBox';

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // fecha o menu mobile ao navegar, com Esc e ao voltar para o desktop
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const mq = window.matchMedia('(min-width: 1001px)');
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <p className="site-header__disclaimer">Solicitado pela Opella e desenvolvido pela Medscape.</p>

        <div className="site-header__bar">
          <Link className="site-header__logo" to="/" aria-label="Opella — página inicial">
            <Icon name="logo" />
          </Link>

          <nav className={`main-nav${open ? ' is-open' : ''}`} id="main-nav" aria-label="Principal">
            <ul className="main-nav__list">
              <li>
                <NavLink className="main-nav__link" to="/" end>
                  Home
                </NavLink>
              </li>
              {brandOrder.map((id) => (
                <li key={id}>
                  {/* sem `end`: as páginas de documento da marca também marcam o item */}
                  <NavLink className="main-nav__link" to={brands[id].path}>
                    {brands[id].name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <SearchBox />

          <button
            className="nav-toggle"
            type="button"
            aria-controls="main-nav"
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav-toggle__bars" />
          </button>
        </div>
      </div>
    </header>
  );
}
