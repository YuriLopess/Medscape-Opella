/* ID10 — Viroses gastrointestinais (Enterogermina). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Ext, Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  bodyClass: 'art-justify art-dense',
  title: 'Viroses gastrointestinais: do diagnóstico à restauração da microbiota intestinal com Bacillus clausii de Enterogermina®',
  heading: (
    <>
      Viroses gastrointestinais: do diagnóstico a restauração da microbiota intestinal com Bacillus clausii de
      Enterogermina<sup>®</sup>
    </>
  ),
  description:
    'Cenário clínico, evidências e suporte ao raciocínio diagnóstico na gastroenterite viral aguda, e as evidências de Bacillus clausii na microbiota e na imunidade de mucosa.',
  tags: ['Artigo', 'Research'],
  lead: 'Cenário clínico, evidências e suporte ao raciocínio diagnóstico em casos de gastroenterite viral aguda. O artigo aborda causas, mecanismos imunológicos e as evidências de Bacillus clausii (O/C, SIN, N/R e T) na restauração da microbiota intestinal e da imunidade de mucosa.',
  hero: {
    src: 'artigos/id10/hero.webp',
    width: 505,
    height: 284,
    alt: 'Mãos segurando um modelo anatômico do intestino com uma lupa — Viroses gastrointestinais: do diagnóstico à restauração da microbiota intestinal com Bacillus clausii de Enterogermina',
  },
  body: (
    <>
      <H2>Introdução</H2>
      <p>
        Imagine o seguinte cenário: um paciente chega ao pronto atendimento com{' '}
        <strong>diarreia aquosa, vômitos e dor abdominal leve,</strong> após ter passado o fim de semana em uma praia
        lotada, consumindo <strong>alimentos preparados em quiosques locais</strong>. Ele relata que familiares e amigos
        apresentam sintomas semelhantes. Diante desse quadro, o que o profissional de saúde deve considerar primeiro?
      </p>
      <p>
        Situações como essa não são incomuns em períodos de alta temporada. <strong>Durante o início de 2025</strong>, o
        litoral paulista, especialmente a Baixada Santista, registrou um aumento expressivo de{' '}
        <strong>casos de gastroenterite aguda</strong>, confirmado pela detecção de <strong>norovírus</strong> em amostras
        analisadas pelo Instituto Adolfo Lutz e pela Secretaria de Estado da Saúde de São Paulo.<sup>1</sup> Essa
        ocorrência reforça a relevância epidemiológica das <strong>viroses gastrointestinais</strong>, que figuram entre as
        principais causas de morbidade em todas as faixas etárias — responsáveis por{' '}
        <strong>1 a 3 episódios anuais por pessoa</strong> em países desenvolvidos e até{' '}
        <strong>18 episódios por ano em crianças</strong> que vivem em regiões tropicais com condições sanitárias
        precárias. <sup>2</sup>
      </p>
      <Figure
        center
        src="artigos/id10/criancas-ate-5-anos.webp"
        width={756}
        height={547}
        alt="Entre crianças com até 5 anos de idade: a diarreia foi a quarta causa de morte em 2015, sendo o rotavírus responsável por 29,3% dos casos. Nas hospitalizações por gastroenterite aguda, o rotavírus correspondia a 47% dos casos, o norovírus a 29%, o adenovírus a 14% e outros agentes a 10%."
      >
        Fontes: GBD 2016 Diarrhoeal Disease Collaborators. Lancet Infect Dis 2018;18(11):1211–28;3 Posovszky C et al.
        Dtsch Arztebl Int 2020;117(37):615–24.<sup>4</sup>
      </Figure>
      <p>
        Em períodos de <strong>maior aglomeração</strong>, como a alta temporada em áreas litorâneas, os casos de
        gastroenterite viral tendem a se concentrar em <strong>agrupamentos familiares e comunitários</strong>,
        caracterizando surtos de curta duração e ampla disseminação. A sazonalidade associada a{' '}
        <strong>fatores ambientais e comportamentais</strong>, favorece a circulação de vírus entéricos como{' '}
        <strong>norovírus, rotavírus e adenovírus.</strong>
        <sup>2</sup>
      </p>
      <div>
        <p>
          Diante de paciente com:<sup>2</sup>
        </p>
        <ul className="art-list art-list--hang">
          <li>diarreia aquosa,</li>
          <li>vômitos,</li>
          <li>náuseas e</li>
          <li>
            dor abdominal após contato com praias cheias, ingestão de alimentos preparados em quiosques e/ou uso
            compartilhado de banheiros, a hipótese diagnóstica prioritária é gastroenterite viral não inflamatória.
            <sup>2</sup>
          </li>
        </ul>
      </div>

      <H2>
        A hipótese viral
        <br />
        <small className="art-h2__sub">Causas e mecanismo de ação</small>
      </H2>
      <p>
        As <strong>viroses gastrointestinais</strong> são predominantemente causadas por <strong>norovírus</strong>,{' '}
        <strong>rotavírus e adenovírus entéricos</strong>, responsáveis por cerca de 70–80% dos surtos não bacterianos em
        ambientes comunitários.<sup>2</sup> O <strong>norovírus</strong> apresenta elevada infectividade, sendo capaz de
        causar doença com doses inferiores a 100 partículas virais, e dissemina-se rapidamente por via{' '}
        <strong>fecal-oral</strong>, através de alimentos, água, superfícies contaminadas ou contato interpessoal.
        <sup>5</sup>
      </p>
      <p>
        O <strong>rotavírus</strong>, principal agente de diarreia aguda em lactentes e crianças pequenas, possui tropismo
        pelo epitélio intestinal e leva à destruição das vilosidades do duodeno e jejuno. Essa lesão desencadeia{' '}
        <strong>mecanismos secretórios e má absorção de nutrientes</strong>, resultando em diarreia aquosa.{' '}
        <strong>A resposta imune protetora</strong> envolve tanto componentes humorais quanto celulares, com destaque para
        a produção de <strong>imunoglobulina A (IgA) e imunoglobulina secretora A (sIgA)</strong>, que constituem a
        principal defesa da mucosa intestinal contra o vírus.<sup>6</sup>
      </p>
      <Figure
        center
        mt={46}
        src="artigos/id10/marcadores-imunologicos-normais.webp"
        width={759}
        height={598}
        alt="Níveis normais de marcadores imunológicos: os marcadores imunológicos protegem contra a infecção por rotavírus e o desenvolvimento de manifestações clínicas — IgA (defesa de 1ª linha), sIgA (defesa da mucosa intestinal), IgM (resposta imune aguda) e IgG (proteção contra infecção viral)."
      >
        Fonte: Smiyan OI et al. Wiadomosci lekarskie (Warsaw, Poland : 1960), 2019; 72(7).<sup>6</sup>
      </Figure>
      <p>
        Em estudos comparativos, o rotavírus esteve presente em até 50% das amostras de fezes de crianças com diarreia
        aguda em países tropicais, reforçando sua relevância epidemiológica.<sup>7</sup> Durante o período de infecção
        aguda, há uma resposta imune de mucosa atenuada, caracterizada por níveis reduzidos de IgA e sIgA e aumento
        compensatório de IgM, refletindo um “início imunológico lento” na fase inicial da doença.
      </p>
      <Figure
        center
        mt={46}
        src="artigos/id10/marcadores-imunologicos-infeccao.webp"
        width={763}
        height={594}
        alt="Na infecção por rotavírus, resposta imune silenciada: redução dos níveis de IgA associada ao retardo na ativação da resposta imune e à adesão ineficiente do rotavírus às células da mucosa intestinal; aumento dos níveis de IgM devido à ativação da resposta imune aguda."
      >
        Fonte: Smiyan OI et al. Wiadomosci lekarskie (Warsaw, Poland : 1960), 2019; 72(7).<sup>6</sup>
      </Figure>
      <p>
        A recomposição desses marcadores durante a recuperação está associada à melhora clínica e ao reequilíbrio da
        microbiota intestinal.<sup>6</sup>
      </p>

      <H2>Manejo e reequilíbrio da microbiota intestinal</H2>
      <p>
        O manejo das viroses gastrointestinais baseia-se em medidas de suporte, com ênfase na terapia de reidratação oral e
        manutenção da alimentação habitual. Entre as abordagens adjuvantes, o <strong>zinco</strong> pode ser indicado em
        alguns casos para reduzir a duração e a gravidade da diarreia, especialmente quando associada ao uso de
        antibióticos; entretanto, há evidências de que sua eficácia <strong>varia conforme o agente etiológico</strong>,
        podendo inclusive <strong>prolongar o quadro em infecções por rotavírus</strong>.<sup>8</sup>
      </p>
      <p>
        Além disso,{' '}
        <strong>os probióticos vêm sendo amplamente estudados como coadjuvantes no tratamento das diarreias agudas</strong>,
        com benefícios que também dependem da <strong>espécie e da cepa utilizada</strong>. Ensaios clínicos e metanálises
        demonstram que <i>Bacillus clausii (O/C, SIN, N/R e T)</i>, quando associado à terapia de reidratação,{' '}
        <strong>reduz a duração da diarreia e o tempo de hospitalização</strong> em crianças, tanto em casos de etiologia
        viral quanto na diarreia associada a antibióticos.<sup>9,8</sup>
      </p>
      <div>
        <p>
          Esses achados reforçam que a escolha do adjuvante deve considerar o{' '}
          <strong>mecanismo de ação e a etiologia provável da infecção</strong>, otimizando a resposta terapêutica e
          prevenindo desfechos adversos.<sup>9,8</sup> Neste sentido, como aliado do equilíbrio da microbiota, destaca-se{' '}
          <strong>
            <i>Bacillus clausii</i>
          </strong>{' '}
          <i>(O/C, SIN, N/R e T)</i>. Mecanisticamente, <i>B. clausii</i> tem atributos compatíveis com a restauração da
          eubiose e ajuda na recuperação de enteroviroses:<sup>9</sup>
        </p>
        <ul className="art-list art-list--hang art-list--left">
          <li>Sobrevive ao ácido gástrico e germina no lúmen intestinal,</li>
          <li>Libera substâncias antimicrobianas (atividade contra S. aureus, E. faecium e C. difficile),</li>
          <li>Pode neutralizar toxinas através da ação de proteases alcalinas.</li>
        </ul>
      </div>
      <p>
        Uma meta-análise de seis ECRs (n=1298 crianças) demonstrou{' '}
        <strong>redução da duração da diarreia em -9,12 horas</strong> e{' '}
        <strong>redução do tempo de internação em -0,85 dia</strong> vs. controle, com bom perfil de segurança; os
        estudos usaram combinações de quatro cepas (O/C, SIN, N/R, T).<sup>9</sup>
      </p>
      <Figure
        center
        mt={8}
        src="artigos/id10/reducao-diarreia-internacao.webp"
        width={651}
        height={498}
        alt="-9,12 h de diarreia (p = 0,015): menor tempo com quadro de diarreia. -0,85 dia (p = 0,017): menor duração da hospitalização, em comparação com o grupo que usou apenas solução de reidratação oral."
      >
        Fonte: Ianiro G et al. Nutrients. 2018;10(8).<sup>9</sup>
      </Figure>
      <p style={{ marginTop: 74 }}>
        A meta-análise de 11 ensaios clínicos randomizados com <i>Bacillus clausii</i> em crianças com gastroenterite
        aguda demonstrou <strong>redução significativa na duração da diarreia</strong> em comparação ao controle (
        <i>tamanho do efeito</i> –0,60; IC95%: –1,05 a 0,00; p = 0,026) (Figura 1), bem como{' '}
        <strong>menor número de evacuações ao quarto dia de tratamento</strong> (tamanho do efeito –0,34; IC95%: –0,75 a
        –0,07; p = 0,033) e <strong>redução no tempo de internação hospitalar</strong> (<i>tamanho do efeito</i> –0,27;
        IC95%: –0,50 a –0,04; p = 0,003).<sup>10</sup>
      </p>
      <Figure
        center
        mt={18}
        src="artigos/id10/figura-1-forest-plot.webp"
        width={777}
        height={445}
        alt="Forest plot do tamanho do efeito de Enterogermina sobre a duração da diarreia em 11 estudos (Canini 2007, Lahiri 2008, Utula 2008, Lahiri 2015a, Lahiri 2015b, Bhat 2018, Vidjeadevan 2018, Hamid 2019a, Hamid 2019b, Maugo 2021, Lahiri 2022), com a estimativa combinada a favor de Enterogermina."
      >
        Figura 1. Forest plot mostrando o efeito de Enterogermina<sup>®</sup> (
        <i>Bacillus clausii O/C, SIN, N/R e T)</i> na duração da diarreia em crianças com gastroenterite aguda. Os círculos
        representam os estudos individuais e o ponto verde a estimativa combinada da meta-análise, indicando resultado
        favorável a Enterogermina<sup>®</sup>. Adaptado de Michel MC, Pellegrino P. Adv Ther 2025;42(7):3076–88.
        <sup>10</sup>
      </Figure>
      <p>
        Em coortes pediátricas de mundo real, envolvendo{' '}
        <strong>3.178 crianças com diarreia aguda de provável origem infecciosa</strong>, o uso de <i>Bacillus clausii</i>{' '}
        como adjuvante à terapia de reidratação oral reduziu a frequência de evacuações de{' '}
        <strong>5,2 para cerca de 1,3 episódios por dia</strong> ao longo de sete dias (Figura 2). Essa melhora foi
        acompanhada pela redução de sintomas como <strong>náuseas, dor abdominal e distensão</strong>, com mais de{' '}
        <strong>50% dos pacientes assintomáticos até o terceiro dia de acompanhamento.</strong>
        <sup>8</sup>
      </p>
      <Figure
        center
        src="artigos/id10/figura-2-evacuacoes-sintomas.webp"
        width={600}
        height={613}
        alt="Quantificação da diarreia viral: número médio de evacuações caiu de 5,2 no dia 1 para 4,1; 3; 2,2; 1,7; 1,5 e 1,3 no dia 7 de tratamento com B. clausii (p < 0,001). Outros sintomas antes e depois: vômito 44% → 5%; dor abdominal 25% → 3%; náusea 16% → 3%; distensão abdominal 12% → 2% (p < 0,001)."
      >
        Figura 2. Gráfico com número médio de evacuações por dia de tratamento (esq.) e incidências de outros sintomas em
        pacientes com diarreia viral. Adaptado de de Castro J-AA et al. Trop Dis Travel Med Vaccines 2019;5:14.
        <sup>8</sup>
      </Figure>
      <p>
        Outros trabalhos relatam que a suplementação com <i>Bacillus clausii</i> (O/C, SIN, N/R, T) associada ao manejo
        padrão como <strong>hidratação oral ou intravenosa, dieta leve conforme tolerância e controle sintomático</strong>
        , resultou em <strong>melhor recuperação dos marcadores imunológicos séricos</strong>, com aumento dos níveis de{' '}
        <strong>IgA, sIgA, IgM e IgG</strong>, indicando restauração da resposta imune de mucosa e sistêmica (Figura 3).
        <sup>6</sup>
      </p>
      <Figure
        center
        mt={66}
        src="artigos/id10/figura-3-marcadores-sericos.webp"
        width={772}
        height={324}
        alt="Normalização dos marcadores imunológicos séricos. Bacillus clausii (impacto significativamente melhor): IgA 0,86 g/l, sIgA 30,32 g/l, IgM 0,79 g/l, IgG 9,11 g/l. Tratamento padrão: 0,71; 27,10; 1,03; 9,32 g/l (p < 0,001). Grupo controle: 0,82; 31,18; 0,73; 7,96 g/l (p > 0,05)."
      >
        <span className="art-fig__lg">
          Figura 3. Efeito de Bacillus clausii sobre a normalização dos marcadores imunológicos séricos em crianças com
          gastroenterite viral aguda. Adaptado de Smiyan OI et al. Wiadomosci lekarskie (Warsaw, Poland : 1960), 2019;
          72(7).<sup>6</sup>
        </span>
      </Figure>
      <p>
        Essa modulação imune foi acompanhada por uma{' '}
        <strong>redução significativa na duração dos sintomas clínicos</strong>, com diminuição média de{' '}
        <strong>
          1,13 dia nos episódios de diarreia, 1,17 dia na fraqueza geral, 0,6 dia nos episódios de vômito
        </strong>{' '}
        e <strong>0,52 dia na febre</strong> (Figura 4).<sup>6</sup>
      </p>
      <Figure
        center
        mt={60}
        src="artigos/id10/figura-4-sintomas-clinicos.webp"
        width={776}
        height={546}
        alt="Gráfico de barras da redução média na duração dos sintomas clínicos: diarreia -1,13 dia (p < 0,001), fraqueza generalizada -1,17 dia (p < 0,001), febre -0,52 dia (p < 0,05) e vômito -0,6 dia (p < 0,001)."
      >
        Figura 4. Redução média na duração dos sintomas clínicos em crianças com gastroenterite viral aguda tratadas com
        manejo padrão associado a Bacillus clausii, em comparação ao manejo isolado. Adaptado de Smiyan OI et al.
        Wiadomosci lekarskie (Warsaw, Poland : 1960), 2019; 72(7).<sup>6</sup>
      </Figure>
      <p>
        Por fim, estudos tem demonstrado que o <i>B. clausii</i> atua{' '}
        <strong>reforçando a integridade da barreira intestinal</strong> por meio do aumento da expressão de proteínas das
        junções de oclusão (<i>tight junctions</i>) e da mucina 5AC, fundamental para a proteção da mucosa. Além disso,
        promove a <strong>proliferação de enterócitos</strong> e reduz a apoptose celular, o que favorece a regeneração
        epitelial. Do ponto de vista imunológico, estimula a <strong>síntese dos peptídeos antimicrobianos</strong> HBD-2
        e LL-37 de forma dose-dependente, essenciais na defesa contra patógenos intestinais, e{' '}
        <strong>modula a resposta inflamatória</strong>, diminuindo a produção de espécies reativas de oxigênio e a
        liberação de citocinas pró-inflamatórias (IL-8 e IFN-β).<sup>11</sup>
      </p>
      <p>
        Esses efeitos combinados resultam em{' '}
        <strong>melhor preservação da mucosa intestinal e maior resistência à infecção viral</strong>, sustentando o papel
        de B. clausii como adjuvante no manejo de gastroenterites agudas.
      </p>

      <H2>
        Enterogermina<sup>®</sup> (<i>Bacillus clausii O/C, SIN, N/R, T</i>) mantém a integridade e auxilia a ação
        defensiva da barreira intestinal
      </H2>
      <p>
        Os mecanismos de Enterogermina<sup>®</sup> para essa atuação são:<sup>11</sup>
      </p>
      <Figure
        center
        mt={48}
        src="artigos/id10/mecanismos-enterogermina.webp"
        width={777}
        height={604}
        alt="Mecanismos de Enterogermina: produção de proteínas de junção de oclusão, com melhora da permeabilidade da camada de enterócitos; melhora da imunidade inata, com síntese de peptídeos antimicrobianos e redução de citocinas pró-inflamatórias; indução da proliferação de enterócitos; produção de muco protetor."
      />
      <div>
        <p>
          Além disso, Enterogermina<sup>®</sup> tem os 3 ATRIBUTOS-CHAVE necessários a um probiótico<sup>12</sup>{' '}
          definidos pela <strong>Organização Mundial da Saúde (OMS)</strong> para um probiótico de qualidade, os 3
          atributos-chave são:<sup>13</sup>
        </p>
        <ul className="art-list art-list--hang">
          <li>
            <strong>Quantificação precisa dos esporos, compatível com o declarado em rótulo;</strong>
          </li>
          <li>
            <strong>Ausência de contaminantes microbiológicos;</strong>
          </li>
          <li>
            <strong>Capacidade comprovada de sobrevivência ao ambiente ácido do trato gastrointestinal.</strong>
          </li>
        </ul>
      </div>
      <div>
        <H2>Conheça a família Enterogermina</H2>
        <Figure
          center
          mt={4}
          src="artigos/id10/familia-enterogermina.webp"
          width={773}
          height={416}
          alt="Enterogermina em flaconete ou sachê, sem glúten, sem lactose, sem corante, sem açúcar e sem sabor/cheiro. Embalagens: Enterogermina Criança e Adulto Plus, Enterogermina Criança e Adulto e Enterogermina Adulto Max (+19 anos, 1x ao dia, sabor laranja)."
        />
      </div>
      <p className="art-center art-note-lg">
        Enterogermina<sup>®</sup> NÃO CONTÉM GLÚTEN. Bacillus clausii O/C, SIN, N/R, T podem contribuir com a saúde do
        trato gastrointestinal. Este produto não deve ser consumido por gestantes, lactantes, pessoas imunocomprometidas
        ou pessoas acometidas de condição de saúde debilitante grave.<sup>14</sup>
      </p>

      <References
        rule={false}
        wideMarker
        title="Referências:"
        className="art-refs--justify"
        items={[
          <>
            Agência Brasil. Norovírus provoca surto de virose no litoral sul paulista. Rádio Agência Nacional. Acesso em 17
            de outubro de 2025. Disponível em:{' '}
            <Ext href="https://agenciabrasil.ebc.com.br/radioagencia-nacional/saude/audio/2025-01/norovirus-provoca-surto-de-virose-no-litoral-sul-paulista">
              https://agenciabrasil.ebc.com.br/radioagencia-nacional/saude/audio/2025-01/norovirus-provoca-surto-de-virose-no-litoral-sul-paulista
            </Ext>
          </>,
          'Guerrant RL, Hughes JM, Lima NL, Crane J. Diarrhea in developed and developing countries: magnitude, special settings, and etiologies. Rev Infect Dis 1990;12 Suppl 1(Suppl 1):S41–50.',
          'GBD 2016 Diarrhoeal Disease Collaborators. Estimates of the global, regional, and national morbidity, mortality, and aetiologies of diarrhoea in 195 countries: a systematic analysis for the Global Burden of Disease Study 2016. Lancet Infect Dis 2018;18(11):1211–28.',
          'Posovszky C, Buderus S, Classen M, Lawrenz B, Keller K-M, Koletzko S. Acute Infectious Gastroenteritis in Infancy and Childhood. Dtsch Arztebl Int 2020;117(37):615–24.',
          'Melese M, Mekuria M, Mulatu Z, Dawit Z, Alemu A. Norovirus: Epidemiology, clinical impact, transmission, and strategies for prevention and control. SciDev 2025;6(3):68–75.',
          'Smiyan OI, Smiian-Horbunova KO, Bynda TP, et al. Optimization of the treatment of rotavirus infection in children by using bacillus clausii. Wiadomosci lekarskie (Warsaw, Poland : 1960). 2019; 72(7).',
          'N J, Sudha M R. Bacillus clausii - the probiotic of choice in the treatment of diarrhoea. J Yoga Phys Ther, 2015; 05(04).',
          'de Castro J-AA, Guno MJV-R, Perez MO. Bacillus clausii as adjunctive treatment for acute community-acquired diarrhea among Filipino children: a large-scale, multicenter, open-label study (CODDLE). Trop Dis Travel Med Vaccines 2019;5:14.',
          'Ianiro G, Rizzatti G, Plomer M, et al. Bacillus clausii for the Treatment of Acute Diarrhea in Children: A Systematic Review and Meta-Analysis of Randomized Controlled Trials. Nutrients, 2018;10(8).',
          'Michel MC, Pellegrino P. A Comprehensive Review and Meta-analysis on the Treatment of Acute Gastroenteritis in Children with a Bacillus clausii Preparation (Enterogermina). Adv Ther 2025;42(7):3076–88.',
          'Paparo L, Tripodi L, Bruno C, et al. Protective action of Bacillus clausii probiotic strains in an in vitro model of Rotavirus infection. Sci Rep 2020;10(1):12636.',
          'Kolaček S, Hojsak I, Berni Canani R, et al. Commercial Probiotic Products: A Call for Improved Quality Control. A Position Paper by the ESPGHAN Working Group for Probiotics and Prebiotics. J Pediatr Gastroenterol Nutr 2017;65(1):117–24.',
          'Morelli L, Pellegrino P. A critical evaluation of the factors affecting the survival and persistence of beneficial bacteria in healthy adults. Beneficial microbes, 2021; 12(4).',
          <>
            Enterogermina<sup>®</sup>. Informações de rotulagem.
          </>,
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2505572- Dezembro,2025',
  pageCode: 'MAT-BR-2404503',
};

export default article;
