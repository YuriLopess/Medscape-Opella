import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Volta ao topo a cada troca de página (o roteador não faz isso sozinho). */
export function ScrollToTop() {
  const { pathname } = useLocation();
  // chaves obrigatórias: scrollTo() retorna uma Promise em navegadores recentes,
  // e o useEffect trataria esse retorno como função de limpeza
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
