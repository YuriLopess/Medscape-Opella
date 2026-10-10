/* ID09 — Mais que um descongestionante (Allegra D). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';

const article: ArticleContent = {
  title: 'Mais que um descongestionante: Eficácia Comprovada, Segurança Garantida',
  heading: 'Mais que um descongestionante: Eficácia Comprovada, Segurança Garantida',
  description:
    'Allegra D combina fexofenadina (60 mg) e pseudoefedrina (120 mg) para alívio da congestão nasal, com início de ação em 30 minutos e segurança cardiovascular.',
  tags: ['Artigo', 'Alergia'],
  lead: 'O Allegra D combina fexofenadina (60 mg) e pseudoefedrina (120 mg) para alívio da congestão nasal, com início de ação em 30 minutos. Diferente da fenilefrina oral, que apresenta eficácia comparável ao placebo, esta associação de liberação prolongada demonstra superioridade clínica e segurança cardiovascular.',
  hero: { src: 'artigos/id09/hero.webp', width: 505, height: 266, alt: 'Menina sorrindo em um jardim florido' },
  body: (
    <>
      <p>
        Diferente da fenilefrina oral, que possui eficácia comparável ao placebo, esta associação demonstra superioridade
        clínica e segurança cardiovascular, sendo bem tolerada por pacientes com hipertensão controlada. Para acessar os
        dados clínicos e farmacológicos completos, realize o download do documento abaixo.
      </p>
      <p className="art-mat art-mat--lg">MAT-BR-2500304.5.0.05/2025</p>
      <section className="art-docs" aria-labelledby="art-docs-title">
        <h2 id="art-docs-title">Documentos Relacionados.</h2>
        <ul>
          <li>
            {/* o PDF "Allegra D Mais que um descongestionante" não veio com os arquivos: entra como link quando for enviado */}
            <span className="art-docs__pending" title="Documento em breve">
              Allegra D Mais que um descongestionante
            </span>
          </li>
        </ul>
      </section>
    </>
  ),
  pageCode: 'MAT-BR-2404503',
};

export default article;
