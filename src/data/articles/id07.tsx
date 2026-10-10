/* ID07 — Sedação não é sono (Allegra). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Ext, Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  title: 'Sedação não é sono: por que anti-histamínicos sedativos podem prejudicar a criança',
  heading: 'Sedação não é sono: por que anti-histamínicos sedativos podem prejudicar a criança',
  description:
    'Anti-histamínicos sedativos podem prejudicar o sono, a cognição e o desempenho escolar da criança com rinite alérgica, e seu uso deve ser evitado segundo a SBP.',
  tags: ['Novo.', 'Artigo', 'Alergia', 'Não promocional'],
  lead: 'A rinite alérgica pediátrica vai além dos sintomas nasais. Anti-histamínicos sedativos podem prejudicar o sono, a cognição e o desempenho escolar, e seu uso deve ser evitado em crianças segundo recomendação da SBP.',
  hero: { src: 'artigos/id07/hero.webp', width: 505, height: 284, alt: 'Menina abraçando a mãe por trás, as duas sorrindo' },
  body: (
    <>
      <H2>Introdução</H2>
      <p>
        <strong>A rinite alérgica afeta cerca de 40% das crianças e adolescentes</strong> e vai muito além dos sintomas
        nasais. Congestão, espirros e prurido comprometem o sono, a atenção, o comportamento e o desempenho escolar —
        impactando a criança e toda a família.<sup>1,2</sup>
      </p>
      <p>
        Nesse contexto, a escolha do anti-histamínico vai além do alívio sintomático: ela pode influenciar sono, atenção,
        desempenho escolar e qualidade de vida da criança. E um dos erros mais comuns ainda cometidos na prática clínica é
        o uso de anti-histamínicos de 1ª geração com a crença de que “fazer dormir” é sinônimo de descanso. Não é.
      </p>
      <p>
        Ao contrário dos anti-histamínicos de 1ª geração, como clorfeniramina, prometazina e hidroxizina,{' '}
        <strong>
          Allegra<sup>®</sup> (fexofenadina)
        </strong>{' '}
        controla a resposta histamínica com eficácia comprovada e apresenta perfil não sedativo, sem evidência de
        comprometimento cognitivo ou psicomotor clinicamente relevante nos estudos citados.<sup>3,4</sup>
      </p>

      <H2>“Faz dormir” não é a mesma coisa que “faz dormir bem”</H2>
      <p>
        Anti-histamínicos de 1ª geração como clorfeniramina, prometazina e hidroxizina causam sedação por bloqueio H1
        central, um efeito que muitos médicos utilizam intencionalmente para “acalmar” ou induzir o sono . O problema é que
        esse sono não é fisiológico. Esses medicamentos alteram a arquitetura do sono, reduzindo as fases de sono REM e
        provocando fragmentação, ou seja, um sono de baixa qualidade e não restaurador.<sup>3,5</sup>
      </p>
      <p>
        <strong>
          A Sociedade Brasileira de Pediatria (SBP) não recomenda o uso de anti-histamínicos de 1ª geração em crianças
        </strong>
        , uma vez que:<sup>18</sup>
      </p>
      <Figure
        center
        mt={60}
        src="artigos/id07/comparativo-sbp.webp"
        width={695}
        height={350}
        alt="Recomendação da SBP — anti-histamínicos de 1ª geração: o uso deve ser evitado. Comparativo clínico entre anti-H1 de 1ª e 2ª gerações: penetração no SNC — 1ª geração sim, 2ª geração ausência ou menor penetração; frequência diária — 3 a 4 vezes vs. 1 a 2 vezes; eventos adversos — múltiplos sistemas vs. menor incidência e gravidade; letalidade em crianças — relatada vs. não observada; estudos controlados — ausentes vs. bem documentados, inclusive em crianças."
      >
        <b>Fonte:</b> Sociedade Brasileira de Pediatria (SBP). Documento Científico nº 205, de 13 de maio de 2025.
        <sup>18</sup>
      </Figure>
      <div>
        <p>
          A questão central, portanto, não é{' '}
          <strong>se o medicamento faz a criança dormir, mas se ele permite que ela durma bem</strong>. Entre os eventos
          adversos frequentes estão:<sup>18</sup>
        </p>
        <ul className="art-list art-list--hang">
          <li>Sonolência diurna, prejuízo cognitivo.</li>
          <li>Boca seca, retenção urinária, ganho de peso.</li>
          <li>Potencial risco cardíaco.</li>
        </ul>
      </div>
      <p>
        Nesse contexto, anti-histamínicos de 2ª geração são preferidos por apresentarem menor penetração no sistema nervoso
        central e menor risco de sedação, conforme recomendado para uso pediátrico.<sup>18</sup>
      </p>

      <H2>Fexofenadina: mecanismos associados à baixa penetração no sistema nervoso central</H2>
      <ol className="art-list--hang">
        <li>
          Estrutura lipofóbica: baixa afinidade pelas membranas lipídicas dos capilares cerebrais — impede a passagem pela
          barreira hematoencefálica (Figura 1).<sup>9</sup>
        </li>
        <li>
          Substrato da glicoproteína-P: transportador ativo que expulsa a molécula de volta à corrente sanguínea, mesmo
          quando pequenas quantidades chegam à barreira hematoencefálica (Figura 1).<sup>9</sup>
        </li>
      </ol>
      <Figure
        center
        mt={70}
        src="artigos/id07/figura-1-barreira-hematoencefalica.webp"
        width={677}
        height={481}
        alt="Ilustração da membrana celular de células endoteliais capilares no cérebro: a camada de fosfolipídios (lipofílica) e a glicoproteína-P (transportador de efluxo) devolvem a fexofenadina (Allegra) à corrente sanguínea."
      >
        <b>Figura 1.</b> Mecanismos que impedem a fexofenadina de atravessar a Barreira Hematoencefálica e de se ligar aos
        receptores H1 centrais. 1. <b>Camada de Fosfolipídios Lipofílica:</b> Devido à sua propriedade lipofóbica, a
        fexofenadina tem baixa afinidade pelas membranas celulares ricas em lipídios dos capilares vasculares no sistema
        nervoso central, o que impede sua passagem.9 2. <b>Glicoproteína-P</b>: Um transportador de efluxo que atua como
        um guardião seletivo da barreira hematoencefálica, transportando ativamente substâncias xenobióticas, como a
        fexofenadina, para fora do cérebro e de volta ao sangue. A glicoproteína-P está localizada predominantemente na
        superfície luminal das células capilares endoteliais da barreira hematoencefálica, bem como em pericitos,
        astrócitos, neurônios e micróglia dentro do cérebro. Este processo de efluxo ajuda a manter o cérebro protegido
        contra a entrada e acúmulo de compostos potencialmente nocivos.<sup>8</sup>
      </Figure>

      <H2>Fexofenadina versus anti-histamínicos sedativos: a diferença que impacta o sono e o desempenho escolar</H2>
      <p>
        Para entender por que Allegra<sup>®</sup> se destaca, é necessário olhar para os dados de ocupação dos receptores
        de histamina tipo 1 (H1) cerebrais. Estudos com tomografia por emissão de pósitrons (PET) confirmam:{' '}
        <strong>a fexofenadina resulta em ocupação próxima a 0% dos receptores H1 cerebrais</strong>, enquanto a
        desloratadina e a loratadina ocupam cerca de 6% e 14%, respectivamente, e os anti-histamínicos de 1ª geração podem
        chegar a mais de 70% (Figura 2).<sup>3</sup> Essa seletividade periférica confere à fexofenadina{' '}
        <strong>
          eficácia clínica sem evidência de sedação clinicamente relevante ou comprometimento cognitivo nos estudos
          citados.
        </strong>
        <sup>6,7,9</sup>
      </p>
      <Figure
        center
        mt={60}
        src="artigos/id07/figura-2-ocupacao-h1.webp"
        width={677}
        height={561}
        alt="Gráfico de ocupação dos receptores H1 corticais. 1ª geração: clorfeniramina 2 mg 77%, cetotifeno 1 mg 72%, difenidramina 50 mg 45%, difenidramina 30 mg 56%, hidroxizina 25 mg 54%. 2ª geração: bepotastina 10 mg 17%, olopatadina 5 mg 15%, loratadina 10 mg 14%, cetirizina 20 mg 26%, cetirizina 10 mg 13%, epinastina 20 mg 13%, ebastina 10 mg 10%, levocetirizina 5 mg 8%, desloratadina 5 mg 7%, bilastina 20 mg -4%. Allegra 120 mg -0,1%; Allegra 60 mg -8%."
      >
        <b>Figura 2.</b> Estudo de comparação de moléculas com as doses mais comumente usadas para rinite alérgica.
        Adaptado de Ansotegui IJ et al. Curr Med Res Opin. 2024; 40(8):1297-1309.3
      </Figure>
      <p>
        Esses dados ganham ainda mais peso quando analisados em conjunto. Uma meta-análise de 51 estudos com 14.551
        participantes demonstrou que a fexofenadina apresenta taxa de efeitos sedativos comparável ao placebo, com menores
        chances de induzir sedação frente a anti-histamínicos de 1ª e 2ª geração (Figura 3).<sup>10</sup>
      </p>
      <Figure
        center
        mt={70}
        src="artigos/id07/figura-3-efeitos-sedativos.webp"
        width={617}
        height={519}
        alt="Fexofenadina tem menores chances de induzir efeitos sedativos: redução de 73,5% vs. anti-histamínicos de 1ª geração (OR = 0,265; IC 95%: 0,072–0,976; P = 0,046) e de 42,2% vs. anti-histamínicos de 2ª geração (OR = 0,578; IC 95%: 0,369–0,906; P = 0,017)."
      >
        <span style={{ display: 'block', marginTop: 70 }}>
          <b>Figura 3.</b> Redução das chances de efeitos sedativos com fexofenadina frente a anti-histamínicos de 1ª e 2ª
          geração. OR: razão de chances. IC: intervalo de confiança. Adaptado de Huang C-Z et al. BMC Pharmacol Toxicol
          2019;20(1):72.<sup>10</sup>
        </span>
      </Figure>
      <div>
        <p>
          A preservação da função cognitiva e psicomotora também foi confirmada. Em comparação com anti-histamínicos de 1a
          e 2a geração, a fexofenadina pode apresentar um perfil cognitivo mais favorável, avaliado pelos testes:
          <sup>10</sup>
        </p>
        <ul className="art-list art-list--hang">
          <li>
            <strong>Capacidade de processamento de informação</strong>, medida pelo critical flicker fusion test;
          </li>
          <li>
            <strong>Velocidade de resposta psicomotora</strong>, medida pelo tempo de reação de escolha;
          </li>
          <li>
            <strong>Atenção e concentração divididas</strong>, medidas pelo teste de rastreamento compensatório.
          </li>
        </ul>
      </div>
      <p>
        Além do perfil de baixa ocupação de H1 cerebral, a fexofenadina também apresenta dados favoráveis de ação
        periférica. Na periferia, a fexofenadina também age mais rápido e com maior intensidade: início de ação em 1 hora e
        redução de <strong>mais de 80% do eritema em 3 horas</strong>, contra apenas 20% com a desloratadina, que só começa
        a agir em aproximadamente 5 horas, reforçando a{' '}
        <strong>vantagem clínica da fexofenadina, unindo rapidez e potência de ação</strong>.<sup>4</sup>
      </p>

      <H2>Na sala de aula, a diferença é ainda mais importante</H2>
      <p>
        Em crianças, a sedação causada pelos anti-histamínicos de 1ª geração vai muito além do simples “causar sono”. Mesmo
        em doses terapêuticas habituais, esses medicamentos podem comprometer funções cognitivas, memória de trabalho,
        atenção sustentada e aprendizado. A criança chega à escola aparentemente descansada, mas com o sistema nervoso
        central comprometido.<sup>2,12</sup>
      </p>
      <p>
        Allegra<sup>®</sup> (fexofenadina), por sua vez, apresenta{' '}
        <strong>desempenho cognitivo e psicomotor indistinguível do placebo</strong>. Um estudo avaliou o efeito da{' '}
        <strong>fexofenadina</strong> no desempenho escolar em pacientes com rinite alérgica sazonal. Em relação ao
        placebo, a fexofenadina reduziu significativamente a porcentagem de faltas escolares devido à rinite alérgica e
        teve efeito positivo no desempenho escolar em crianças com esta condição (Figura 4).<sup>13</sup>
      </p>
      <Figure
        center
        mt={50}
        src="artigos/id07/figura-4-desempenho-escolar.webp"
        width={689}
        height={285}
        alt="Gráficos do basal à semana 2: com fexofenadina 60 mg duas vezes ao dia, a porcentagem de tempo de aula perdido por causa de alergias caiu de cerca de 6% para 1–2%, e a perda de desempenho em sala de aula caiu de cerca de 41% para 23%, contra quedas menores com placebo (p < 0,05 ajustado para covariáveis)."
      >
        <b>Figura 4.</b> Efeito da fexofenadina na porcentagem de tempo perdido de aula por causa de alergias e no
        desempenho escolar de pacientes com rinite alérgica, Adaptado de Ann Tanner L et al. The Am Journ of Manager Care.
        1999; 5(4):235-247.<sup>13</sup>
      </Figure>

      <H2>Segurança global: previsibilidade clínica além da neutralidade central</H2>
      <p>
        O perfil de{' '}
        <strong>
          Allegra<sup>®</sup> também se destaca pela segurança global favorável
        </strong>
        , com dados consistentes em diferentes populações, incluindo crianças.<sup>4,14,15</sup>
      </p>
      <p>
        No plano farmacocinético, a fexofenadina sofre <strong>metabolização hepática mínima</strong> e é eliminada
        majoritariamente de forma inalterada. Isso reduz o potencial de interações medicamentosas mediadas por CYP450, um
        aspecto relevante em pediatria, onde o uso concomitante de outras medicações é frequente e a previsibilidade da
        prescrição é essencial.<sup>14</sup>
      </p>
      <p>
        No eixo cardiovascular, a segurança da fexofenadina foi extensamente investigada. Os dados são robustos:{' '}
        <strong>nenhum aumento significativo do QTc</strong> em dose única de até 800 mg, em doses repetidas de até 690 mg
        duas vezes ao dia por 28 dias, e mesmo em estudos de maior duração com doses supraterapêuticas. Também não houve
        alteração do QTc quando associada a eritromicina ou cetoconazol, reforçando seu perfil cardiovascular favorável.
        <sup>15</sup>
      </p>

      <div>
        <H2>Na prática clínica: como orientar a escolha em crianças com rinite alérgica?</H2>
        <ol className="art-list--hang" style={{ marginTop: 4 }}>
          <li>
            <strong>Avalie mais do que os sintomas nasais.</strong> Investigue sono, atenção, comportamento diurno,
            desempenho escolar e impacto na rotina familiar.<sup>1,2</sup>
          </li>
          <li>
            <strong>Evite confundir sedação com sono reparador</strong>. Anti-histamínicos de 1ª geração podem causar
            sonolência, mas também podem comprometer arquitetura do sono, cognição e desempenho psicomotor.
            <sup>3,5–7,18</sup>
          </li>
          <li>
            <strong>Priorize anti-histamínicos de 2ª geração com baixo potencial sedativo</strong>. A fexofenadina
            apresenta baixa penetração no sistema nervoso central, baixa ocupação de receptores H1 cerebrais e perfil
            cognitivo favorável nos estudos citados.<sup>3,6,7,9,10,12</sup>
          </li>
          <li>
            <strong>Escolha conforme idade, indicação e bula</strong>. Allegra<sup>®</sup> pode ser utilizado a partir de 6
            meses para urticária e a partir de 2 anos para rinite alérgica, conforme bula.<sup>16</sup>
          </li>
        </ol>
      </div>

      <H2>
        Allegra<sup>®</sup> reúne ampla experiência clínica com fexofenadina, com mais de 25 anos de uso documentado na
        literatura.<sup>16,17</sup>
      </H2>
      <p>
        Disponível em múltiplas apresentações e posologias,{' '}
        <strong>
          Allegra<sup>®</sup>
        </strong>{' '}
        oferece tratamento eficaz para rinite alérgica e urticária, podendo ser utilizada com segurança desde os{' '}
        <strong>6 meses de idade para urticária</strong> e a partir dos <strong>2 anos para rinite alérgica.</strong>
        <sup>16,17</sup> Diferencia-se por preservar o desempenho cognitivo e psicomotor, garantindo alívio rápido e seguro
        em todas as fases da vida.<sup>1,2,5</sup>
      </p>
      <Figure
        center
        mt={40}
        src="artigos/id07/allegra-pediatrico.webp"
        width={708}
        height={372}
        alt="Allegra Pediátrico: não tem efeito sedativo; não impacta o desempenho escolar e a qualidade de vida do paciente. Sem impacto cognitivo: fexofenadina reduz significativamente a porcentagem de faltas escolares e a queda do desempenho escolar devido à rinite alérgica. Cloridrato de fexofenadina 6 mg/mL, ação em 12 horas; também na versão com copinho."
      />
      <p style={{ marginTop: 110 }}>
        <strong>
          ALLEGRA<sup>®</sup>
        </strong>{' '}
        (cloridrato de fexofenadina). <strong>Indicações</strong>: é um anti-histamínico destinado ao tratamento das
        manifestações alérgicas, tais como sintomas de rinite alérgica (incluindo espirros, obstrução nasal, prurido,
        coriza, conjuntivite alérgica) e urticária (erupção avermelhada e pruriginosa na pele). MS 1.8620.0010.{' '}
        <strong>O USO DO MEDICAMENTO PODE TRAZER ALGUNS RISCOS.</strong> Leia atentamente a bula.{' '}
        <strong>SE PERSISTIREM OS SINTOMAS, O MÉDICO DEVERÁ SER CONSULTADO.</strong>
      </p>

      <References
        rule={false}
        wideMarker
        title="Referências:"
        titleGap={30}
        plainTitle
        items={[
          'Jáuregui I, Mullol J, Dávila I, et al. Allergic rhinitis and school performance. J Investig Allergol Clin Immunol 2009;19 Suppl 1:32–9.',
          'Blaiss MS, Allergic Rhinitis in Schoolchildren Consensus Group. Allergic rhinitis and impairment issues in schoolchildren: a consensus report. Curr Med Res Opin 2004;20(12):1937–52.',
          'Ansotegui IJ, Bousquet J, Canonica GW, et al. Why fexofenadine is considered as a truly non-sedating antihistamine with no brain penetration: a systematic review. Curr Med Res Opin 2024;40(8):1297–309.',
          'Meltzer EO, Gillman SA. Efficacy of fexofenadine versus desloratadine in suppressing histamine-induced wheal and flare. Allergy Asthma Proc 2007;28(1):67–73.',
          'Bachert C. Therapeutic points of intervention and clinical implications: role of desloratadine. Allergy 2002;57 Suppl 75:13–8.',
          'Church DS, Church MK. Pharmacology of antihistamines. World Allergy Organ J 2011;4(3 Suppl):S22–7.',
          'Montoro J, Sastre J, Bartra J, et al. Effect of H1 antihistamines upon the central nervous system. J Investig Allergol Clin Immunol 2006;16 Suppl 1:24–8.',
          <>
            Chai AB, Callaghan R, Gelissen IC. Regulation of P-Glycoprotein in the Brain. Int J Mol Sci [Internet]
            2022;23(23). Available from:{' '}
            <Ext href="http://dx.doi.org/10.3390/ijms232314667">http://dx.doi.org/10.3390/ijms232314667</Ext>
          </>,
          'Smith SM, Gums JG. Fexofenadine: biochemical, pharmacokinetic and pharmacodynamic properties and its unique role in allergic disorders. Expert Opin Drug Metab Toxicol 2009;5(7):813–22.',
          'Huang C-Z, Jiang Z-H, Wang J, Luo Y, Peng H. Antihistamine effects and safety of fexofenadine: a systematic review and Meta-analysis of randomized controlled trials. BMC Pharmacol Toxicol 2019;20(1):72.',
          <>
            Nakamura T, Hiraoka K, Harada R, et al. Brain histamine H1 receptor occupancy after oral administration of
            desloratadine and loratadine. Pharmacology Research &amp; Perspectives [Internet] 2019 [cited 2024 Aug
            14];7(4). Available from:{' '}
            <Ext href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6624455/">
              https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6624455/
            </Ext>
          </>,
          'Meltzer EO, Rosario NA, Van Bever H, Lucio L. Fexofenadine: review of safety, efficacy and unmet needs in children with allergic rhinitis. Allergy Asthma Clin Immunol 2021;17(1):113.',
          'Tanner LA, Reilly M, Meltzer EO, Bradford JE, Mason J. Effect of Fexofenadine HCl on Quality of Life and Work, Classroom, and Daily Activity Impairment in Patients with Seasonal Allergic Rhinitis. The American Journal of Managed Care 1999;5.',
          <>
            Batool M, Zamir A, Alqahtani F, Ahmad T, Saeed H, Rasool MF. Clinical Pharmacokinetics of Fexofenadine: A
            Systematic Review. Pharmaceutics [Internet] 2024;16(12). Available from:{' '}
            <Ext href="http://dx.doi.org/10.3390/pharmaceutics16121619">
              http://dx.doi.org/10.3390/pharmaceutics16121619
            </Ext>
          </>,
          'Pratt C, Brown AM, Rampe D, et al. Cardiovascular safety of fexofenadine HCl. Clin Exp Allergy 1999;29 Suppl 3:212–6.',
          <>
            Bula Allegra<sup>®</sup>
          </>,
          'Naclerio RM, Ansotegui IJ, Canonica GW, Rouadi P, Zhang L, Murrieta-Aguttes M. Twenty-five years: The fexofenadine clinical experience. World Allergy Organ J 2024;17(9):100950.',
          'Sociedade Brasileira de Pediatria (SBP). Documento Científico nº 205, de 13 de maio de 2025.',
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2602589-v6.0-06/2026',
  pageCode: 'MAT-BR-2404503',
};

export default article;
