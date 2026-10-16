/* ID08 — Muito além de uma sonolência passageira (Allegra). Artigo em vídeo; texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Ext, Video } from '../../components/article/parts';
import { img } from '../../lib/assets';

const article: ArticleContent = {
  layout: '2026',
  bodyClass: 'art-justify',
  title: 'Muito além de uma sonolência passageira: antialérgicos de 1ª geração em crianças',
  heading: 'Muito além de uma sonolência passageira: Entenda os impactos e os efeitos da administração de antialérgicos de 1ª geração em crianças.',
  description:
    'A Dra. Tati Mota explica em vídeo os impactos dos antialérgicos de primeira geração no sono, na memória e no desempenho escolar das crianças.',
  tags: ['Artigo', 'Alergia'],
  lead: (
    <>
      A Doutora Tati Mota revela os impactos dos antialérgicos de primeira geração em crianças e explica como esses
      medicamentos podem afetar o sono, a memória e o desempenho escolar. Tati também apresenta Allegra<sup>®</sup>{' '}
      (Fexofenadina) como uma alternativa segura e eficaz, que não compromete o desenvolvimento cognitivo dos pequenos.
    </>
  ),
  hero: { src: 'artigos/id08/hero.webp', width: 505, height: 284, alt: 'Dra. Tati Mota segurando uma embalagem de Allegra Pediátrico, em quadro do vídeo' },
  body: (
    <>
      <div className="art-author art-author--inline">
        <p>
          <strong>Tati Mota</strong>
          <br />
          Farmacêutica, Doutora em Farmacologia, Mentora e Criadora de Conteúdo
        </p>
        <img src={img('artigos/id08/autor-tati-mota.webp')} alt="Dra. Tati Mota" width={221} height={220} loading="lazy" />
      </div>
      <p>
        Nesse vídeo, a{' '}
        <strong>Dra. Tati Mota, Farmacêutica, Doutora em Farmacologia, Mentora e Criadora de Conteúdo</strong>, apresenta{' '}
        <strong>
          Allegra<sup>®</sup>
        </strong>
        , um <strong>anti-histamínico de segunda geração</strong> cujo princípio ativo é a <strong>Fexofenadina</strong>.
        Ela explora como esse medicamento se destaca no <strong>tratamento de condições alérgicas*</strong>, como{' '}
        <strong>rinite alérgica</strong> e <strong>urticária</strong>, oferecendo{' '}
        <strong>
          alívio eficaz dos sintomas sem causar sedação**<sup>1</sup>
        </strong>
        : um diferencial importante em relação a muitos outros antialérgicos de primeira geração.
      </p>
      <p>
        A Dra. Tati explica que a Fexofenadina <strong>atua de forma periférica e seletiva</strong>, pois{' '}
        <strong>
          não atravessa a barreira hematoencefálica<sup>2-3</sup>
        </strong>{' '}
        – uma barreira natural de proteção do nosso cérebro - graças à sua afinidade com a glicoproteína P. Isso impede que
        o medicamento não interfira no sistema nervoso central,{' '}
        <strong>
          evitando efeitos colaterais como sonolência, lentidão cognitiva ou prejuízo no desempenho psicomotor
          <sup>2,4,5</sup>
        </strong>
        . Além disso, sua <strong>ação rápida</strong> (início em cerca de 1 hora) e <strong>efeito prolongado</strong>{' '}
        por até 12 horas, permitem o uso duas vezes ao dia, com <strong>baixo risco de interações medicamentosas</strong>
        ***<sup>1</sup>.
      </p>
      <p>
        Durante a infância, o sono REM tem papel fundamental no desenvolvimento cognitivo e na consolidação das memórias.
        Anti-histamínicos sedativos podem alterar esse ciclo, comprometendo a qualidade do sono e, consequentemente, o
        processo de aprendizagem<sup>2,4,5</sup>. Portanto, esse <strong>perfil farmacológico</strong> de{' '}
        <strong>
          Allegra<sup>®</sup>
        </strong>{' '}
        o torna especialmente{' '}
        <strong>
          seguro para crianças em idade escolar<sup>4</sup>
        </strong>
        . Com isso, a criança pode ser{' '}
        <strong>tratada de forma eficaz contra os sintomas da alergia*</strong>, preservando a sua{' '}
        <strong>atenção</strong>, o <strong>aprendizado</strong> e o <strong>desempenho escolar</strong>.
      </p>
      <Video
        framed
        youtubeId="WpR1pIfwB6s"
        poster="artigos/id08/video-capa.webp"
        title="Muito além da sonolência: veja os efeitos dos antialérgicos de 1ª geração em crianças"
      />

      <div className="art-refs art-refs--id08">
        <p className="art-refs__title">Referências:</p>
        <p>
          &nbsp;*Rinite alérgica e urticária.
          <br />
          **Estudos não demonstraram associação do uso do produto com alteração no padrão do sono.
          <br />
          ***Para as apresentações de Suspensão Oral e Comprimidos de 60mg.
        </p>
        <ol>
          <li>
            Bula do Produto Allegra<sup>®</sup>.
          </li>
          <li>
            Ansotegui IJ, Bousquet J, Canonica GW, Demoly P, Gómez RM, Meltzer EO, Murrieta-Aguttes M, Naclerio RM, Rosario
            Filho N, Scadding GK. Why fexofenadine is considered as a truly non-sedating antihistamine with no brain
            penetration: a systematic review. Curr Med Res Opin. 2024 Aug;40(8):1297-1309. doi:
            10.1080/03007995.2024.2378172. Epub 2024 Jul 19. PMID: 39028636.
          </li>
          <li>Gómez RM, Moreno P, Compalati E, Canonica GW, Ansotegui Zubeldia IJ. Update meta-analysis.</li>
          <li>
            Sociedade Brasileira de Pediatria. Anti-histamínicos em doenças alérgicas: eventos adversos [Internet]. Rio de
            Janeiro: Sociedade Brasileira de Pediatria; 2025 May 13 [cited 2025 Jun 4]. Available from:{' '}
            <Ext href="https://www.sbp.com.br/imprensa/detalhe/news/anti-histaminicos-em-doencas-alergicas-eventos-adversos/">
              https://www.sbp.com.br/imprensa/detalhe/news/anti-histaminicos-em-doencas-alergicas-eventos-adversos/
            </Ext>
          </li>
          <li>
            Motola D, Donati M, Biagi C, et al. Safety profile of H1-antihistamines in pediatrics: an analysis based on data
            from VigiBase. Pharmacoepidemiol Drug Saf. 2017;26(10):1164-1171
          </li>
        </ol>
      </div>
    </>
  ),
  mat: 'MAT-BR-2503664 - Agosto, 2025',
  pageCode: 'MAT-BR-2404503',
};

export default article;
