import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { articleRoute } from '../../data/articles';
import type { DocTarget } from '../../lib/types';

interface Props extends DocTarget {
  className?: string;
  children: ReactNode;
}

/**
 * Link para um conteúdo. Com `to`, navega pela rota interna; sem `to`, um `doc`
 * de artigo (ID01–ID12) leva à página do artigo. Fora isso, o documento ainda
 * não foi entregue: o link fica pendente e não navega.
 * `data-doc` guarda o ID do arquivo pedido na revisão do cliente.
 */
export function DocLink({ to, doc, className, children }: Props) {
  const href = to ?? articleRoute(doc);
  if (href) {
    return (
      <Link to={href} className={className} data-doc={doc}>
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
