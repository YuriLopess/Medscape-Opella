import { PageShell } from '../components/layout/PageShell';
import privacyHtml from '../data/legal/privacidade.html?raw';
import termsHtml from '../data/legal/termos.html?raw';

/**
 * Textos legais da Medscape Network. São longos e em inglês, convertidos do .ai
 * para HTML semântico (data/legal/*.html) e inseridos como estão: o conteúdo é
 * estático e versionado no projeto, não vem de usuários.
 */
const pages = {
  privacy: {
    title: 'Política de Privacidade | Opella',
    description: 'Política de privacidade da Medscape Network aplicável a este hub científico.',
    html: privacyHtml,
  },
  terms: {
    title: 'Termos de Uso | Opella',
    description: 'Termos de uso da Medscape Network aplicáveis a este hub científico.',
    html: termsHtml,
  },
};

export function LegalPage({ page }: { page: keyof typeof pages }) {
  const p = pages[page];
  return (
    <PageShell title={p.title} description={p.description}>
      <div className="container">
        <article className="legal-doc" lang="en" dangerouslySetInnerHTML={{ __html: p.html }} />
      </div>
    </PageShell>
  );
}
