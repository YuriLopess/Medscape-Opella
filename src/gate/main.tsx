import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CadastroPage from './CadastroPage';

// Sem sessão, index.php só entrega esta tela. Depois de entrar, recarregar a mesma URL faz
// o front controller servir o app — preserva o link que a pessoa tentou abrir primeiro.
const enter = () => window.location.reload();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CadastroPage onEnter={enter} />
  </StrictMode>,
);
