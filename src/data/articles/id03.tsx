/* ID03 — O desafio silencioso da osteoporose (Os-Cal). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Ext, Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  title: 'O desafio silencioso da osteoporose: por que o cuidado de hoje define o amanhã?',
  heading: 'O desafio silencioso da osteoporose: por que o cuidado de hoje define o amanhã?',
  description:
    'Quando o primeiro sintoma é uma fratura, a prevenção não pode ser passiva: rastreamento, tratamento e o papel do cálcio e da vitamina D na osteoporose.',
  tags: ['Novo.', 'Artigo', 'Research', 'Não promocional'],
  lead: 'Quando o primeiro sintoma é uma fratura, a prevenção não pode ser passiva. A suplementação de cálcio/vitamina D pode prevenir e potencializar a resposta que compõe o tratamento para osteoporose. Prevenir hoje é evitar que a primeira fratura seja o primeiro diagnóstico.',
  hero: { src: 'artigos/id03/hero.webp', width: 505, height: 265, alt: 'Mulher madura de braços cruzados, sorrindo' },
  body: (
    <>
      <H2>Introdução</H2>
      <p>
        A osteoporose segue como uma condição de grande impacto clínico e econômico porque avança sem sinais nas fases
        iniciais. Atualmente, o número de fraturas relacionadas à osteoporose é projetado para aumentar de 1,9 milhão
        (2018) para 3,2 milhões até 2040, um aumento de 68%, com custos crescendo de US$ 57 bilhões para mais de US$ 95
        bilhões/ano só nos EUA.<sup>1</sup>
      </p>
      <p>
        Na prática, isso significa que o alerta muitas vezes vem tarde: a fratura <strong>por fragilidade</strong> aparece
        como primeiro evento clínico, quando custos biológicos e funcionais já estão instalados.<sup>2</sup>
      </p>
      <p>
        Fraturas vertebrais e de quadril se associam a queda importante da capacidade funcional, piora da qualidade de vida
        e aumento de mortalidade.<sup>2</sup> O impacto também recai no sistema de saúde, com hospitalizações prolongadas,
        reabilitação e maior necessidade de cuidados de longo prazo.<sup>3</sup>
      </p>
      <p>
        Quando o primeiro sintoma é uma fratura, a prevenção não pode ser passiva. O que muda o desfecho é a combinação de
        vigilância <strong>baseada em risco</strong>, rastreamento no momento certo e correção de fatores modificáveis
        antes que o dano apareça.<sup>4</sup>
      </p>

      <H2>Vigilância ativa: rastreamento, risco e o papel central da nutrição</H2>
      <p>
        A prevenção efetiva começa com o rastreamento estruturado. Diretrizes da USPSTF e da North American Menopause
        Society recomendam densitometria óssea para todas as mulheres a partir de 65 anos e para as de 50–69 anos cujo
        risco de fratura seja comparável ao de uma mulher de 65 anos.<sup>5,6</sup> Mulheres acima de 50 anos com fratura
        por baixo impacto também devem realizar a Absorciometria de Raio-X de Dupla Energia (DXA).<sup>6</sup>
      </p>
      <Figure
        center
        src="artigos/id03/quando-solicitar-dxa.webp"
        width={698}
        height={609}
        alt="Quando solicitar DXA? 1) Mulheres com 50 anos ou mais com fratura prévia: DXA obrigatória após fratura de baixo trauma, para confirmar o diagnóstico, determinar o grau de osteoporose, definir conduta e reduzir o risco de novas fraturas. 2) Mulheres de 50 a 69 anos (pós-menopausa): DXA indicada quando o risco é equivalente ao de uma mulher de 65 anos sem fatores adicionais; exemplos de fatores que elevam o risco: IMC baixo, tabagismo, fratura prévia, uso prolongado de corticosteroides e história familiar. 3) Mulheres com 65 anos ou mais: DXA obrigatória, independentemente de outros fatores de risco."
      >
        Fonte: Cosman F et al. Osteoporos Int 2014;25(10):2359–81.<sup>6</sup>
      </Figure>
      <p>
        O rastreamento fica mais preciso quando não se limita ao número da DMO. Mesmo com valores não tão baixos, algumas
        pacientes já apresentam <strong>fraturas vertebrais subclínicas</strong> (assintomáticas), que elevam de forma
        relevante o risco global. Nesses casos, a <strong>avaliação vertebral por imagem (VFA)</strong> entra como
        ferramenta para detectar a “fratura silenciosa”.<sup>6</sup> A VFA é indicada em mulheres:<sup>6</sup>
      </p>
      <Figure
        center
        src="artigos/id03/vfa-indicacoes.webp"
        width={606}
        height={618}
        alt="Mulheres com 70 anos ou mais e T-score menor ou igual a -1,0, ou de 65 a 69 anos e T-score menor ou igual a -1,5 (coluna, quadril total ou colo do fêmur). Sinais clínicos simples também orientam a investigação: perda de altura de 4 cm ou mais ao longo da vida, ou de 2 cm ou mais ao longo do seguimento."
      />

      <H2>Tratamento direcionado: consolidar proteção hoje para evitar fraturas amanhã</H2>
      <p>
        Uma vez estabelecido o diagnóstico, o tratamento deve ser estratégico. Os bisfosfonatos — como alendronato e ácido
        zoledrônico — permanecem terapias centrais, com eficácia demonstrada no aumento da DMO e na redução sustentada do
        risco de fraturas.<sup>7</sup>
      </p>
      <p>
        Em pacientes com osteoporose grave ou risco muito elevado, agentes anabólicos, como anticorpos anti-esclerostina,
        promovem aumentos rápidos de DMO e reduzem precocemente o risco de fraturas. Como seus efeitos são transitórios, o
        uso deve ser seguido por um agente anti-reabsortivo para consolidar os ganhos e assegurar benefício prolongado.
        <sup>8</sup>
      </p>
      <p>
        A suplementação adequada de cálcio e vitamina D potencializa a resposta e compõe a base do tratamento. A ingestão
        de cálcio deve, em geral, ser mantida em <strong>1.000–1.200 mg/dia</strong> (suplementando quando a dieta não
        atinge o mínimo), com cautela para evitar excesso (<strong>&lt;1.400 mg/dia</strong>, fracionado em{' '}
        <strong>500 mg</strong>). Para vitamina D, recomenda-se <strong>800–1.000 UI/dia</strong> de colecalciferol; em
        pacientes com <strong>25(OH)D &lt;20 ng/mL</strong>, podem ser necessárias doses maiores até estabilização{' '}
        <strong>&gt;30 ng/mL.</strong>
        <sup>9</sup>
      </p>
      <Figure
        center
        src="artigos/id03/calcio-vitamina-d-recomendacao.webp"
        width={607}
        height={592}
        alt="A suplementação adequada de cálcio e vitamina D potencializa a resposta e compõe a base do tratamento para osteoporose. Recomenda-se: cálcio, 1.000 a 1.200 mg/dia; vitamina D, 800 a 1.000 UI/dia."
      >
        Fonte: CONITEC. Protocolo Clínico e Diretrizes Terapêuticas da Osteoporose. Relatório de recomendações.<sup>9</sup>
      </Figure>

      <H2>Cálcio e vitamina D como alicerce do cuidado ao longo da vida</H2>
      <p>
        <strong>
          Como 99% do cálcio corporal está no esqueleto, déficits crônicos de cálcio e vitamina D tendem a se refletir
          diretamente na perda de massa óssea.
        </strong>
        <sup>10</sup> A vitamina D participa da regulação do metabolismo do cálcio e favorece a absorção intestinal,
        contribuindo para a mineralização óssea e o equilíbrio do sistema.<sup>11</sup>
      </p>
      <p>
        Níveis adequados de <strong>cálcio e vitamina D reduzem a perda óssea em mulheres na peri e pós-menopausa</strong>.
        Já foi demonstrado que a suplementação conjunta de cálcio e vitamina D pode ajudar a reduzir o risco de quedas,
        fraturas e suas consequentes morbidades em indivíduos com maior risco, assim contribuindo para uma melhor qualidade
        de vida.<sup>12</sup>
      </p>
      <p>
        Um trabalho de revisão que avaliou os benefícios da <strong>suplementação de cálcio</strong> constatou que oito dos
        nove ensaio clínicos randomizados encontraram um efeito positivo consistente no{' '}
        <strong>acúmulo de densidade mineral óssea</strong>, conforme medido por DXA, sendo que o benefício para o grupo
        suplementado em comparação com o grupo placebo chegou a 5,8% (Figura 2).<sup>13</sup> Um outro estudo duplo-cego
        randomizado feito com gêmeas univitelinas de 8 a 13 anos que receberam carbonato de cálcio 1200 mg/dia ou placebo
        por 24 meses. No final do estudo, o grupo do cálcio havia ganhado 3,7% mais conteúdo mineral ósseo do corpo total
        (ajustado para idade, altura e peso) do que o grupo controle (Figura 2).<sup>13</sup>
      </p>
      <Figure
        center
        src="artigos/id03/figura-2.webp"
        width={697}
        height={428}
        alt="Gráfico de barras — suplementação de cálcio: ganho adicional em desfechos por DXA/BMC, diferença no ganho (%) entre suplemento e placebo. Molgaard et al. 2004: 0,80%; Cameron et al. 2004: 3,69%; Dibba et al. 2000 (diáfise): 4,60%; Dibba et al. 2000 (distal): 5,50%; máximo reportado na revisão: 5,80%."
      >
        <b>Figura 2.</b> Ganho adicional (%) em desfechos de densitometria (DXA) e conteúdo mineral ósseo (BMC) com
        suplementação de cálcio vs placebo em ensaios clínicos selecionados. Adaptado de Weaver CM et al. Osteoporos Int
        2016;27(4):1281–386.<sup>13</sup>
      </Figure>
      <p>
        A associação de cálcio com a <strong>vitamina D</strong> também tem sido explorada, já que cerca de 82% dos
        brasileiros adultos apresentam deficiência ou insuficiência de vitamina D.<sup>14</sup> Para esses casos, já foi
        observados benefícios na suplementação com vitamina D3 (colecalciferol).<sup>15</sup> A literatura científica mostra
        que a suplementação conjunta desses nutrientes possui benefícios como a redução no risco de fraturas em comparação
        com a suplementação apenas com cálcio. Isso foi observado em uma meta-análise com mais de 20 mil participantes, que
        constatou que a suplementação de vitamina D isolada não foi associada a mudanças no risco de fraturas – no entanto,
        a suplementação diária combinada de vitamina D e cálcio foi associada à redução de 6% no risco de qualquer fratura,
        assim como à redução de 16% no risco de fratura do quadril.<sup>16</sup>
      </p>
      <Figure
        center
        src="artigos/id03/reducao-risco-fraturas.webp"
        width={612}
        height={564}
        alt="Redução de 6% no risco de qualquer fratura e de 16% no risco de fratura de quadril."
      />
      <p>
        Em um estudo com acompanhamento durante 18 anos de mais de 70 mil mulheres na pós-menopausa, observou-se que a
        ingestão de vitamina D estava associada a um risco reduzido de fraturas osteoporóticas de quadril.<sup>11</sup>{' '}
        Além disso, a <strong>suplementação de cálcio e vitamina D</strong> podem auxiliar na saúde óssea em mulheres na
        pós-menopausa, como demonstrado em uma meta-análise,<sup>11</sup> e também em outro estudo realizado pela Sociedade
        Americana de Menopausa, que mostraram redução na perda óssea e no risco de fraturas em mulheres na peri e
        pós-menopausa.<sup>11</sup>
      </p>

      <H2>
        Oscal<sup>®</sup>
      </H2>
      <p>
        Oscal<sup>®</sup> destaca-se como uma formulação prática e eficaz de carbonato de cálcio 1.250 mg (equivalente a 500
        mg de cálcio elementar), em conformidade com as recomendações do Ministério da Saúde.<sup>9,17</sup>
      </p>
      <p>
        A escolha de um suplemento de confiança como Oscal<sup>®</sup> potencializa os benefícios preventivos e da resposta
        que compõe a base do tratamento para osteoporose.<sup>9</sup>
      </p>
      <Figure
        center
        src="artigos/id03/oscal-ministerio-da-saude.webp"
        width={534}
        height={480}
        alt="Dois comprimidos por dia de Oscal atendem à recomendação do Ministério da Saúde. Ilustração de médico ao lado de radiografia do joelho e embalagens de Oscal."
      >
        Oscal<sup>®</sup> apoia a base nutricional do cuidado ósseo, cálcio + vitamina D, para que a prevenção da
        osteoporose comece hoje, antes da primeira fratura.<sup>9,17</sup>
      </Figure>

      <References
        rule={false}
        wideMarker
        items={[
          <>
            Lewiecki EM, Ortendahl JD, Vanderpuye-Orgle J, et al.
            <br />
            Healthcare Policy Changes in Osteoporosis Can Improve Outcomes and Reduce Costs in the United States. JBMR Plus
            2019;3(9):e10192.
          </>,
          <>
            LeBoff MS, Greenspan SL, Insogna KL, et al.
            <br />
            The clinician’s guide to prevention and treatment of osteoporosis. Osteoporos Int 2022;33(10):2049–102.
          </>,
          'Tu KN, Lie JD, Wan CKV, et al. Osteoporosis: A Review of Treatment Options. P T 2018;43(2):92–104.',
          <>
            Mathur B, Sakthivel M, Annamalai S, Muthu S, Sameer M. Delay in
            <br />
            Time to Diagnosis of Idiopathic Transient Osteoporosis of the Hip with Radiographs: Diagnostic Insights from a
            Series of 10 Cases. J Orthop Case Rep 2024;14(2):93–8.
          </>,
          <>
            US Preventive Services Task Force, Nicholson WK, Silverstein M, et
            <br />
            al. Screening for Osteoporosis to Prevent Fractures: US Preventive Services Task Force Recommendation
            Statement. JAMA 2025;333(6):498–508.
          </>,
          <>
            Cosman F, de Beur SJ, LeBoff MS, et
            <br />
            al. Clinician’s Guide to Prevention and Treatment of Osteoporosis. Osteoporos Int 2014;25(10):2359–81.
          </>,
          <>
            Gehrke B, Alves Coelho MC, Brasil d’Alva C, Madeira M. Long-
            <br />
            term consequences of osteoporosis therapy with bisphosphonates. Arch Endocrinol Metab 2023;68:e220334.
          </>,
          <>
            Su P, Li M, Xiao J, Bai L. Effectiveness of anabolic and anti-
            <br />
            resorptive agents for preventing postmenopausal osteoporosis fractures: a systematic review and network
            meta-analysis. J Orthop Surg Res 2025;20(1):645.
          </>,
          <>
            CONITEC. Protocolo Clínico e Diretrizes Terapêuticas da Osteoporose. Relatório de recomendações. Acesso em 03
            de dezembro de 2025. Disponível em:{' '}
            <Ext href="https://www.gov.br/conitec/pt-br/midias/consultas/relatorios/2022/20220919_pcdt_osteoporose.pdf">
              https://www.gov.br/conitec/pt-br/midias/consultas/relatorios/2022/20220919_pcdt_osteoporose.pdf
            </Ext>
          </>,
          'Beto JA. The Role of Calcium in Human Aging. Clin Nutr Res 2015;4(1):1.',
          <>
            Mei Z, Hu H, Zou Y, Li D. The role of vitamin D in menopausal women’s health. Front Physiol [Internet] 2023
            [cited 2023 Nov 24];14. Available from:{' '}
            <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10291614/">
              https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10291614/
            </Ext>
          </>,
          <>
            Wimalawansa SJ, Razzaque MS, Al-Daghri NM. Calcium and vitamin D in human health: Hype or real?
            <br />J Steroid Biochem Mol Biol 2018;180:4–14.
          </>,
          <>
            Weaver CM, Gordon CM, Janz KF, et al.
            <br />
            The National Osteoporosis Foundation’s position statement on peak bone mass development and lifestyle factors:
            a systematic review and implementation recommendations. Osteoporos Int 2016;27(4):1281–386.
          </>,
          <>
            Pereira-Santos M, dos Santos JYG, Carvalho GQ, dos Santos DB, Oliveira
            <br />
            AM. Epidemiology of vitamin D insufficiency and deficiency in a population in a sunny country: Geospatial
            meta-analysis in Brazil. Crit Rev Food Sci Nutr [Internet] 2019 [cited 2023 Dec 4];Available from:{' '}
            <Ext href="https://www.tandfonline.com/doi/abs/10.1080/10408398.2018.1437711">
              https://www.tandfonline.com/doi/abs/10.1080/10408398.2018.1437711
            </Ext>
          </>,
          'Maeda SS, Borba VZC, Camargo MBR, et al. Recomendações da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) para o diagnóstico e tratamento da hipovitaminose D. Arq Bras Endocrinol Metabol 2014;58(5):411–33.',
          <>
            Yao P, Bennett D, Mafham M, et al. Vitamin D and Calcium for the Prevention of Fracture:
            <br />A Systematic Review and Meta-analysis. JAMA Netw Open 2019;2(12):e1917789.
          </>,
          <>
            Folheto Oscal<sup>®</sup>
          </>,
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2600009-v2.0-01/26',
  pageCode: 'MAT-BR-2404503',
};

export default article;
