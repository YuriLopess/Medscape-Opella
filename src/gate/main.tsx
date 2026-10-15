import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CadastroPage from './CadastroPage';
import { DEMO_MODE, hasDemoSession } from './demo';

const container = document.getElementById('root')!;

if (DEMO_MODE && hasDemoSession()) {
  // Modo teste (Vercel): com sessão, carrega o app direto (ele mesmo monta em #root).
  void import('../main');
} else {
  const root = createRoot(container);
  // Servidor da Medscape: depois de entrar, recarregar a mesma URL faz o index.php servir o app —
  // preserva o link que a pessoa tentou abrir primeiro. Modo teste: troca a tela pelo app sem recarregar.
  const enter = DEMO_MODE
    ? () => {
        root.unmount();
        void import('../main');
      }
    : () => window.location.reload();

  root.render(
    <StrictMode>
      <CadastroPage onEnter={enter} />
    </StrictMode>,
  );
}
