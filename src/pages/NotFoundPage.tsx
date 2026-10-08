import { Link } from 'react-router';
import { PageShell } from '../components/layout/PageShell';

export function NotFoundPage() {
  return (
    <PageShell title="Página não encontrada | Opella">
      <div className="container not-found">
        <h1 className="section-title">Página não encontrada</h1>
        <p className="section-subtitle">
          O conteúdo que você procura não existe ou mudou de endereço. <Link to="/">Voltar para a página inicial</Link>.
        </p>
      </div>
    </PageShell>
  );
}
