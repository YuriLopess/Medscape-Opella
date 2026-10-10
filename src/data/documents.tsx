/**
 * Páginas de documento científico. A rota é `${brand.path}/${slug}`.
 */
import type { DocumentPageData } from '../lib/types';
import { DocLink } from '../components/ui/DocLink';

/** Corpo provisório do próprio layout, usado enquanto o texto do documento não chega. */
function PlaceholderContent() {
  const p =
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum';
  const short =
    'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.';
  return (
    <>
      <p>{p}</p>
      <h2>{short}</h2>
      <p>{p}</p>
      <p className="doc-callout">{short}</p>
      <h2>Principais eventos adversos descritos</h2>
      <ul>
        <li>{short}</li>
        <li>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</li>
      </ul>
      <p>{short}</p>
    </>
  );
}

export const documents: DocumentPageData[] = [
  // ---------- Allegra · ID14 ----------
  {
    brand: 'allegra',
    slug: 'anti-histaminicos-em-doencas-alergicas',
    title: 'Anti-histamínicos em doenças alérgicas: eventos adversos',
    heading: (
      <>
        Anti-histamínicos em doenças alérgicas:
        <br />
        eventos adversos
      </>
    ),
    description:
      'Documento científico da Sociedade Brasileira de Pediatria sobre anti-histamínicos de primeira e segunda gerações: classificação, segurança e principais eventos adversos.',
    banner: 'allegra/banner-documento.webp',
    image: {
      src: 'conteudos/anti-histaminicos-eventos-adversos.webp',
      width: 961,
      height: 641,
      alt: 'Mulher espirrando em um lenço de papel',
    },
    source: (
      <>
        Sociedade Brasileira de Pediatria
        <br />
        Departamento Científico de Alergia
        <br />
        Nº 205, 13 de Maio de 2025
      </>
    ),
    content: (
      <>
        <p>
          Há dezenas de formulações de anti-histamínicos (AH) anti-H1 disponíveis no mundo para o tratamento da rinite
          alérgica (RA) e urticária crônica (UC), incluindo formulações sistêmicas e tópicas. Os AH anti-H1 são
          classificados em duas gerações: primeira geração (sedativos ou clássicos) e segunda geração (não sedativos ou
          mais recentes).
        </p>
        <p>
          A maioria dos anti-H1 de primeira geração foi introduzida antes mesmo da existência de agências regulatórias e
          de estudos de farmacologia clínica serem exigidos. As avaliações farmacocinética e farmacodinâmica em indivíduos
          saudáveis e para maioria dos grupos vulneráveis, como crianças, não estão disponíveis, bem como estudos de
          interações medicamentosas.
        </p>

        <h2>
          Anti-histamínicos de primeira e segunda gerações:
          <br />
          classificação e segurança
        </h2>
        <p>
          Por muitos anos os AH foram descritos como antagonistas ou bloqueadores dos receptores H1, no entanto este
          conceito não reflete sua verdadeira ação molecular e o mecanismo atualmente reconhecido é o de que são agonistas
          inversos que estabilizam e mantêm o equilíbrio do estado inativo do receptor H1.
        </p>

        <p className="doc-callout">
          Os AH anti-H1 são classificados em duas gerações: primeira geração (sedativos ou clássicos) e segunda geração
          (não sedativos ou mais recentes).
        </p>

        <h2>Principais eventos adversos descritos</h2>
        <ul>
          <li>Ação antimuscarínica: midríase, olho seco, boca seca, constipação e retenção urinária.</li>
          <li>Ação antisserotoninérgica: aumento do apetite e ganho de peso.</li>
          <li>Ação anti-alfa-adrenérgica: tontura e hipotensão ortostática.</li>
          <li>
            Efeitos no sistema nervoso central: redução do alerta, cognição, aprendizado, memória, sedação, fadiga e
            sonolência.
          </li>
        </ul>
        <p>
          Em doses baixas ou dose padrão, AH anti-H1 de primeira geração atravessam a barreira hemato-encefálica e ocupam
          mais de 70% dos receptores H1 do sistema nervoso central.
        </p>
      </>
    ),
    aside: ['sedacao-nao-e-sono', 'allegra-d-descongestionante', 'muito-alem-da-sonolencia'],
    asideAreas: [
      { brand: 'enterogermina', image: 'areas/card-enterogermina.webp', height: 105, showCta: true },
      { brand: 'oscal', image: 'areas/card-oscal.webp', height: 104, showCta: true },
      { brand: 'novalgina', image: 'areas/card-novalgina.webp', height: 104, showCta: true },
    ],
  },

  // ---------- Enterogermina · ID15 ----------
  {
    brand: 'enterogermina',
    slug: 'uso-de-probioticos-em-criancas',
    title: 'Uso de probióticos em crianças com infecções comuns da infância e na prevenção de alergias',
    heading: (
      <>
        Uso de probióticos em crianças com infecções comuns
        <br />
        da infância e na prevenção de alergias
      </>
    ),
    description:
      'Documento científico da Sociedade Brasileira de Pediatria sobre o uso de probióticos em crianças com infecções comuns da infância e na prevenção de alergias.',
    banner: 'enterogermina/banner-documento.webp',
    image: {
      src: 'conteudos/probioticos-criancas.webp',
      width: 961,
      height: 641,
      alt: 'Ilustração do sistema digestivo destacado em verde sobre o abdômen',
    },
    // TODO: vincular ao arquivo ID15 — Doc Científico SBP Uso probióticos em crianças com infecções comuns
    source: (
      <DocLink doc="ID15">Uso de probióticos em crianças com infecções comuns da infância e na prevenção de alergias</DocLink>
    ),
    content: <PlaceholderContent />,
    aside: ['viroses-gastrointestinais', 'bacillus-clausii-diaa', 'virus-respiratorios-criancas'],
    asideAreas: [
      { brand: 'allegra', image: 'areas/card-allegra-logo.webp', height: 104 },
      { brand: 'oscal', image: 'areas/card-oscal-logo.webp', height: 104 },
      { brand: 'novalgina', image: 'areas/card-novalgina-logo.webp', height: 104 },
    ],
  },

  // ---------- Os-Cal ----------
  {
    brand: 'oscal',
    slug: 'saude-ossea-feminina',
    title: 'Saúde óssea feminina: o papel da suplementação de cálcio na prática clínica',
    heading: (
      <>
        Saúde óssea feminina: o papel da suplementação de
        <br />
        cálcio na prática clínica
      </>
    ),
    description:
      'Recomendações e evidências sobre a suplementação de cálcio ao longo da vida da mulher, incluindo seu papel na saúde óssea.',
    image: {
      src: 'conteudos/saude-ossea-feminina.webp',
      width: 961,
      height: 641,
      alt: 'Três gerações de mulheres sorrindo, lado a lado',
    },
    // a fonte leva ao artigo ID02 (Menopausa e saúde óssea)
    source: <DocLink doc="ID02">Saúde óssea feminina: o papel da suplementação de cálcio na prática clínica</DocLink>,
    content: <PlaceholderContent />,
    aside: ['saude-ossea-da-mulher', 'desafio-osteoporose'],
    asideAreas: [
      { brand: 'allegra', image: 'areas/card-allegra-logo.webp', height: 104 },
      { brand: 'enterogermina', image: 'areas/card-enterogermina-logo.webp', height: 104 },
      { brand: 'novalgina', image: 'areas/card-novalgina-logo.webp', height: 104 },
    ],
  },

  // ---------- Novalgina · ID13 ----------
  {
    brand: 'novalgina',
    slug: 'abordagem-da-febre-aguda',
    title: 'Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses',
    heading: (
      <>
        Abordagem da Febre Aguda em Pediatria e Reflexões
        <br />
        sobre a febre nas arboviroses
      </>
    ),
    description:
      'Documento científico da Sociedade Brasileira de Pediatria sobre a abordagem da febre aguda em pediatria e a febre nas arboviroses.',
    banner: 'novalgina/banner-documento.webp',
    image: {
      src: 'conteudos/febre-aguda-arboviroses.webp',
      width: 961,
      height: 641,
      alt: 'Ilustração de um cérebro com áreas destacadas em vermelho e descargas elétricas',
    },
    // TODO: vincular ao arquivo ID13 — Doc Científico SBP Abordagem Febre Aguda em Pediatria e Reflexões
    source: (
      <DocLink doc="ID13">Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses</DocLink>
    ),
    content: <PlaceholderContent />,
    aside: ['escolite-volta-as-aulas', 'febre-na-pediatria', 'primeiras-24h-apos-vacina'],
    asideAreas: [
      { brand: 'allegra', image: 'areas/card-allegra-logo.webp', height: 104 },
      { brand: 'enterogermina', image: 'areas/card-enterogermina-logo.webp', height: 104 },
      { brand: 'oscal', image: 'areas/card-oscal-logo.webp', height: 104 },
    ],
  },
];
