/* ID05 — O que acontece nas primeiras 24 horas após a vacina (Novalgina). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Figure, H2, References } from '../../components/article/parts';

const article: ArticleContent = {
  layout: '2026',
  title: 'O que acontece nas primeiras 24 horas após a vacina. E o que fazer.',
  heading: 'O que acontece nas primeiras 24 horas após a vacina. E o que fazer.',
  description:
    'Febre e dor após a vacina são previsíveis. Quando tratar, qual antitérmico escolher para o lactente e o que os dados mostram sobre eficácia e duração.',
  tags: ['Novo.', 'Artigo', 'Research', 'Não promocional'],
  lead: 'Febre e dor após a vacina são previsíveis — mas a decisão terapêutica que vem depois, nem sempre. Saiba quando tratar, qual antitérmico escolher para o lactente e o que os dados mostram sobre eficácia e duração nas primeiras 24 horas depois da vacina.',
  hero: { src: 'artigos/id05/hero.webp', width: 505, height: 265, alt: 'Médico conversando com uma mãe que segura o bebê no colo' },
  body: (
    <>
      <p>
        É comum que em consultas pediátricas sejam aplicadas mais de uma vacina no paciente e que tudo ocorra bem. Passada
        algumas horas também é comum a família entrar em contato, preocupada, porque o bebê está com febre e chorando
        muito.<sup>1,2</sup> Qualquer pediatra sabe exatamente o que está acontecendo – o sistema imune do bebê está
        respondendo exatamente como deveria. A questão é: A família foi orientada sobre o que esperar e como tratar?
        <sup>1,2</sup>
      </p>

      <H2>O que o sistema imune faz após a vacina</H2>
      <p>
        Quando um antígeno vacinal é introduzido, o corpo responde da mesma forma que responderia a qualquer estímulo
        imunogênico: produz citocinas inflamatórias, libera prostaglandinas e eleva a temperatura corporal. A dor no local
        de aplicação segue o mesmo mecanismo: inflamação local mediada por prostaglandinas, com início tipicamente nas
        primeiras horas após a dose.<sup>1</sup>
      </p>
      <Figure
        center
        mt={98}
        src="artigos/id05/figura-1-resposta-a-vacina.webp"
        width={777}
        height={618}
        alt="Ilustração da resposta à vacina: após a injeção no tecido muscular esquelético, antígenos e potenciadores imunes ativam o recrutamento celular, fatores solúveis e vasodilatadores, causando edema, dor e vermelhidão; a via neural rápida (nociceptor) e a via humoral lenta (corrente sanguínea, fígado e proteínas de fase aguda) levam ao cérebro sintomas semelhantes à gripe e dor."
      >
        <b>Figura 1:</b> Ao entrar em contato com o tecido, os antígenos e adjuvantes vacinais são reconhecidos pelos
        receptores envolvidos no reconhecimento de patógenos presentes nas células imunes residentes. Mastócitos, monócitos
        e macrófagos são ativados em minutos e liberam citocinas pró-inflamatórias, quimiocinas, efetores do complemento e
        vasodilatadores como bradicinina, que simultaneamente recrutam células do sangue para o sítio de injeção e produzem
        os primeiros sinais locais visíveis: vermelhidão e edema. As células recrutadas — neutrófilos, monócitos e
        linfócitos T — amplificam a resposta e contribuem diretamente para a dor: ao liberarem prostaglandinas, citocinas e
        ATP, sensibilizam os receptores de dor locais, que transmitem o estímulo doloroso ao sistema nervoso central. Parte
        dos mediadores inflamatórios produzidos localmente extravasa para a circulação sistêmica. No sistema nervoso
        central, esses fatores circulantes estimulam a síntese de prostaglandina E2 (PGE2) intracerebral. É essa PGE2
        central que altera a regulação da temperatura e desencadeia os demais sintomas sistêmicos, como a febre. Adaptado
        de: Hervé C et al , NPJ Vaccines. 2019;4:39.<sup>2</sup>
      </Figure>
      <p>
        Febre e dor local são manifestações comuns da resposta inflamatória após a vacinação, podendo ser mais ou menos
        frequentes a depender da vacina, da dose e de características individuais da criança.<sup>1,2</sup> Apesar de
        serem reações esperadas, o desconforto da criança gera preocupação nas famílias, que devem ser orientadas sobre
        como manejar os sintomas adequadamente.<sup>1</sup>
      </p>

      <H2>Eventos adversos das vacinas: qual a frequência na prática?</H2>
      <Figure
        center
        mt={78}
        src="artigos/id05/eventos-adversos.webp"
        width={743}
        height={551}
        alt="Gráfico de eventos adversos por mil doses de vacina aplicadas em população pediátrica e percentual entre todos os eventos adversos: edema local, 12,2/1000 (19,6%); dor local, 10,3/1000 (16,5%); febre de 39 a 40,5 °C, 4,4/1000 (9,8%); vômitos e diarreia, 0,9/1000 (2%)."
      >
        Adaptado de: Carrasco-Garrido P, Clin Drug Investig 2004;24(8):457–63.<sup>3</sup>
      </Figure>
      <p>
        A febre pós-vacina é predominantemente baixa a moderada, ocorre principalmente na 1ª dose e nas primeiras 24h após
        a aplicação. Quando persiste além de 24h ou se instala tardiamente, deve-se investigar infecção intercorrente.
        <sup>1</sup>
      </p>

      <H2>Quando observar. Quando tratar.</H2>
      <p>
        A Sociedade Brasileira de Pediatria (SBP) é clara na distinção entre conduta profilática e conduta terapêutica
        pós-vacinação.<sup>4</sup> E essa distinção importa clinicamente.
      </p>
      <Figure
        center
        mt={70}
        src="artigos/id05/quando-tratar.webp"
        width={634}
        height={498}
        alt="Não se recomenda o uso rotineiro de antitérmico antes ou no momento da vacinação — há risco de redução da resposta imune vacinal. Indica-se o uso de antitérmicos e/ou analgésicos quando os sintomas se instalam: febre, dor local, irritabilidade."
      />

      <H2>Na hora de escolher o antitérmico, o que a evidência mostra?</H2>
      <p>
        Existe um viés clínico bastante comum: reservar a dipirona para as febres mais altas, recorrendo a outros
        antitérmicos para febres leves. Esse raciocínio parece prudente, mas não encontra respaldo nos dados.
        <br />O guia “Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses” da SBP (2025) é
        explícito:{' '}
        <strong>
          a dipirona está indicada para dores e febres de todas as intensidades: leves, moderadas e altas.
        </strong>
        <sup>4</sup>
      </p>
      <Figure
        center
        mt={105}
        src="artigos/id05/estudo-628-criancas.webp"
        width={777}
        height={618}
        alt="O que um estudo com 628 crianças mostrou sobre o antitérmico que você escolhe. Estudo clínico multinacional, randomizado, duplo-cego, conduzido em centros do Brasil, Argentina, Chile e México, comparou dipirona, paracetamol e ibuprofeno em crianças febris de 6 meses a 6 anos. Normalização da temperatura (até 37,5 °C): dipirona 82% vs. ibuprofeno 78% vs. paracetamol 68% (p = 0,004). Às 4–6 horas após a dose, a temperatura média no grupo dipirona foi significativamente menor do que nos outros dois grupos. Tolerabilidade: perfis comparáveis entre os três fármacos. Tradução clínica: às 4–6 horas, enquanto o efeito do paracetamol e do ibuprofeno já havia diminuído, a dipirona manteve maior redução de temperatura — o que pode representar menos reintervenções e menos noites sem dormir para a família."
      />

      <H2 mt={74}>Por que a duração do efeito importa especialmente no cenário pós-vacina</H2>
      <p>
        A febre pós-vacinação tem uma característica importante: ela tende a aparecer e se concentrar nas primeiras 24
        horas. Isso cria uma janela clínica específica, diferente da febre de origem infecciosa que pode oscilar por vários
        dias.<sup>1</sup>
      </p>
      <p>
        Em um cenário em que a família vai administrar o antitérmico à noite antes de dormir, a pergunta prática não é
        apenas: Vai baixar a febre? É: Vai manter a febre controlada por quanto tempo?
      </p>
      <div>
        <p>
          Na prática, um antitérmico com maior duração de efeito tende a se traduzir em: <sup>4,5</sup>
        </p>
        <ul className="art-list">
          <li>Menos doses nas primeiras 24h;</li>
          <li>Menor chance de volta da febre durante a noite;</li>
          <li>Menos motivos para a família entrar em contato com o médico</li>
          <li>Menor risco de uso alternado ou de doses extras sem orientação.</li>
        </ul>
      </div>
      <p>
        A prática de alternar antitérmicos não é recomendada pela falta de evidência de benefício adicional sobre a
        monoterapia e pelo risco real de erros de dosagem e risco de intoxicação.<sup>4</sup>
      </p>

      <H2>Segurança em lactentes: o que a SBP diz</H2>
      <p>
        A dipirona pode ser utilizada em crianças a partir de 3 meses de idade (ou com peso ≥5 kg). A dose recomendada
        deve ser baseada no peso e na idade da criança, conforme a bula e o início de ação é de 30 a 60 minutos com duração
        de 4 a 6 horas.<sup>4,6</sup>
      </p>
      <p>
        Uma nota prática que merece atenção na prescrição para lactentes pequenos: na apresentação em gotas, cada gota
        contém 25 mg de dipirona.<sup>4,6</sup> O uso tradicional de “1 gota por quilo” pode levar à superdosagem
        dependendo do peso e da faixa etária da criança.<sup>4</sup>
      </p>
      <p>A orientação aos cuidadores deve ser com a dose calculada individualmente em mL, não em fórmulas de atalho.</p>
      <p className="art-sub-strong" style={{ marginTop: 67 }}>
        Posicionamento da SBP: <sup>4</sup>
      </p>
      <Figure
        left
        src="artigos/id05/posicionamento-sbp.webp"
        width={685}
        height={622}
        alt="Posicionamento da SBP: dipirona indicada para todos os níveis de febre (leve, moderada, alta) e todos os níveis de dor (leve, moderada, intensa); uso profilático antes ou no momento da vacinação não é recomendado; uso de antitérmico indicado quando os sintomas se instalam após a vacinação; uso alternado de antitérmicos não tem evidência suficiente de benefício adicional e aumenta o risco de erros de dosagem."
      />

      <H2>Antes do bebê sair do consultório</H2>
      <p>
        A consulta de vacinação é uma das mais frequentes na rotina do pediatra — e uma das mais poderosas janelas de
        orientação preventiva.{' '}
        <strong>
          A família que sai sabendo o que pode acontecer, quando se preocupar e o que fazer está melhor preparada para
          atravessar a noite sem pânico.
        </strong>
      </p>
      <p>
        Orientar sobre os eventos adversos esperados, sobre quando tratar e com o quê , com base em evidências e nas
        diretrizes da SBP, é tão parte do ato vacinal quanto a técnica de aplicação.<sup>1</sup>
      </p>
      <p>
        Escolher o antitérmico certo para aquele lactente, considerando o que os dados mostram sobre eficácia e duração, é
        uma decisão clínica que deve ser baseada em evidência e não um hábito.<sup>4,5</sup>
      </p>
      <p>
        <strong>
          Novalgina<sup>®</sup> Infantil
        </strong>{' '}
        está disponível nas apresentações <strong>solução oral, gotas e supositório</strong>, indicada a partir de 3 meses
        de idade ou peso ≥ 5 kg, para <strong>febre e dor de qualquer intensidade</strong>, com início de ação em 30 a 60
        minutos e duração de efeito de 4 a 6 horas.<sup>6</sup>
      </p>
      <div>
        <p className="art-sub-strong">
          Portfólio de Novalgina<sup>®</sup> Infantil
        </p>
        <Figure
          left
          src="artigos/id05/portfolio-novalgina-infantil.webp"
          width={777}
          height={403}
          alt="Embalagens de Novalgina Infantil: gotas, solução oral sabor framboesa e supositório."
        />
      </div>
      <p>
        Tabela de posologia
        <br />
        <strong>
          Novalgina<sup>®</sup> Infantil Solução oral
        </strong>
      </p>
      <Figure
        center
        mt={50}
        src="artigos/id05/posologia-solucao-oral.webp"
        width={761}
        height={603}
        alt="Posologia de Novalgina Infantil solução oral (dose única; dose máxima diária): 5 a 8 kg (3 a 11 meses), 1,25 a 2,5 mL; 10 mL (4 tomadas de 2,5 mL). 9 a 15 kg (1 a 3 anos), 2,5 a 5 mL; 20 mL (4 x 5 mL). 16 a 23 kg (4 a 6 anos), 3,75 a 7,5 mL; 30 mL (4 x 7,5 mL). 24 a 30 kg (7 a 9 anos), 5 a 10 mL; 40 mL (4 x 10 mL). 31 a 45 kg (10 a 12 anos), 7,5 a 15 mL; 60 mL (4 x 15 mL). 46 a 53 kg (13 a 14 anos), 8,75 a 17,5 mL; 70 mL (4 x 17,5 mL)."
      >
        Adaptado de: Bula de Novalgina<sup>6</sup>
      </Figure>
      <div>
        <p className="art-sub-strong">
          Novalgina<sup>®</sup> Infantil Gotas
        </p>
        <Figure
          center
          src="artigos/id05/posologia-gotas.webp"
          width={763}
          height={618}
          alt="Posologia de Novalgina Infantil gotas (dose única; dose máxima diária): 5 a 8 kg (3 a 11 meses), 2 a 5 gotas; 20 gotas (4 tomadas de 5). 9 a 15 kg (1 a 3 anos), 3 a 10 gotas; 40 (4 x 10). 16 a 23 kg (4 a 6 anos), 5 a 15 gotas; 60 (4 x 15). 24 a 30 kg (7 a 9 anos), 8 a 20 gotas; 80 (4 x 20). 31 a 45 kg (10 a 12 anos), 10 a 30 gotas; 120 (4 x 30). 46 a 53 kg (13 a 14 anos), 15 a 35 gotas; 140 (4 x 35)."
        >
          Adaptado de: Bula de Novalgina.<sup>6</sup>
        </Figure>
      </div>
      <Figure
        center
        src="artigos/id05/posologia-supositorio.webp"
        width={777}
        height={86}
        alt="Novalgina supositório 300 mg: crianças de 4 a 14 anos (acima de 16 kg), 1 supositório até 4 vezes ao dia."
      />

      <References
        rule={false}
        wideMarker
        spaced
        titleGap={40}
        items={[
          'Sociedade Brasileira de Pediatria. Departamento Científico de Imunizações. Eventos Supostamente Atribuíveis à Vacinação e Imunização (ESAVI): O papel do pediatra na orientação das famílias. Documento Científico no 77. Rio de Janeiro: SBP; 2023.',
          'Hervé C, Laupèze B, Del Giudice G, Didierlaurent AM, Tavares Da Silva F. The how’s and what’s of vaccine reactogenicity. NPJ Vaccines 2019;4(1):39.',
          'Carrasco-Garrido P, Gallardo-Pino C, Jiménez-García R, Tapias MA, de Miguel AG. Incidence of adverse reactions to vaccines in a paediatric population. Clin Drug Investig 2004;24(8):457–63.',
          'Sociedade Brasileira de Pediatria. Departamentos Científicos de Pediatria e Ambulatorial e Infectologia. Abordagem da Febre Aguda em Pediatria e Reflexões sobre a febre nas arboviroses. Documento Científico nº 206. Rio de Janeiro: SBP; 2025.',
          'Wong A, Sibbald A, Ferrero F, et al. Antipyretic effects of dipyrone versus ibuprofen versus acetaminophen in children: results of a multinational, randomized, modified double-blind study. Clin Pediatr (Phila) 2001;40(6):313–24.',
          'Bula de Novalgina',
        ]}
      />
    </>
  ),
  mat: 'MAT-BR-2602602-v4.0-06/2026',
  pageCode: 'MAT-BR-2404503',
};

export default article;
