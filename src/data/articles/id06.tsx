/* ID06 — Febre na Pediatria: o que realmente guia a conduta? (Novalgina). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Ext, Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  title: 'Febre na Pediatria: O que realmente guia a conduta?',
  heading: 'Febre na Pediatria: O que realmente guia a conduta?',
  description:
    'O desconforto, e não apenas o valor da temperatura, é o principal critério para decidir quando tratar a febre. Cinco perguntas da prática com as respostas da SBP.',
  tags: ['Novo.', 'Artigo', 'Não promocional'],
  lead: 'O desconforto, e não apenas o valor da temperatura, é o principal critério para decidir quando tratar a febre. A Sociedade Brasileira de Pediatria recomenda uma nova abordagem para esse sintoma tão comum na infância.',
  hero: { src: 'artigos/id06/hero.webp', width: 505, height: 285, alt: 'Pediatra sorridente segurando um bebê' },
  body: (
    <>
      <p>
        Quantas vezes uma criança bem-disposta, brincando, mostra temperatura de 37,8 °C — e os pais em desespero pedindo
        “alguma coisa para baixar a febre”?
        <br />
        Essa ansiedade dos familiares frente à febre é bem documentada.<sup>1</sup>
      </p>
      <Figure
        center
        mt={30}
        src="artigos/id06/febre-nas-consultas.webp"
        width={663}
        height={586}
        alt="20 a 30% das consultas pediátricas têm a febre como sintoma principal. Febrefobia: a associação entre febre e doença grave transforma um sinal clínico comum em uma verdadeira fobia."
      >
        Adaptado de Sociedade Brasileira de Pediatria Documento Científico nº 206, 15 de maio de 2025.<sup>1</sup>
      </Figure>
      <p>
        Essa situação fica ainda mais comum em períodos em que a disseminação de doenças infecciosas aumenta entre
        crianças e adolescentes, como o que ocorre na volta às aulas.<sup>2,3</sup>
      </p>
      <p>
        A Sociedade Brasileira de Pediatria (SBP) lançou um documento que auxilia o manejo da febre pediátrica.
        <sup>1</sup> A seguir, 5 perguntas comuns na prática clínica com as respostas que a evidência oferece hoje.
      </p>

      <H2>A partir de qual temperatura devo prescrever um antitérmico?</H2>
      <p>
        A indicação do antitérmico não é um número, o critério é o desconforto da criança. <sup>1</sup>
      </p>
      <Figure
        center
        src="artigos/id06/avaliacao-alem-do-termometro.webp"
        width={777}
        height={618}
        alt="A avaliação vai além do termômetro: irritabilidade, choro intenso, falta de apetite, distúrbio do sono e redução da atividade. A definição de febre axilar também foi atualizada para 37,5 °C ou mais, diferente dos 37,2 °C do modelo anterior."
      >
        Adaptado de Sociedade Brasileira de Pediatria Documento Científico nº 206, 15 de maio de 2025.<sup>1</sup>
      </Figure>
      <p>
        A criança com febre, de qualquer intensidade, que apresenta desconforto evidente é candidata ao antitérmico.
        Aguardar 38,5 °C ou 39 °C para prescrever não tem respaldo nas recomendações atuais.<sup>1</sup>
      </p>

      <H2>Tenho que escolher antitérmicos diferentes caso a febre seja baixa ou alta?</H2>
      <p>Não é necessário.</p>
      <p>
        É possível utilizar apenas um antitérmico para febre baixa ou alta. Isso porque a nova diretriz de febre da{' '}
        <strong>
          Sociedade Brasileira de Pediatria (2025) indica a dipirona para febres de todas as intensidades (leves,
          moderadas ou altas).
        </strong>
        <sup>1</sup>
      </p>
      <p>Evidências robustas apoiam essa indicação:</p>
      <Figure
        center
        src="artigos/id06/evidencias-dipirona.webp"
        width={777}
        height={616}
        alt="Evidências apoiam dipirona para febre em todas as intensidades. Estudo brasileiro randomizado com 80 crianças febris comparou dipirona e ibuprofeno em dois grupos de temperatura: febre baixa (38,0 a 39,1 °C) e febre alta (acima de 39,1 °C). A dipirona não diferencia o nível de febre para agir: 100% dos pacientes apresentaram redução de temperatura nas primeiras 2 horas, com eficácia semelhante em todas as intensidades de febre."
      />
      <Figure
        center
        mt={70}
        src="artigos/id06/estudo-628-criancas.webp"
        width={560}
        height={618}
        alt="Estudo robusto randomizado duplo-cego multinacional com 628 crianças (6 meses a 6 anos) comparou dipirona, ibuprofeno e paracetamol. Taxa de normalização de temperatura (até 37,5 °C): dipirona 15 mg/kg 82%, ibuprofeno 5–10 mg/kg 78%, paracetamol ~12 mg/kg 68% (p < 0,004 vs. paracetamol): mais pacientes normalizaram a temperatura com dipirona. Na alteração da temperatura ao longo de 6 horas, depois de 4 a 6 horas a temperatura média no grupo da dipirona era significativamente menor do que nos demais grupos (p < 0,005 vs. paracetamol e ibuprofeno): efeito antipirético mais duradouro. Adaptado de Wong A, Sibbald A, Ferrero F, et al. Clin Pediatr (Phila). 2001;40(6):313-24."
      />

      <H2 mt={50}>A dipirona é segura a partir de qual idade?</H2>
      <Figure
        center
        mt={80}
        src="artigos/id06/dipirona-idade-e-dose.webp"
        width={620}
        height={616}
        alt="A dipirona é recomendada para crianças a partir de 3 meses de idade ou 5 kg: a dose varia de acordo com o peso, a idade e a forma farmacêutica e deve ser administrada de acordo com a bula; intervalo de 6 a 8 horas; a dose máxima diária deve ser prescrita de acordo com a faixa etária e o peso do paciente, conforme recomendação em bula. A prescrição deve ser feita em mg/kg, não em gotas/kg: o esquema tradicional de 1 gota/kg frequentemente resulta em superdosagem dependendo do peso e da faixa etária da criança; na apresentação em gotas, cada gota contém 25 mg de dipirona; a orientação ao cuidador deve ser explícita sobre como calcular a dose correta pelo peso da criança a cada administração."
      >
        Um ponto mencionado pelo Guia da SBP publicado em 2025 e que merece atenção na prática: a hipotensão,
        frequentemente citada como preocupação com a dipirona, está associada ao uso incorreto da dose e não à molécula em
        si.<sup>1</sup>
      </Figure>

      <H2>Intercalar antitérmicos pode ser prejudicial?</H2>
      <p>
        Essa é uma das perguntas mais frequentes no cotidiano pediátrico e a resposta da SBP em 2025 é a mesma das últimas
        diretrizes: <sup>1</sup>
      </p>
      <Figure
        center
        src="artigos/id06/nao-alternar-antitermicos.webp"
        width={777}
        height={613}
        alt="Por que não se deve alternar antitérmicos? Mecanismo de ação redundante: os três antitérmicos utilizados no Brasil inibem a síntese de PGE2. Evidências escassas e clinicamente insignificantes sobre a eficácia da combinação antipirética vs. monoterapia. Chance de confusão na hora de administrar o medicamento; maior risco de superdosagem; maior risco de eventos adversos e intoxicação; ausência de benefício adicional vs. monoterapia."
      >
        PGE2: Prostaglandina E2
      </Figure>
      <p>
        Os dados brasileiros ilustram bem esse risco: um estudo conduzido com 692 crianças no Sul do Brasil mostrou que{' '}
        <strong>26,7% dos cuidadores relataram usar terapia alternada e, em sua maioria</strong>, por orientação do
        próprio pediatra. No mesmo estudo, cerca de{' '}
        <strong>70% das doses administradas estavam abaixo do mínimo recomendado</strong>, reforçando que o problema não
        é a molécula, é o esquema de uso. <sup>1</sup>
      </p>
      <p>
        A dipirona, utilizada em monoterapia nas doses corretas, já oferece eficácia antipirética superior ao paracetamol
        e efeito mais duradouro que o ibuprofeno após 4 a 6 horas. A intercalação não traz benefício clinicamente
        relevante e subtrai segurança.<sup>1,5</sup>
      </p>
      <p style={{ marginTop: 38 }}>No contexto de arboviroses, o que muda na escolha do antitérmico?</p>
      <p>Muda a contraindicação e não é insignificante.</p>
      <Figure
        center
        mt={36}
        src="artigos/id06/arboviroses.webp"
        width={777}
        height={612}
        alt="Sociedade Brasileira de Pediatria e Ministério da Saúde contraindicam anti-inflamatórios não esteroidais, incluindo ibuprofeno, no contexto de arboviroses, devido ao risco aumentado de sangramento e de insuficiência renal em cenário de extravasamento plasmático. A dipirona está entre os antitérmicos recomendados."
      />
      <p style={{ marginTop: 8 }}>Fluxo de Decisão</p>
      <Figure
        center
        src="artigos/id06/fluxo-de-decisao.webp"
        width={777}
        height={604}
        alt="Quando e como tratar a febre. A criança tem febre (37,5 °C ou mais, axilar)? Se sim: há desconforto evidente (irritabilidade, choro, prostração, inapetência, distúrbio do sono)? Se não, observar e orientar os cuidadores. Se sim, indicar antitérmico. Qual? Contexto geral, para todas as intensidades de febre: a SBP recomenda dipirona 10–16 mg/kg/dose (a partir de 3 meses/5 kg) em monoterapia, sem intercalação. Contexto de arbovirose: dipirona ou paracetamol; ibuprofeno contraindicado. Menores de 1 mês: apenas paracetamol. Para a dose correta e segura, consultar a bula."
      >
        Adaptado de Sociedade Brasileira de Pediatria Documento Científico nº 206, 15 de maio de 2025.<sup>1</sup>
      </Figure>
      <p>
        As recomendações da{' '}
        <strong>SBP reforçam uma abordagem baseada em evidências para o manejo da febre</strong> e tornam-se ainda mais
        relevantes em períodos de maior circulação de vírus. Por isso, a volta às aulas se torna o momento em que estar bem
        informado pode ajudar no cuidado do paciente pediátrico e trazer segurança à família. <sup>1-3</sup>
      </p>
      <Figure
        left
        src="artigos/id06/novalgina-infantil.webp"
        width={777}
        height={617}
        alt="Novalgina Infantil para febre e dor. Até 15 anos de idade, a dosagem de Novalgina deve ser adequada ao peso e à idade. Para auxiliar no cálculo da dose, acesse a Calculadora de dose de Novalgina Infantil. Este medicamento é contraindicado para menores de 3 meses de idade ou pesando menos de 5 kg."
      />
      <p style={{ marginTop: 8 }}>
        NOVALGINA<sup>®</sup> (dipirona monoidratada). Indicação: analgésico e antitérmico. M.S.: 1.8620.0018. O USO DO
        MEDICAMENTO PODE TRAZER ALGUNS RISCOS. Leia atentamente a bula. SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER
        CONSULTADO.
      </p>

      <References
        rule={false}
        wideMarker
        large
        spaced
        title="Referências:"
        items={[
          <>
            Sociedade Brasileira de Pediatria. Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas
            arboviroses [Internet]. Sociedade Brasileira de Pediatria; 15 de Maio de 2025 [cited 2026 Apr 23]. Available
            from:{' '}
            <Ext href="https://www.sbp.com.br/fileadmin/user_upload/sbp/2025/maio/16/24896f-DC_-Abordag_Febre_Aguda_em_Pediatria_e_Reflexoes_VIRTUAL.pdf">
              https://www.sbp.com.br/fileadmin/user_upload/sbp/2025/maio/16/24896f-DC_-Abordag_Febre_Aguda_em_Pediatria_e_Reflexoes_VIRTUAL.pdf
            </Ext>
          </>,
          <>
            Fundação Oswaldo Cruz (Fiocruz). Boletim InfoGripe: Semana Epidemiológica SE06/2025. Rio de Janeiro: Fiocruz,
            2025. Acesso em:02 de julho de 2026.
            <br />
            Disponível em:
            <Ext href="https://agencia.fiocruz.br/sites/agencia.fiocruz.br/files/Resumo_InfoGripe_2025_06.pdf">
              https://agencia.fiocruz.br/sites/agencia.fiocruz.br/files/Resumo_InfoGripe_2025_06.pdf
            </Ext>
          </>,
          <>
            Sociedade Brasileira de Pediatria. Volta às aulas: Sociedade Brasileira de Pediatria divulga conjunto de
            recomendações para garantir a boa saúde dos escolares [Internet]. Sociedade Brasileira de Pediatria. 2017.
            Acesso em: 02 de julho de 2026. Disponivel em:{' '}
            <Ext href="https://www.sbp.com.br/volta-as-aulas-sociedade-brasileira-de-pediatria-divulga-conjunto-de-recomendacoes-para-garantir-a-boa-saude-dos-escolares/">
              https://www.sbp.com.br/volta-as-aulas-sociedade-brasileira-de-pediatria-divulga-conjunto-de-recomendacoes-para-garantir-a-boa-saude-dos-escolares/
            </Ext>
          </>,
          'Magni AM, Scheffer DK, Bruniera P. Antipyretic effect of ibuprofen and dipyrone in febrile children. J Pediatr (Rio J) 2011;87(1):36–42.',
          'Wong A, Sibbald A, Ferrero F, et al. Antipyretic effects of dipyrone versus ibuprofen versus acetaminophen in children: results of a multinational, randomized, modified double-blind study. Clin Pediatr (Phila) 2001;40(6):313–24.',
          <>
            Bula Novalgina<sup>®</sup>.
          </>,
          <>
            BRASIL. Ministério da Saúde. Dengue Diagnóstico E Manejo Clínico: Adulto e criança. Edição 6a. [Internet].
            [cited 2026 Apr 24];Available from:{' '}
            <Ext href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca">
              https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/dengue/dengue-diagnostico-e-manejo-clinico-adulto-e-crianca
            </Ext>
          </>,
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2602603-v5.0-06/2026',
  pageCode: 'MAT-BR-2404503',
};

export default article;
