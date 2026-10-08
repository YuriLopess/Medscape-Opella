import type { ReactNode } from 'react';
import { Link } from 'react-router';
import type { DocTarget } from '../../lib/types';

interface Props extends DocTarget {
  className?: string;
  children: ReactNode;
}

/**
 * Link para um conteúdo. Com `to`, navega pela rota interna. Sem `to`, o
 * documento ainda não foi entregue: o link fica pendente e não navega.
 * `data-doc` guarda o ID do arquivo pedido na revisão do cliente.
 */
export function DocLink({ to, doc, className, children }: Props) {
  if (to) {
    return (
      <Link to={to} className={className} data-doc={doc}>
        {children}
      </Link>
    );
  }
  return (
    <a href="#" className={className} data-doc={doc} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  );
}
