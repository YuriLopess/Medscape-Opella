import { legalNotice } from '../../data/home';
import { Icon } from '../ui/Icon';

/** "Dizeres legais" em acordeão (aberto por padrão). */
export function LegalNotice() {
  return (
    <section className="legal" aria-label="Dizeres legais">
      <div className="container">
        <details className="legal__box" open>
          <summary className="legal__summary">
            <h2 className="legal__title">Dizeres legais</h2>
            <Icon name="chevron-up" />
          </summary>
          <div className="legal__body">
            {legalNotice.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
