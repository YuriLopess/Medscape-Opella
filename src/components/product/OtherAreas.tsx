import { Link } from 'react-router';
import { brands } from '../../data/brands';
import type { AreaTile } from '../../lib/types';
import { img } from '../../lib/assets';

/** "Explore outras áreas terapêuticas" com os tiles das outras marcas. */
export function OtherAreas({ areas }: { areas: AreaTile[] }) {
  return (
    <nav className="p-areas" aria-labelledby="areas-title">
      <h2 className="p-areas__title" id="areas-title">
        Explore outras áreas terapêuticas
      </h2>
      {areas.map((a) => {
        const brand = brands[a.brand];
        return (
          <div key={a.brand} className="p-areas__item">
            <Link className={`area-tile${a.brand === 'enterogermina' ? ' area-tile--enterogermina' : ''}`} to={brand.path}>
              <img src={img(a.image)} width={a.width} height={a.height} alt={brand.name} loading="lazy" />
              <span>{brand.area}</span>
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
