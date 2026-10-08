import { stats } from '../../data/home';
import { Icon } from '../ui/Icon';

export function Stats() {
  return (
    <section className="stats" aria-label="O hub em números">
      <div className="container">
        <ul className="stats__box">
          {stats.map((s) => (
            <li key={s.label} className="stat">
              <Icon name={s.icon} className="stat__icon" />
              <div className="stat__body">
                <p className={`stat__value${s.textValue ? ' stat__value--text' : ''}`}>{s.value}</p>
                <p className="stat__label">{s.label}</p>
                <p className="stat__desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
