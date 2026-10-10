/* ID04 — Escolite na volta às aulas (Novalgina). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Author, Ext, Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  title: 'Escolite na volta às aulas: o que está por trás da febre nas primeiras semanas',
  heading: 'Escolite na volta às aulas: o que está por trás da febre nas primeiras semanas',
  description:
    'Por que as crianças adoecem tanto nas primeiras semanas de aula? O padrão epidemiológico da “escolite” em números e como orientar a escolha do antitérmico.',
  tags: ['Novo.', 'Artigo', 'Research', 'Não promocional'],
  lead: 'Por que as crianças adoecem tanto nas primeiras semanas de aula? Entenda em números o padrão epidemiológico da ‘escolite’ e veja como orientar a escolha do antitérmico com eficácia e segurança, sem necessidade de alternância.',
  hero: { src: 'artigos/id04/hero.webp', width: 505, height: 266, alt: 'Crianças em sala de aula escrevendo nos cadernos' },
  body: (
    <>
      <Author photo="artigos/id04/autor-renato-kfouri.webp" name="Dr. Renato Kfouri">
        Dr. Renato Kfouri é médico pediatra infectologista médico do CRIE UNIFESP, Vice-presidente da Sociedade Brasileira
        de Imunizações, Secretário do Departamento de Imunizações da Sociedade Brasileira de Pediatria, Membro da Câmara
        Técnica Assessora do Programa Nacional de Imunizações.
        <br />
        CRMSP: 59492
        <br />
        São Paulo -SP
      </Author>

      <H2>O caso que se repete todo início de semestre</H2>
      <Figure
        center
        mt={70}
        src="artigos/id04/caso-rafael.webp"
        width={735}
        height={596}
        alt="Rafael, 2 anos, voltou às aulas há 3 semanas. Há 2 dias começou com sintomas: 37,9 °C e coriza clara. Na última noite, pico de 38,7 °C, tosse seca, prostração e recusa parcial das refeições; nos intervalos sem febre, brinca normalmente. Ausculta pulmonar limpa; orofaringe hiperemiada sem exsudato. Hipótese: infecção viral de vias aéreas superiores, provavelmente adquirida na pré-escola."
      />
      <p>
        Não é um caso isolado — é uma condição recorrente na volta às aulas, especialmente durante as estações de outono e
        inverno. Nas redes sociais, pais já deram nome a isso: “escolite”, o apelido popular para o período de doenças logo
        após o início ou o retorno às aulas. Do ponto de vista clínico, o fenômeno tem explicação concreta: ambientes de
        convívio coletivo, contato próximo entre crianças e hábitos típicos da idade (levar as mãos à boca, compartilhar
        objetos) favorecem a disseminação de vírus e bactérias.<sup>1–4</sup>
      </p>
      <p>
        Neste artigo vamos entender em números as doenças infecciosas que acometem a população pediátrica, qual o impacto
        real e como tratar com eficácia e segurança a febre que acompanha a rotina das crianças que acabaram de voltar às
        aulas ou à creche.
      </p>

      <H2>A volta às aulas dispara o número de casos de doenças infecciosas</H2>
      <p>
        O retorno às aulas não é apenas um gatilho percebido pelos pais — é um evento epidemiologicamente mensurável. Em
        coorte americana,{' '}
        <strong>frequentar a escola foi associado a um risco 43% maior de infecção respiratória</strong> que motivou
        atendimento médico já duas semanas após o início do período escolar (Primeira semana RR 1,12; IC 95%: 0,93–1,34,
        mais de 2 semanas RR 1,43; IC 95%: 1,20–1,71).<sup>5</sup>
      </p>
      <Figure
        center
        src="artigos/id04/risco-infeccoes-volta-as-aulas.webp"
        width={561}
        height={585}
        alt="Gráfico: aumento no risco de infecções respiratórias em crianças de 5 a 17 anos na volta às aulas — 12% na primeira semana e 43% após 2 semanas."
      >
        Adaptado de Temte, J. L., Meiman, J. G., &amp; Gangnon, R. E. 2019. Epidemiology and infection, 147, e127.<sup>5</sup>
      </Figure>
      <p>
        <strong>Proporção de infecções virais versus bacterianas:</strong> As infecções respiratórias agudas são causadas
        predominantemente por vírus, representando 35-87% dos casos em crianças. As infecções bacterianas concomitantes são
        menos comuns: bacteremia ocorre em apenas 0,01-0,8% de crianças com infecções virais confirmadas.<sup>6</sup>
      </p>
      <p>
        No Brasil, dados pós-pandêmicos mostraram{' '}
        <strong>aumento de 28,3% para 50,8% na positividade viral dos casos não relacionados ao SARS-CoV-2</strong>, com
        amostras positivas em crianças sintomáticas para rinovírus, vírus sincicial respiratório, influenza A ou adenovírus,
        atribuído em parte à retomada da convivência escolar após a interrupção das medidas não farmacológicas de restrição.
        <sup>4</sup>
      </p>
      <p>
        <strong>Principais agentes envolvidos no Brasil:</strong>
      </p>
      <Figure
        center
        src="artigos/id04/virus-respiratorios.webp"
        width={746}
        height={586}
        alt="Vírus respiratórios (compilado de dados de diferentes análises e estados brasileiros): 1º rinovírus (19–44,5%), 2º VSR (12–38%), 3º adenovírus (11,9–25%), 4º bocavírus (11,9–19%), 5º metapneumovírus (~10%), 6º influenza A (0,1–13,4%). No Brasil, essas infecções respondem por 25 a 50% das hospitalizações pediátricas. VSR: vírus sincicial respiratório."
      >
        Adaptado de Lima AKS, Banho CA, Sacchetto L, et al. Braz J Microbiol 2023;54(3):1827–34, Ferreira HLDS, Costa KLP,
        Cariolano MS, et al. J Med Virol 2019;91(10):1751–8, Castro IA, Costa LDC, Oliveira ACR, et al. Braz J Microbiol
        2020;51(4):1729–35, Góes LGB, Zerbinati RM, Tateno AF, et al. J Med Virol 2020;92(8):1316–21, Bezerra PGM, Britto
        MCA, Correia JB, et al. PLoS One 2011;6(4):e18928, Sutmöller F, Ferro ZP, Asensi MD, Ferreira V, Mazzei IS, Cunha
        BL. Clin Infect Dis 1995;20(4):854–60.<sup>4,7–11</sup>
      </Figure>
      <Figure
        center
        mt={80}
        src="artigos/id04/varicela.webp"
        width={645}
        height={547}
        alt="Varicela (catapora): 196.621 casos no Brasil em 10 anos (2015–2025); 56,2% em crianças de 1 a 4 anos e 43,4% de 5 a 9 anos. A vacinação reduz a hospitalização de crianças. Não há estimativas consistentes da incidência de varicela no Brasil, uma vez que apenas os casos graves são de notificação compulsória."
      >
        Adaptado de BRASIL. Catapora (Varicela). Situação Epidemiológica Ministério da Saúde. Disponíveis em{' '}
        https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/catapora-varicela/situacao-epidemiologica, Scotta MC,
        Paternina-de la Ossa R, Lumertz MS et al. Vaccine 2018;36(2):280–4.<sup>15,16</sup>
      </Figure>
      <p>
        <strong>Varicela:</strong> a introdução da vacina varicela no Programa Nacional de Imunizações reduziu de forma
        significativa o número de casos e de hospitalizações pela doença, além de suas complicações.<sup>17</sup>
      </p>
      <p>
        <strong>Período de maior atenção:</strong> O vírus influenza tem picos de infecção que costumam ocorrer durante o
        inverno, geralmente logo após a circulação do VSR. As infecções por rinovírus e adenovírus apresentam circulação ao
        longo de todo o ano. No Brasil, a sazonalidade do VSR tem início no final de fevereiro, com picos de infecção entre
        abril e maio.<sup>4</sup> Ou seja: a janela de maior risco respiratório coincide, na maior parte do país, com o
        próprio calendário letivo.
      </p>
      <p>
        <strong>Implicações clínicas práticas:</strong> além do desconforto agudo, esse tipo de infecção costuma significar
        dias de aula perdidos e, com frequência, dias de trabalho perdidos pelos pais.<sup>18</sup>
      </p>
      <Figure
        center
        src="artigos/id04/caderneta-de-vacinacao.webp"
        width={706}
        height={550}
        alt="Volta às aulas é o momento ideal para revisar a caderneta de vacinação. A Sociedade Brasileira de Pediatria recomenda que atrasos vacinais sejam corrigidos com urgência antes do retorno, justamente pelo maior risco de transmissão interpessoal em ambientes coletivos."
      >
        Adaptado de Sociedade Brasileira de Pediatria. Volta às aulas: Sociedade Brasileira de Pediatria divulga conjunto
        de recomendações para garantir a boa saúde dos escolares. 2017.<sup>19</sup>
      </Figure>

      <H2>De volta a Rafael: qual antitérmico?</H2>
      <p>
        Diante da febre de Rafael, a pergunta que se repete em toda consulta de volta às aulas é: preciso de mais de um
        antitérmico, um para “febre não tão alta” e outro “quando for mais forte”?
      </p>
      <p>
        A diretriz mais recente da SBP responde que não — os antitérmicos podem ser utilizados para reduzir o desconforto
        da criança e a{' '}
        <strong>
          dipirona está recomendada para todos os níveis de febre, leve, moderada ou alta, em monoterapia, sem necessidade
          de troca conforme a intensidade do quadro.
        </strong>
        <sup>20</sup>
      </p>
      <p>
        Essa recomendação tem base em comparação direta: estudo multinacional, randomizado e duplo-cego com 628 crianças
        febris (de 6 meses a 6 anos) mostrou que dipirona levou a taxas de normalização térmica (82%) significativamente
        maiores que o paracetamol (68%; p = 0,004), e numericamente maiores que ibuprofeno (78%). O mais relevante para o
        dia a dia foi o efeito antitérmico mais duradouro de 4 a 6 horas com dipirona, justamente na janela em que a criança
        está na escola ou a família dormindo.<sup>21</sup>
      </p>
      <Figure
        center
        mt={67}
        src="artigos/id04/dipirona-controle-da-febre.webp"
        width={579}
        height={609}
        alt="Dipirona é eficaz para controlar a febre por mais tempo. Estudo randomizado duplo-cego multinacional com 628 crianças de 6 meses a 6 anos: taxa de normalização da temperatura (até 37,5 °C) de 82% com dipirona 15 mg/kg, 78% com ibuprofeno 5–10 mg/kg e 68% com paracetamol ~12 mg/kg (p < 0,004 vs. paracetamol). Mais pacientes normalizaram a temperatura com dipirona. Na alteração da temperatura ao longo do tempo, depois de 4 a 6 horas a temperatura média no grupo da dipirona era significativamente menor do que nos demais grupos (p < 0,005 vs. paracetamol e ibuprofeno): efeito antipirético mais duradouro."
      >
        Adaptado de Wong A, Sibbald A, Ferrero F, et al. Clin Pediatr (Phila). 2001;40(6):313-324. <sup>21</sup>
      </Figure>
      <p>
        Isso tem consequência prática direta na orientação aos pais:{' '}
        <strong>
          o uso de um único antitérmico eficaz do início ao fim da condição febril, não há necessidade de intercalar
          produtos “para garantir” a queda da temperatura.
        </strong>{' '}
        A própria SBP reforça que essa prática não traz benefício clinicamente relevante e aumenta o risco de erro de dose.
        <sup>20</sup>
      </p>
      <Figure
        center
        src="artigos/id04/nao-alternar-antitermicos.webp"
        width={610}
        height={592}
        alt="Não é necessário alternar antitérmicos: mecanismo de ação redundante (os três antitérmicos utilizados no Brasil inibem a síntese de PGE2); evidências escassas e clinicamente insignificantes sobre a eficácia da combinação antipirética vs. monoterapia; chance de confusão na hora de administrar o medicamento; maior risco de superdosagem; maior risco de eventos adversos e intoxicação; ausência de benefício adicional vs. monoterapia."
      >
        PGE2: Prostaglandina E2
      </Figure>
      <p>
        <strong>E se for arbovirose?</strong> Vale uma ressalva rápida, especialmente em regiões e períodos de maior
        circulação de arbovírus — cenário que a própria SBP recomenda monitorar na volta às aulas. Nesse contexto, alguns
        anti-inflamatórios não esteroidais, incluindo o ibuprofeno, são contraindicados pelo risco de sangramento e de
        agrava o extravasamento plasmático. A Novalgina<sup>®</sup> (dipirona) segue entre os antitérmicos recomendados
        pela SBP nesse cenário.<sup>20</sup>
      </p>

      <H2>Voltando ao consultório</H2>
      <p>
        O quadro de Rafael — como o de tantas outras crianças nas primeiras semanas de aula — não exige uma decisão complexa
        sobre antitérmico. Exige reconhecer o padrão epidemiológico da volta às aulas, checar a vacinação, e{' '}
        <strong>
          contar com uma escolha terapêutica que cobre toda a faixa de intensidade da febre sem exigir trocas:
        </strong>{' '}
        menos decisões para o cuidador, menos risco de erro, mais previsibilidade para a família nesse período de maior
        circulação viral.<sup>19,20</sup>
      </p>
      <p>
        Na volta às aulas, quando a febre faz parte da rotina do consultório, contar com uma conduta simples e alinhada às
        recomendações da SBP pode facilitar o manejo clínico.<sup>19,20</sup>
      </p>
      <Figure
        center
        mt={98}
        src="artigos/id04/novalgina-escolha-eficaz.webp"
        width={628}
        height={582}
        alt="Novalgina Infantil, a escolha eficaz e segura: 1) para todos os níveis de febre — indicada para febres leves, moderadas e altas; 2) controle da febre por mais tempo — maior duração do efeito antitérmico (vs. paracetamol ou ibuprofeno), por até 6 horas; 3) monoterapia segura — dispensa a necessidade de alternância entre antitérmicos, seguindo as recomendações da SBP."
      />

      <H2>Mapa de hipóteses diagnósticas para condições pediátricas febris</H2>
      <Figure
        center
        captionLeft
        mt={84}
        src="artigos/id04/figura-1-fluxograma-febre.webp"
        width={743}
        height={604}
        alt="Fluxograma da febre pediátrica. Sinais de alerta: idade menor que 3 meses com temperatura de 38 °C ou mais (alto risco de doença grave, avaliação médica urgente); 3 a 6 meses com 39 °C ou mais (risco pelo menos intermediário); quimioterapia sistêmica nos últimos 30 dias ou tratamento imunossupressor (suspeitar de sepse neutropênica). 1. Febre aguda (menos de 5 dias): algum sinal de gravidade leva à suspeita de doença grave, sepse ou doença meningocócica, com avaliação imediata; sem sinais, avaliar características específicas — exantema, dor de garganta, tosse, dor abdominal ou disúria, dor facial ou de ouvido, cefaleia ou convulsões, dor óssea ou articular, e febre com náuseas, mialgia e petéquias (arboviroses). 2. Febre prolongada ou recorrente: febre persistente por 5 dias ou mais (considerar doença de Kawasaki), infecções recorrentes ou incomuns, características sistêmicas e viagem recente."
      >
        <b>Figura 1.</b> Fluxograma de avaliação inicial da febre pediátrica segundo duração, sinais de gravidade e
        manifestações clínicas. Adaptado de Ministério da Saúde. Adulto e criança 6 ed. Acesso em 22/07/26. Disponível em:
        https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca.
        NICE. Fever in under 5s: assessment and initial management. NICE guideline NG143. London: NICE: 2019. NICE.
        Suspected sepsis in under 16s: recognition, diagnosis and early management. NICE guideline NG254. London: NICE:
        2025. Departamentos Científicos de Pediatria Ambulatorial e Infectologia. Abordagem da febre aguda em pediatria e
        reflexões sobre a febre nas arboviroses. Pediatria 2025. Broderick L, Hoffman HM. J Allergy Clin Immunol
        2020;146(5):960–6.e2.<sup>20,22–24</sup>
      </Figure>
      <Figure
        left
        mt={64}
        src="artigos/id04/novalgina-infantil.webp"
        width={762}
        height={594}
        alt="Novalgina Infantil para todas as intensidades de febre e dor. Até 15 anos de idade, a dosagem de Novalgina deve ser adequada ao peso e à idade. Este medicamento é contraindicado para menores de 3 meses de idade ou pesando menos de 5 kg. Para auxiliar no cálculo da dose, acesse a Calculadora de dose de Novalgina Infantil."
      />
      <p style={{ marginTop: 56 }}>
        NOVALGINA<sup>®</sup> (dipirona monoidratada). Indicação: analgésico e antitérmico. M.S.: 1.8620.0018. O USO DO
        MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER
        CONSULTADO.
      </p>

      <References
        rule={false}
        spaced
        title="Referência:"
        items={[
          <>
            Novalgina. Escolite: como lidar e cuidar dos pequenos [Internet]. Novalgina<sup>®</sup>. [cited 2026 Jul
            17];Available from:{' '}
            <Ext href="https://www.novalgina.com.br/dor-e-febre/bem-estar/escolite-como-lidar">
              https://www.novalgina.com.br/dor-e-febre/bem-estar/escolite-como-lidar
            </Ext>
          </>,
          'Søegaard SH, Spanggaard M, Rostgaard K, et al. Childcare attendance and risk of infections in childhood and adolescence. Int J Epidemiol 2023;52(2):466–75.',
          'de Hoog MLA, Venekamp RP, van der Ent CK, et al. Impact of early daycare on healthcare resource use related to upper respiratory tract infections during childhood: prospective WHISTLER cohort study. BMC Med 2014;12(1):107.',
          'Lima AKS, Banho CA, Sacchetto L, et al. Seasonal respiratory virus trends in pediatric patients during the COVID-19 pandemic in Brazil. Braz J Microbiol 2023;54(3):1827–34.',
          'Temte JL, Meiman JG, Gangnon RE. School sessions are correlated with seasonal outbreaks of medically attended respiratory infections: electronic health record time series analysis, Wisconsin 2004-2011. Epidemiol Infect 2019;147(e127):e127.',
          'Doan Q, Enarson P, Kissoon N, Klassen TP, Johnson DW. Rapid viral diagnosis for acute febrile respiratory illness in children in the Emergency Department. Cochrane Database Syst Rev 2014;(9):CD006452.',
          'Ferreira HLDS, Costa KLP, Cariolano MS, et al. High incidence of rhinovirus infection in children with community-acquired pneumonia from a city in the Brazilian pre-Amazon region. J Med Virol 2019;91(10):1751–8.',
          'Castro IA, Costa LDC, Oliveira ACR, et al. Circulation profile of respiratory viruses in symptomatic and asymptomatic children from Midwest Brazil. Braz J Microbiol 2020;51(4):1729–35.',
          'Góes LGB, Zerbinati RM, Tateno AF, et al. Typical epidemiology of respiratory virus infections in a Brazilian slum. J Med Virol 2020;92(8):1316–21.',
          'Bezerra PGM, Britto MCA, Correia JB, et al. Viral and atypical bacterial detection in acute respiratory infection in children under five years. PLoS One 2011;6(4):e18928.',
          'Sutmöller F, Ferro ZP, Asensi MD, Ferreira V, Mazzei IS, Cunha BL. Etiology of acute respiratory tract infections among children in a combined community and hospital study in Rio de Janeiro. Clin Infect Dis 1995;20(4):854–60.',
          'Blake PA, Ramos S, MacDonald KL, et al. Pathogen-specific risk factors and protective factors for acute diarrheal disease in urban Brazilian infants. J Infect Dis 1993;167(3):627–32.',
          'Mattison CP, Calderwood LE, Marsh ZA, et al. Childcare and school acute gastroenteritis outbreaks: 2009-2020. Pediatrics 2022;150(5):e2021056002.',
          'Pratte-Santos R, Miagostovich MP, Fumian TM, et al. High prevalence of enteric viruses associated with acute gastroenteritis in pediatric patients in a low-income area in Vitória, Southeastern Brazil. J Med Virol 2019;91(5):744–50.',
          <>
            Situação Epidemiológica [Internet]. Ministério da Saúde. [cited 2026 Jul 20];Available from:{' '}
            <Ext href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/catapora-varicela/situacao-epidemiologica">
              https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/c/catapora-varicela/situacao-epidemiologica
            </Ext>
          </>,
          'Scotta MC, Paternina-de la Ossa R, Lumertz MS, Jones MH, Mattiello R, Pinto LA. Early impact of universal varicella vaccination on childhood varicella and herpes zoster hospitalizations in Brazil. Vaccine 2018;36(2):280–4.',
          'Abreu E Silva HB de, Corrêa HP, Ribeiro IA, et al. Impact of six years of routine varicella vaccination on the disease-related hospitalizations at Minas Gerais, Brazil. Vaccine 2022;40(2):390–5.',
          'Willis GA, Preen DB, Richmond PC, et al. The impact of influenza infection on young children, their family and the health care system. Influenza Other Respi Viruses 2019;13(1):18–27.',
          <>
            Sociedade Brasileira de Pediatria. Volta às aulas: Sociedade Brasileira de Pediatria divulga conjunto de
            recomendações para garantir a boa saúde dos escolares [Internet]. Sociedade Brasileira de Pediatria. 2017 [cited
            2026 Jul 16];Available from:{' '}
            <Ext href="https://www.sbp.com.br/volta-as-aulas-sociedade-brasileira-de-pediatria-divulga-conjunto-de-recomendacoes-para-garantir-a-boa-saude-dos-escolares/">
              https://www.sbp.com.br/volta-as-aulas-sociedade-brasileira-de-pediatria-divulga-conjunto-de-recomendacoes-para-garantir-a-boa-saude-dos-escolares/
            </Ext>
          </>,
          <>
            Sociedade Brasileira de Pediatria. Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas
            arboviroses [Internet]. Sociedade Brasileira de Pediatria. 2025 [cited 2026 Jul 16];Available from:{' '}
            <Ext href="https://www.sbp.com.br/abordagem-da-febre-aguda-em-pediatria-e-reflexoes-sobre-a-febre-nas-arboviroses-2/">
              https://www.sbp.com.br/abordagem-da-febre-aguda-em-pediatria-e-reflexoes-sobre-a-febre-nas-arboviroses-2/
            </Ext>
          </>,
          'Wong A, Sibbald A, Ferrero F, et al. Antipyretic effects of dipyrone versus ibuprofen versus acetaminophen in children: results of a multinational, randomized, modified double-blind study. Clin Pediatr (Phila) 2001;40(6):313–24.',
          'NICE.Fever in under 5s: assessment and initial management. NICE guideline NG143. London: NICE: 2019.',
          'NICE. Suspected sepsis in under 16s: recognition, diagnosis and early management. NICE guideline NG254. London: NICE: 2025.',
          'Broderick L, Hoffman HM. Pediatric recurrent fever and autoinflammation from the perspective of an allergist/immunologist. J Allergy Clin Immunol 2020;146(5):960–6.e2.',
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2603652',
  pageCode: 'MAT-BR-2404503',
};

export default article;
