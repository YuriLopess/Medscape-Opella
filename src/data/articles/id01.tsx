/* ID01 — Questionário de consumo de cálcio (Os-Cal). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Cta, DataTable, Ext, H2, H3, IconRow, Panel, References } from '../../components/article/parts';

const article: ArticleContent = {
  title: 'Questionário de consumo de cálcio',
  heading: 'Questionário de consumo de cálcio',
  description:
    'Recomendações de consumo diário de cálcio, sua importância em cada etapa da vida e a ferramenta para calcular a ingestão diária aproximada.',
  tags: ['Artigo'],
  lead: 'Atualize-se em relação às recomendações de consumo diário de cálcio e a sua importância para a saúde em cada etapa da vida. Acesse também a ferramenta para calcular a ingestão diária aproximada de cálcio de seus pacientes!',
  hero: { src: 'artigos/id01/hero.webp', width: 505, height: 284, alt: 'Mulher sorrindo segurando um comprimido e uma garrafa de leite' },
  body: (
    <>
      <p>
        O cálcio é um componente extremamente importante do corpo humano, em especial para a saúde óssea, uma vez que 99%
        do cálcio presente no corpo forma o esqueleto. Além disso, o cálcio plasmático desempenha um papel vital na
        manutenção de processos fisiológicos, como regulação da secreção hormonal, transmissão de impulsos nervosos e
        atividades vasculares. Assim, é fundamental consumir quantidades adequadas de cálcio para manter os níveis
        plasmáticos e de <span className="art-u">massa óssea adequados</span>.<sup>1</sup>
      </p>
      <p>
        A melhor maneira de obter uma ingestão adequada de <span className="art-u">cálcio</span> é aderir a uma dieta saudável, sendo
        importantes fontes de cálcio:<sup>2</sup>
      </p>

      <IconRow
        items={[
          { icon: 'artigos/id01/icone-laticinios.webp', label: 'Lacticínios' },
          { icon: 'artigos/id01/icone-peixes.webp', label: 'Peixes' },
          { icon: 'artigos/id01/icone-leguminosas.webp', label: 'Leguminosas' },
          { icon: 'artigos/id01/icone-nozes.webp', label: 'Nozes e sementes' },
        ]}
      />

      <p>
        O Institute of Medicine (IOM) traz as seguintes recomendações de consumo diário de cálcio de acordo com a faixa
        etária e sexo:<sup>3</sup>
      </p>

      <DataTable
        caption="Ingestão diária recomendada de cálcio elementar por faixa etária"
        head={[<>Faixa etária<br />(gênero)</>, <>IDR de cálcio<br />elementar (mg / dia)</>]}
        rows={[
          ['1 a 3 anos (M+F)', '700'],
          ['4 a 8 anos (M+F)', '1.000'],
          ['9 a 18 anos (M+F)', '1.300'],
          ['19 a 50 anos (M+F)', '1.000'],
          ['51 a 70 anos (M)', '1.000'],
          ['> 70 anos (M)', '1.200'],
          ['> 51 anos (F)', '1.200'],
        ]}
      />
      <p className="art-note">
        IDR: ingestão diária recomendada.
        <br />
        Adaptado de Ross AC. J Clin Endocrinol Metab. 2011;96(1):53-8.3
      </p>

      <p>
        Contudo, uma análise do IBGE sobre o consumo alimentar pessoal no Brasil mostrou que{' '}
        <strong>
          mais de 90% da população acima de 10 anos não consome as quantidades diárias recomendadas de cálcio.
        </strong>
        <sup>4</sup>
      </p>

      <Panel>
        <H2>Importância da ingestão de cálcio em cada fase da vida</H2>
        <H3 icon="artigos/id01/icone-criancas.webp">Crianças e adolescentes</H3>
        <p>
          Para crianças e adolescentes, as recomendações de consumo diário tem como objetivo garantir o adequado acúmulo
          ósseo e o balanço positivo de cálcio. A ingestão diária recomendada aumenta conforme a idade e atingem seus
          maiores níveis durante a faixa dos 9-18 anos de modo a cobrir o crescimento associado à puberdade.<sup>5</sup>
        </p>
        <H3 icon="artigos/id01/icone-adulto.webp">Idade adulta</H3>
        <p>
          Para a faixa etária entre os 19 e 50 anos, as recomendações de cálcio buscam promover a manutenção óssea e o
          equilíbrio de cálcio.<sup>5</sup>
          <br />O processo natural de perda óssea começa a se manifestar nos últimos estágios da idade adulta. No momento
          em que homens e mulheres atingem 70 anos ou mais de idade, ambos experimentam perda óssea. Portanto, o objetivo
          das recomendações de ingestão de cálcio no final da idade adulta é diminuir o grau de perda óssea.<sup>5</sup>
        </p>
        <H3 icon="artigos/id01/icone-menopausa.webp">Menopausa</H3>
        <p>
          Nas mulheres, o processo de perda óssea começa mais cedo do que para os homens devido à menopausa, que
          geralmente ocorre entre os 50 a 55 anos de idade. Portanto, recomenda-se para mulheres a partir dos 51 anos uma
          maior ingestão diária de cálcio do que aquela sugerida para homens na mesma faixa etária.<sup>5</sup>
        </p>
      </Panel>

      <H2>Calculadora de cálcio</H2>
      <p>
        Para calcular a ingestão diária aproximada de cálcio, confira abaixo a ferramenta desenvolvida pela International
        Osteoporosis Foundation (IOF), já em português. Para utilizar é simples, basta preencher o sexo e idade e, então, o
        consumo aproximado dos alimentos listados durante a semana!<sup>6</sup>
      </p>
      <Cta
        href="https://www.osteoporosis.foundation/educational-hub/topic/calcium-calculator"
        icon="artigos/id01/icone-calculadora.webp"
        title={<>Calculadora do consumo de cálcio</>}
      >
        disponibilizada gratuitamente, em português, pela internacional Osteoporosis Foundation
        <br />
        CLIQUE AQUI
      </Cta>

      <H2>Calculadora de cálcio</H2>
      <p>
        Em situações em que há ingestão dietética insuficiente ou as fontes de cálcio são mal toleradas, a suplementação
        de cálcio pode ser útil.<sup>2</sup>
        <br />
        Confira no nosso artigo “Perguntas e respostas: Hipovitaminose D” o que as principais diretrizes brasileiras
        preconizam sobre a dosagem de vitamina D, como tratar a hipovitaminose D e quais os benefícios da suplementação
        conjunta de cálcio e vitamina D.
      </p>
      <p className="art-sub">Tratamento Sanofi</p>

      <div className="art-product">
        <div>
          <h4>
            Os-cal<sup>®</sup> 500 + D
          </h4>
          <p>
            Carbonato de cálcio
            <br />
            Colecalciferol (Vitamina D3)
          </p>
          <p>O Cálcio auxilia na formação e manutenção dos ossos. Oscal é um um suplemento alimentar à base de carbonato cálcio.</p>
        </div>
      </div>

      <References
        items={[
          '1. Li K, Wang X-F, Li D-Y, et al. The good, the bad, and the ugly of calcium supplementation: a review of calcium intake on human health. Clin Interv Aging 2018;13:2443–52.',
          'Muñoz-Garach A, García-Fontana B, Muñoz-Torres M. Nutrients and Dietary Patterns Related to Osteoporosis. Nutrients 2020;12(7).',
          'Ross AC, Manson JE, Abrams SA, et al. The 2011 report on dietary reference intakes for calcium and vitamin D from the Institute of Medicine: what clinicians need to know. J Clin Endocrinol Metab 2011;96(1):53–8.',
          <>
            Instituto Brasileiro de Geografia e Estatística (IBGE). Pesquisa de orçamentos familiares 2017-2018: análise do
            consumo alimentar pessoal no Brasil. IBGE, 2020. Disponível em:{' '}
            <Ext href="https://biblioteca.ibge.gov.br/visualizacao/livros/liv101742.pdf">
              https://biblioteca.ibge.gov.br/visualizacao/livros/liv101742.pdf
            </Ext>
          </>,
          'Catharine Ross A, Taylor CL, Yaktine AL, Del Valle HB. Dietary Reference Intakes for Adequacy: Calcium and Vitamin D. National Academies Press (US); 2011.',
          <>
            CALCIUM - Calcium Calculator. International Osteoporosis Foundation. Acesso em 15/05/2023. Disponível em:{' '}
            <Ext href="https://www.osteoporosis.foundation/educational-hub/topic/calcium-calculator">
              https://www.osteoporosis.foundation/educational-hub/topic/calcium-calculator
            </Ext>
          </>,
          'Bula de OS-CAL® 500.',
          'Bula de OS-CAL® D 400.',
          'Folheto de Mobility OS-CAL® D 1000.',
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2303002',
  pageCode: 'MAT-BR-2404503',
};

export default article;
