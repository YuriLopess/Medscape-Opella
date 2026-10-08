import type { ProductPageData } from '../../lib/types';
import { img } from '../../lib/assets';

export function ProductHero({ hero }: { hero: ProductPageData['hero'] }) {
  return (
    <section className="p-hero" aria-labelledby="hero-title">
      <img className="p-hero__art" src={img(hero.art)} width={hero.width} height={hero.height} alt="" />
      <h1 className="p-hero__title" id="hero-title">
        <span className="visually-hidden">{hero.srPrefix}</span>
        {hero.title}
      </h1>
    </section>
  );
}
