import type { ProductPageData } from '../../lib/types';
import { img } from '../../lib/assets';
import { DocLink } from '../ui/DocLink';

/** "Vídeo em destaque": título com filetes + card com especialista e imagem. */
export function FeaturedVideo({ video }: { video: ProductPageData['video'] }) {
  const { expert, image } = video;
  return (
    <>
      <h2 className="ruled-title" id="video-title">
        Vídeo em destaque
      </h2>
      <article className="p-video" aria-labelledby="video-title">
        <div className="p-video__body">
          <p className="eyebrow">Artigo</p>
          <h3 className="p-video__title">{video.title}</h3>
          <div className="p-video__expert">
            <img className="p-video__avatar" src={img(expert.avatar)} width={45} height={45} alt="" />
            <div>
              <p className="p-video__name">{expert.name}</p>
              <p className="p-video__meta">{expert.meta}</p>
            </div>
          </div>
          <p className="p-video__text">{video.text}</p>
          {/* TODO: vídeo ainda não entregue */}
          <DocLink className="btn-brand btn-brand--lg">Ver vídeo →</DocLink>
        </div>
        <figure className="p-video__media">
          <img src={img(image.src)} width={image.width} height={image.height} alt={image.alt} loading="lazy" />
        </figure>
      </article>
    </>
  );
}
