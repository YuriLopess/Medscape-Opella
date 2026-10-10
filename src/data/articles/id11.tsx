/* ID11 — Vírus respiratórios em crianças (Enterogermina). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Ext, Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  title: 'Vírus Respiratórios em Crianças: Por que os Antibióticos Nem Sempre São a Resposta',
  heading: 'Vírus Respiratórios em Crianças: Por que os Antibióticos Nem Sempre São a Resposta',
  description:
    'As infecções respiratórias agudas aumentam no inverno, assim como a prescrição de antibióticos e os riscos para a microbiota. O papel do Bacillus clausii na proteção gastrointestinal.',
  tags: ['Artigo', 'Research', 'Não promocional'],
  lead: 'As infecções respiratórias agudas (IRAS) aumentam no inverno, assim como a prescrição de antibióticos. Com o aumento do uso de antibióticos nesta época do ano, também há maiores riscos para a microbiota. Entenda o papel do Bacillus clausii na proteção gastrointestinal.',
  hero: {
    src: 'artigos/id11/hero.webp',
    width: 505,
    height: 284,
    alt: 'Criança assoando o nariz no colo da mãe — Vírus respiratórios em crianças: por que os antibióticos nem sempre são a resposta',
  },
  body: (
    <>
      <H2>Introdução</H2>
      <p>
        As infecções respiratórias agudas (IRAS) são a principal causa de consultas pediátricas em todo o mundo, e sua
        incidência aumenta de forma expressiva no outono e inverno. Dados de hospitalização nos EUA (2000-2002) demonstram
        que as infecções do trato respiratório inferior (LRTI) chegaram a representar quase 14% de todas as internações
        pediátricas no inverno (em janeiro), em comparação com aproximadamente 6% nos meses de verão, evidenciando mais que
        o dobro de hospitalizações durante os períodos de maior circulação viral.<sup>1</sup>
      </p>
      <Figure
        center
        mt={48}
        src="artigos/id11/etiologia-viral.webp"
        width={411}
        height={611}
        alt="80–90% das infecções respiratórias agudas em crianças têm etiologia viral — não bacteriana. VSR (vírus sincicial respiratório): lactentes, bronquiolite. Rinovírus: principal vírus em escolares, faringo-amigdalite aguda. Influenza A/B: epidemias sazonais de inverno, todas as faixas etárias. Metapneumovírus humano: menores de 5 anos, LRTI."
      >
        Fonte: PERCH Study Group, 2019.<sup>1</sup>
      </Figure>
      <p>
        Essa sazonalidade tem impacto direto sobre as prescrições: durante a temporada de influenza, crianças de 6 a 12
        meses podem apresentar taxas superiores a 1.200 visitas ambulatoriais e aproximadamente 460 cursos de antibióticos
        por 100 crianças-ano. Além disso, estima-se que a influenza seja responsável por 3 a 9 cursos adicionais de
        antibióticos por 100 crianças ao ano, refletindo a morbidade viral sazonal sobre o uso de antimicrobianos.
        <sup>2</sup>
      </p>
      <p>
        No Brasil, dados do sistema de vigilância sentinela do Ministério da Saúde confirmam o mesmo padrão: vírus sincicial
        respiratório e rinovírus lideram as detecções nos quadros infecciosos em crianças durante o outono-inverno, seja em
        lactentes com bronquiolite, seja em escolares com faringo amigdalite.<sup>3,4</sup> O quadro clínico das viroses,
        rinorreia, tosse, febre e congestão nasal, mimetiza apresentações bacterianas, dificultando o diagnóstico clínico
        sem exames complementares. Esse cenário, somado à sobrecarga dos serviços e à pressão familiar por tratamento ativo,
        cria o ambiente propício para a prescrição inadequada de antibióticos que caracteriza os meses frios em todo o
        mundo.<sup>2,5</sup>
      </p>
      <p>
        Neste artigo, discutiremos o aumento das prescrições pediátricas de antibióticos no inverno, suas consequências para
        a microbiota intestinal e resistência bacteriana, além do papel do Bacillus clausii como estratégia adjuvante na
        proteção gastrointestinal durante a antibioticoterapia.
      </p>

      <H2>A dimensão do problema do uso inapropriado de antibióticos em pediatria e diretrizes da SBP</H2>
      <p>
        A Sociedade Brasileira de Pediatria (SBP) reforça que a prescrição de antibióticos em infecções respiratórias deve se
        basear em critérios clínicos e diagnósticos objetivos. Na faringoamigdalite aguda, a confirmação de infecção por
        Streptococcus pyogenes por meio de teste rápido ou cultura é recomendada antes da antibioticoterapia.<sup>6</sup> Na
        otite média aguda, recomenda-se considerar bacteriana somente quando há abaulamento; o antibiótico não é obrigatório
        na maioria dos casos unilaterais sem otorreia; e cerca de 80% dos pacientes em placebo melhoram clinicamente.
        <sup>7</sup>
      </p>
      <p>
        Apesar dessas diretrizes, a prescrição de antibióticos para infecções respiratórias apresenta marcada sazonalidade,
        com aumento nos meses de inverno, período de maior circulação de vírus respiratórios, independentemente de
        confirmação bacteriana.<sup>5</sup> Nos Estados Unidos, uma análise de prescrições ambulatoriais entre 2015 e 2020
        confirma o mesmo padrão: amoxicilina-clavulanato, amoxicilina e azitromicina apresentam picos consistentes nos meses
        de inverno, independentemente de variações na incidência bacteriana confirmada (Figura 1).<sup>8</sup>
      </p>
      <Figure
        center
        mt={44}
        src="artigos/id11/figura-1-prescricoes-eua.webp"
        width={681}
        height={338}
        alt="Gráfico de linhas das prescrições por 1.000 indivíduos nos EUA, de janeiro de 2015 a janeiro de 2021: amoxicilina-clavulanato, amoxicilina e azitromicina com picos a cada inverno e queda em 2020."
      >
        Figura 1. Prescrições ambulatoriais de amoxicilina-clavulanato, amoxicilina e azitromicina nos Estados Unidos,
        janeiro de 2015 a janeiro de 2021. Adaptado de Buehrle DJ et al. JAMA Netw Open 2021;4(9):e2126114.<sup>8</sup>
      </Figure>

      <H2>Consequências do uso inapropriado de antibióticos: resistência bacteriana e disbiose intestinal</H2>
      <p>O uso inadequado de antibióticos gera dois impactos negativos interligados.</p>
      <p>
        <strong>O primeiro é a resistência bacteriana:</strong> a OMS classifica a resistência bacteriana como uma das dez
        maiores ameaças globais à saúde pública, e dados do ECDC apontam pelo menos 33.000 mortes anuais na Europa
        atribuídas diretamente a bactérias resistentes.<sup>9,10</sup>
      </p>
      <p>
        <strong>O segundo impacto é a disbiose intestinal</strong>. Antibióticos de amplo espectro como penicilinas com
        inibidores de beta-lactamase, cefalosporinas e macrolídeos, eliminam não apenas os patógenos-alvo, mas componentes
        essenciais da flora comensal. Um único curso de amoxicilina-clavulanato pode reduzir a diversidade da microbiota em
        crianças em mais de 30%, com recuperação incompleta por semanas a meses.<sup>11</sup> A disbiose resultante aumenta
        a incidência dos casos de diarreia associada ao antibiótico (DAA), que é o efeito adverso mais frequente dos
        antimicrobianos em crianças, com incidência geral de 11% na população pediátrica ambulatorial.<sup>12</sup>
      </p>
      <p>
        Em revisão de 42 ensaios clínicos com 7.729 crianças, a incidência de DAA foi de aproximadamente 20% com
        amoxicilina-clavulanato, 8% com amoxicilina e apenas 1% com penicilina V (Figura 2), sendo a DAA a principal causa
        de abandono do tratamento em 10,9% dos pacientes com amoxicilina-clavulanato.<sup>13</sup>
      </p>
      <Figure
        center
        mt={42}
        src="artigos/id11/figura-2-incidencia-daa.webp"
        width={681}
        height={586}
        alt="Gráfico de barras da incidência de diarreia associada a antibióticos: amoxicilina/clavulanato 20%, amoxicilina 8% e penicilina V 1%. 20% dos pacientes em tratamento com amoxicilina/clavulanato desenvolvem DAA."
      >
        Figura 2. Estudo de revisão incluindo 7729 crianças tratadas com penicilinas orais. Adaptado de Kuehn J et al. J
        Pediatr Pharmacol Ther. 2015; 20(2):90-104.<sup>13</sup>
      </Figure>

      <H2>Bacillus clausii e a proteção da microbiota durante a antibioticoterapia</H2>
      <p>
        Diante do impacto da antibioticoterapia sobre a microbiota intestinal, o uso de probióticos como estratégia
        adjuvante para prevenir e tratar a diarreia associada a antibióticos passou a receber atenção crescente da
        comunidade científica. Entre os probióticos estudados, o Bacillus clausii (O/C, SIN, N/R, T), comercializada no
        Brasil sob o nome Enterogermina<sup>®</sup>, ocupa posição de destaque pela sua singularidade farmacológica:
        trata-se de um esporo bacteriano capaz de sobreviver ao ambiente ácido do estômago, chegar viável ao intestino e ser
        resistente à maioria dos antibióticos de uso clínico, o que lhe confere eficácia quando administrado
        concomitantemente ao tratamento antimicrobiano.<sup>14-15</sup>
      </p>
      <Figure
        center
        mt={46}
        src="artigos/id11/mecanismos-sobrevivencia.webp"
        width={681}
        height={611}
        alt="Mecanismos de sobrevivência dos probióticos no trato gastrointestinal e características da Enterogermina: adaptação ao estresse hiperosmótico, pH ácido e sais biliares — 95% de sobrevivência em ácido gástrico, capaz de se multiplicar em ambientes de alta osmolaridade; resistência ao calor — esporos resistentes a 95 °C; resistência intrínseca a múltiplos antibióticos — pode ser administrado junto com o antibiótico sem prejuízo à eficácia probiótica; adesão e colonização intestinal — esporos recuperados nas fezes por até 12 dias após uma única administração. Essas propriedades garantem aos B. clausii da Enterogermina uma taxa de sobrevivência acima de 90% no trato gastrointestinal."
      >
        Fontes: Vecchione A et al. Front Med 2018;5:335726,14 Bevilacqua A et al. Foods, 2020;9(12),16 Acosta-Rodríguez-Bueno
        CP et al. Adv Ther 2022;39(11):4854–74,17 Ghelardi E et al. Journal of applied microbiology, 2015;119(2).
        <sup>15</sup>
      </Figure>
      <p>
        A eficácia clínica do Bacillus clausii na prevenção da DAA em crianças foi avaliada em um ensaio clínico
        randomizado, duplo-cego e controlado por placebo. O estudo CODDLE envolveu 3.178 crianças com mediana de idade de 2
        anos com diarreia aguda de origem viral ou associada a antibióticos e demonstrou que o grupo suplementado com B.
        clausii apresentou resolução da diarreia em mais da metade dos pacientes nos primeiros 3 dias de tratamento (52,6%),
        com redução significativa no número médio de evacuações diárias, de 5,2 para 1,2 por dia ao final do tratamento (p
        &lt; 0,001), e queda na proporção de fezes amolecidas de 81,6% para 9,2%. Essa melhora foi acompanhada pela redução
        de sintomas como{' '}
        <strong>
          náuseas, dor abdominal e distensão, com mais de 50% dos pacientes assintomáticos até o terceiro dia de
          acompanhamento.
        </strong>
        <sup>18</sup>
      </p>
      <Figure
        center
        mt={2}
        src="artigos/id11/figura-3-evacuacoes-sintomas.webp"
        width={680}
        height={612}
        alt="Quantificação da diarreia: queda de 50% no número médio de evacuações, de 4,9 no dia 1 para 3,8; 2,7; 1,8; 1,4; 1,3 e 1,1 no dia 7 de tratamento com B. clausii (p < 0,001). Outros sintomas em pacientes com DAA, antes e depois: vômito 36,9% → 6,9% (p < 0,001); dor abdominal 20,0% → 2,3% (p < 0,001); náusea 11,5% → 6,2% (p = 0,083); distensão abdominal 17,7% → 2,3% (p < 0,001)."
      >
        <span className="art-fig__lg">
          Figura 3. Redução da frequência de evacuações e melhora de sintomas gastrointestinais com B. clausii. Adaptado de
          de Castro JA et al. Trop Dis Travel Med Vaccines. 2019;5:14.<sup>18</sup>
        </span>
      </Figure>
      <p>
        Evidências mais recentes reforçam esses achados. Uma análise agrupada de três estudos clínicos controlados,
        incluindo 435 crianças, mostrou que B. clausii, associado à antibioticoterapia, reduziu significativamente a
        incidência de diarreia associada a antibióticos em comparação ao uso isolado de antibióticos (1,8% vs. 6,5%;
        p=0,017), representando redução relativa de 72,6% na incidência do evento.<sup>19</sup>
      </p>
      <Figure
        center
        mt={50}
        src="artigos/id11/figura-4-incidencia-diarreia.webp"
        width={556}
        height={613}
        alt="Incidência de diarreia: grupo com intervenção (antibióticos + B. clausii, n = 218) 1,8%, redução de 72,6% na incidência; grupo controle (apenas antibióticos, n = 217) 6,5%; p = 0,017."
      >
        Figura 4. Redução da incidência de diarreia associada a antibióticos com B. clausii. Adaptado de Abreu AT, et al.
        Antibiotics. 2025;14(5):439.<sup>19</sup>
      </Figure>
      <p style={{ marginTop: 84 }}>
        Além da prevenção da DAA, evidências emergentes apontam para o papel do Bacillus clausii na modulação imunológica e
        na restauração mais rápida da diversidade microbiana. A suplementação com Bacillus clausii (O/C, SIN, N/R,T)
        associada ao manejo padrão como <strong>hidratação oral ou intravenosa, dieta leve conforme tolerância e controle
        sintomático</strong>, resultou em <strong>melhor recuperação dos marcadores imunológicos séricos</strong>, com
        aumento dos níveis de <strong>IgA, sIgA, IgM e IgG</strong>, indicando restauração da resposta imune de mucosa e
        sistêmica (Figura 5).<sup>20</sup>
      </p>
      <Figure
        center
        mt={33}
        src="artigos/id11/figura-5-marcadores-sericos.webp"
        width={677}
        height={284}
        alt="Normalização dos marcadores imunológicos séricos. Bacillus clausii (impacto significativamente melhor): IgA 0,86 g/l, sIgA 30,32 g/l, IgM 0,79 g/l, IgG 9,11 g/l. Tratamento padrão: 0,71; 27,10; 1,03; 9,32 g/l (p < 0,001). Grupo controle: 0,82; 31,18; 0,73; 7,96 g/l (p > 0,05)."
      >
        Figura 5. Efeito de Bacillus clausii sobre a normalização dos marcadores imunológicos séricos em crianças com
        gastroenterite viral aguda. Adaptado de Smiyan OI et al. Wiadomosci lekarskie (Warsaw, Poland : 1960), 2019;
        72(7).<sup>20</sup>
      </Figure>
      <p>
        Essa modulação imune foi acompanhada por uma{' '}
        <strong>redução significativa na duração dos sintomas clínicos</strong>, com diminuição média de{' '}
        <strong>
          1,13 dia nos episódios de diarreia, 1,17 dia na fraqueza geral, 0,6 dia nos episódios de vômito e 0,52 dia na
          febre
        </strong>{' '}
        (Figura 6).<sup>20</sup>
      </p>
      <Figure
        center
        mt={0}
        src="artigos/id11/figura-6-sintomas-clinicos.webp"
        width={681}
        height={480}
        alt="Gráfico de barras da redução média na duração dos sintomas clínicos: diarreia -1,13 dia (p < 0,001), fraqueza generalizada -1,17 dia (p < 0,001), febre -0,52 dia (p < 0,05) e vômito -0,6 dia (p < 0,001)."
      >
        Figura 6. Redução média na duração dos sintomas clínicos em crianças com gastroenterite viral aguda tratadas com
        manejo padrão associado a Bacillus clausii, em comparação ao manejo isolado. Adaptado de Smiyan OI et al.
        Wiadomosci lekarskie (Warsaw, Poland : 1960), 2019; 72(7).<sup>20</sup>
      </Figure>

      <H2>
        Enterogermina<sup>®</sup> (O/C, SIN, N/R, T) tem os 3 ATRIBUTOS-CHAVE necessários a um probiótico eficaz:
        sobrevivência, adesão e colonização intestinal<sup>21</sup>
      </H2>
      <div>
        <p>
          Além disso, diferentemente de outras marcas disponíveis,{' '}
          <strong>
            Enterogermina<sup>®</sup> (O/C, SIN, N/R, T)
          </strong>{' '}
          provou estar em conformidade com as recomendações da OMS:<sup>22,23</sup>
        </p>
        <ul className="art-list art-list--hang">
          <li>A quantificação dos esporos é compatível com a rotulagem;</li>
          <li>Livre de contaminantes;</li>
          <li>Capacidade de sobreviver no trato gastrointestinal;</li>
          <li>
            Resistência aos antibióticos mais prescritos.<sup>14,15,16,24</sup>
          </li>
        </ul>
      </div>
      <Figure
        left
        mt={0}
        src="artigos/id11/familia-enterogermina.webp"
        width={677}
        height={364}
        alt="Enterogermina em flaconete ou sachê, sem glúten, sem lactose, sem corante, sem açúcar e sem sabor/cheiro. Embalagens: Enterogermina Criança e Adulto Plus, Enterogermina Criança e Adulto e Enterogermina Adulto Max (+19 anos, 1x ao dia, sabor laranja)."
      />
      <p>
        <strong>
          Enterogermina<sup>®</sup> NÃO CONTÉM GLÚTEN.
        </strong>{' '}
        Bacillus clausii O/C, SIN, N/R, T podem contribuir com a saúde do trato gastrointestinal.{' '}
        <strong>
          Este produto não deve ser consumido por gestantes, lactantes, pessoas imunocomprometidas ou pessoas acometidas de
          condição de saúde debilitante grave.
        </strong>
        <sup>24</sup>
      </p>

      <References
        rule={false}
        wideMarker
        spaced
        title="Referencias:"
        titleGap={40}
        className="art-refs--h2-title"
        items={[
          'Pneumonia Etiology Research for Child Health (PERCH) Study Group. Causes of severe pneumonia requiring hospital admission in children without HIV infection from Africa and Asia: the PERCH multi-country case-control study. Lancet 2019;394(10200):757–79.',
          'Neuzil KM, Mellen BG, Wright PF, et al. The effect of influenza on hospitalizations, outpatient visits, and courses of antibiotics in children. N Engl J Med 2000;342(4):225–31.',
          <>
            Ministério da Saúde. NOTA TÉCNICA Nº 30/2023-CGVDI/DPNI/SVSA/MS. 2023. Acesso em 06 de maio de 2026.
            Disponível em:{' '}
            <Ext href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2023/nota-tecnica-no-30-2023-cgvdi-dpni-svsa-ms/%40%40download/file">
              https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2023/nota-tecnica-no-30-2023-cgvdi-dpni-svsa-ms/%40%40download/file?utm_source
            </Ext>
          </>,
          <>
            Boletim InfoGripe.Semana Epidemiológica (SE) 31 2025. FIOCRUZ. 2025. Acesso em 06 de maio de 2026. Disponível
            em:{' '}
            <Ext href="https://agencia.fiocruz.br/sites/agencia.fiocruz.br/files/Resumo_InfoGripe_2025_31.pdf">
              https://agencia.fiocruz.br/sites/agencia.fiocruz.br/files/Resumo_InfoGripe_2025_31.pdf
            </Ext>
          </>,
          'Bou-Antoun S, Costelloe C, Honeyford K, et al. Age-related decline in antibiotic prescribing for uncomplicated respiratory tract infections in primary care in England following the introduction of a national financial incentive (the Quality Premium) for health commissioners to reduce use of antibiotics in the community: an interrupted time series analysis. J Antimicrob Chemother 2018;73(10):2883–92.',
          <>
            Sociedade Brasileira de Pediatria. Dor de garganta. 2025. Acesso em 06 de maio de 2026. Disponível em:{' '}
            <Ext href="https://www.sbp.com.br/pediatria-para-familias/cuidados-com-a-saude/dor-de-garganta/">
              https://www.sbp.com.br/pediatria-para-familias/cuidados-com-a-saude/dor-de-garganta/
            </Ext>
          </>,
          <>
            Sociedade Brasileira de Pediatria. Otite Média. 2025. Acesso em 06 de maio de 2026. Disponível em:{' '}
            <Ext href="https://www.sbp.com.br/pediatria-para-familias/doencas/otite-media/">
              https://www.sbp.com.br/pediatria-para-familias/doencas/otite-media/
            </Ext>
          </>,
          'Buehrle DJ, Wagener MM, Nguyen MH, Clancy CJ. Trends in Outpatient Antibiotic Prescriptions in the United States During the COVID-19 Pandemic in 2020. JAMA Netw Open 2021;4(9):e2126114.',
          <>
            WHO. Antimicrobial Resistance. 2019. Acesso em 06 de maio de 2026. Disponível em:{' '}
            <Ext href="https://www.who.int/docs/default-source/antimicrobial-resistance/amr-factsheet.pdf">
              https://www.who.int/docs/default-source/antimicrobial-resistance/amr-factsheet.pdf?utm_source
            </Ext>
          </>,
          <>
            European Centre for Disease. 33000 people die every year due to infections with antibiotic-resistant bacteria.
            Prevention and Control. 2018. Acesso em 06 de maio de 2026. Disponível em:{' '}
            <Ext href="https://www.ecdc.europa.eu/en/news-events/33000-people-die-every-year-due-infections-antibiotic-resistant-bacteria">
              https://www.ecdc.europa.eu/en/news-events/33000-people-die-every-year-due-infections-antibiotic-resistant-bacteria
            </Ext>
          </>,
          'Doan T, Hinterwirth A, Worden L, et al. Gut microbiome alteration in MORDOR I: a community-randomized trial of mass azithromycin distribution. Nat Med 2019;25(9):1370–6.',
          'Turck D, Bernet J-P, Marx J, et al. Incidence and risk factors of oral antibiotic-associated diarrhea in an outpatient pediatric population. J Pediatr Gastroenterol Nutr 2003;37(1):22–6.',
          'Kuehn J, Ismael Z, Long PF, Barker CIS, Sharland M. Reported rates of diarrhea following oral penicillin therapy in pediatric clinical trials. J Pediatr Pharmacol Ther 2015;20(2):90–104.',
          'Vecchione A, Celandroni F, Mazzantini D, Senesi S, Lupetti A, Ghelardi E. Compositional Quality and Potential Gastrointestinal Behavior of Probiotic Products Commercialized in Italy. Front Med 2018;5:335726.',
          'Ghelardi E, Celandroni F, Salvetti S, et al. Survival and persistence of Bacillus clausii in the human gastrointestinal tract following oral administration as spore-based probiotic formulation. Journal of applied microbiology. 2015. 2024 Oct 28];119(2).',
          'Bevilacqua A, Petruzzi L, Sinigaglia M, et al. Effect of Physical and Chemical Treatments on Viability, Sub-Lethal Injury, and Release of Cellular Components from and Spores and Cells. Foods 2020;9(12).',
          'Acosta-Rodríguez-Bueno CP, Abreu Y, Abreu AT, et al. Bacillus clausii for Gastrointestinal Disorders: A Narrative Literature Review. Adv Ther 2022;39(11):4854–74.',
          'de Castro J-AA, Guno MJV-R, Perez MO. as adjunctive treatment for acute community-acquired diarrhea among Filipino children: a large-scale, multicenter, open-label study (CODDLE). Trop Dis Travel Med Vaccines 2019;5:14.',
          'Abreu AT, Vázquez Frías R, Boggio Marzet C, et al. Effectiveness of (O/C, N/R, SIN, T) in the Prevention of Antibiotic-Associated Diarrhea and Gastrointestinal Symptoms: A Systematic Review. Antibiotics (Basel) 2025;14(5).',
          'Smiyan OI, Smiian-Horbunova KO, Bynda TP, et al. Optimization of the treatment of rotavirus infection in children by using bacillus clausii. Wiadomosci lekarskie (Warsaw, Poland : 1960) 2019;72(7).',
          'Kolaček S, Hojsak I, Berni Canani R, et al. Commercial Probiotic Products: A Call for Improved Quality Control. A Position Paper by the ESPGHAN Working Group for Probiotics and Prebiotics. J Pediatr Gastroenterol Nutr 2017;65(1):117–24.',
          'Morelli L, Pellegrino P. A critical evaluation of the factors affecting the survival and persistence of beneficial bacteria in healthy adults. Beneficial microbes 2021;12(4).',
          'Kesavelu D, Ganpathy S, Jog P, et al. Evaluating the Compositional Quality of Probiotics Containing Bacillus clausii in India. Adv Ther 2025;',
          <>
            Folheto Enterogermina<sup>®</sup>
          </>,
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2601016-1.0-05/2026',
  pageCode: 'MAT-BR-2404503',
};

export default article;
