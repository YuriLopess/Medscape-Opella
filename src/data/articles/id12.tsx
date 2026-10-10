/* ID12 — Bacillus clausii e prevenção da DiAA (Enterogermina). Texto transcrito do PDF enviado. */
import type { ArticleContent } from '../../lib/types';
import { Figure, References } from '../../components/article/parts';
import { img } from '../../lib/assets';

const article: ArticleContent = {
  layout: '2026',
  bodyClass: 'art-compact',
  title: 'Bacillus clausii (O/C, N/R, SIN e T) e prevenção da diarreia associada a antibióticos (DiAA)',
  heading: 'BACILLUS CLAUSII (O/C, N/R, SIN e T), E PREVENÇÃO DA DIARREIA ASSOCIADA A ANTIBIÓTICOS (DiAA): evidências de uma revisão sistemática atualizada',
  description:
    'Uma revisão sistemática atualizada reuniu evidências sobre o uso de Bacillus clausii O/C, N/R, SIN e T na prevenção da diarreia associada a antibióticos (DiAA).',
  tags: ['Artigo', 'Bem-estar digestivo'],
  lead: 'Uma revisão sistemática atualizada reuniu evidências sobre o uso de Bacillus clausii O/C, N/R, SIN e T na prevenção da diarreia associada a antibióticos (DiAA).',
  hero: {
    src: 'artigos/id12/hero.webp',
    width: 504,
    height: 382,
    alt: 'Figura 1 do artigo: fatores influenciadores da microbiota intestinal',
  },
  body: (
    <>
      <div className="art-author art-author--stack">
        <p className="art-sub-strong art-sub-lg">Sobre o autor:</p>
        <img
          src={img('artigos/id12/autor-bruno-paes-barreto.webp')}
          alt="Dr. Bruno A. Paes Barreto"
          width={257}
          height={308}
          loading="lazy"
        />
        <p>
          Dr. Bruno A. Paes Barreto | CRM-SP: 68.755 | RQE: 6.742 (Alergia e imunologia)
          <br />
          Pediatra, alergista e imunologista. Doutor em Ciências pela Universidade Federal de São Paulo (Unifesp).
          <br />
          Professor Adjunto de Pediatria da Universidade do Estado do Pará (Uepa).
          <br />
          Coordenador do Serviço de Alergia do Centro Universitário do Estado do Pará (Cesupa).
          <br />
          Coordenador do Departamento de Alergia na Infância da Associação Brasileira de Alergia e Imunologia (Asbai).
          <br />
          Membro do Departamento de Microbioma da Sociedade Latino-Americana de Alergia, Asma e Imunologia (SLaai).
          <br />
          Membro do Departamento de Alergia e Imunologia da Sociedade Brasileira de Pediatria (SBP).
        </p>
      </div>

      <div>
        <h2 className="art-h2">O estudo:</h2>
        <p>
          Avanços científicos recentes evidenciaram o papel essencial da microbiota intestinal na saúde humana.
          <sup>1</sup> Antes das técnicas moleculares, pouco se sabia sobre esses microrganismos não patogênicos, já que a
          maioria não é cultivável.<sup>1</sup> Estudos com animais germ-free demonstraram que, embora a microbiota não seja
          essencial para a sobrevivência, ela é crucial para o desenvolvimento e o funcionamento adequados do organismo.
          <sup>1</sup> A maior comunidade microbiana do corpo humano reside no intestino grosso, favorecida por condições
          ideais de crescimento.<sup>1</sup> O uso crescente de antibióticos, embora revolucionário, pode levar a alterações
          profundas na composição da microbiota – a chamada disbiose – e tem impactos negativos de curto e de longo prazo.
          <sup>1</sup> (Figura 1) Essa disbiose tem sido associada a doenças como asma, alergias, obesidade, infecções
          intestinais e câncer colorretal.<sup>1</sup>
        </p>
      </div>
      <Figure
        src="artigos/id12/figura-1-fatores-microbiota.webp"
        width={1057}
        height={618}
        alt="Figura 1. Fatores influenciadores da microbiota intestinal: tipo de parto, amamentação, dieta, exercícios, doenças, envelhecimento, medicamentos/antibióticos e localização geográfica. Fonte: elaborada pelo próprio autor. O/C: Off-Category (fora de categoria ou uso não rotineiro/complementar); SIN: sem indicação na bula (ou sem indicação formal aprovada para determinado uso); N/R: não recomendado; T: terapêutico (uso com finalidade terapêutica)."
      />
      <p>
        Além disso, o uso indiscriminado de antibióticos contribui para a resistência bacteriana e, sobretudo, para o
        desenvolvimento da diarreia associada ao uso de antibióticos (DiAA), a qual pode surgir desde a primeira dose até
        dois meses após o término do tratamento e afetar de 5% a 35% dos pacientes; a bactéria Clostridioides difficile é
        responsável por até 25% dos casos graves.<sup>1,2</sup> Embora probióticos como Lactobacillus e Bifidobacterium
        sejam amplamente utilizados para a prevenção da DiAA, é crescente o interesse pelo Bacillus clausii O/C, N/R, SIN e
        T, uma cepa formadora de esporos, resistente à acidez e aos sais biliares.<sup>1,2</sup> Este probiótico produz
        riboflavina, estimula a mucina, reduz a permeabilidade intestinal e tem ação antimicrobiana e imunomoduladora.{' '}
        <sup>2</sup> Tais características tornam o B. clausii uma alternativa promissora aos probióticos convencionais.
        <sup>1,2</sup>
      </p>
      <div>
        <h2 className="art-h2">ARTIGO COMENTADO</h2>
        <p>
          Bacillus clausii e prevenção da diarreia associada a antibióticos (DiAA): evidências de uma revisão sistemática
          atualizada
          <br />
          Abreu AT, et al. Effectiveness of Bacillus clausii (O/C, N/R, SIN, T) in the Prevention of Antibiotic-Associated
          Diarrhea and Gastrointestinal Symptoms: A Systematic Review. Antibiotics. 2025;14(5):439.<sup>2</sup>
        </p>
      </div>
      <div>
        <h2 className="art-h2">Objetivo</h2>
        <p>
          Diante do uso crescente de antibióticos e dos seus efeitos adversos gastrointestinais, esta revisão sistemática
          avaliou o papel do Bacillus clausii (cepas O/C, N/R, SIN, T) na prevenção e tratamento da DiAA.<sup>2</sup> Os
          resultados reforçam seu potencial como estratégia eficaz na manutenção da saúde intestinal e no apoio à
          continuidade segura da terapêutica antibiótica.<sup>2</sup>
        </p>
      </div>
      <div>
        <h2 className="art-h2">Método</h2>
        <p>
          Esta revisão sistemática seguiu o PRISMA 2020 e utilizou o modelo PICO para investigar o uso do Bacillus clausii
          (cepas O/C, N/R, SIN e T) na prevenção da DiAA em todas as faixas etárias. Foram avaliadas doses de 4×10
          <sup>9</sup> UFC (em crianças) e 6×10<sup>9</sup> UFC (em adultos), em comparação a placebo, outros probióticos
          ou nenhuma intervenção. Os desfechos incluíram diarreia, dor abdominal, náuseas e vômitos.<sup>2</sup> A busca
          abrangeu bases eletrônicas [MEDLINE (PubMed), Embase, Cochrane Central, LILACS, SciELO e Google Scholar] e
          referências manuais, que incluíram estudos clínicos e observacionais. Os termos de busca foram definidos com base
          no modelo PICO, combinando-se vocabulário controlado (MeSH e DeCS) e palavras-chave livres, como “Bacillus
          clausii” e “Enterogermina”.<sup>2</sup>
        </p>
      </div>
      <div>
        <h2 className="art-h2">Resultados</h2>
        <p>
          A busca, realizada em seis bases de dados eletrônicas, resultou em 62 referências. O diagrama de fluxo PRISMA
          (Figura 2) resume o processo de seleção e indica os estudos incluídos e excluídos em cada etapa.<sup>2</sup>
        </p>
      </div>
      <Figure
        center
        src="artigos/id12/figura-2-prisma.webp"
        width={752}
        height={609}
        alt="Figura 2. Diagrama de fluxo PRISMA 2020. Identificação: 60 registros identificados em bases de dados e 2 com uso de outros métodos. Triagem: 51 registros após remoção de duplicatas; 51 triados por título e resumo, com 36 excluídos; 15 avaliados para elegibilidade, com 11 excluídos por intervenção errada. Inclusão: 3 estudos incluídos na revisão. Adaptada de: Abreu AT, et al. Antibiotics. 2025;14(5):439."
      />
      <div>
        <p>As tabelas 1 e 2 resumem os principais resultados encontrados.</p>
        <Figure
          center
          src="artigos/id12/tabela-1-adultos.webp"
          width={910}
          height={572}
          alt="Tabela 1. Estudos em adultos. Plomer et al. (2020): 130 adultos com H. pylori; B. clausii (6 × 10⁹ UFC/dia); redução da diarreia (29,2% vs. 47,7%; p = 0,030), mais dias sem diarreia, menor dor epigástrica; bem tolerado, sem eventos adversos graves. Estudo italiano (2004): 120 adultos com H. pylori; B. clausii (6 × 10⁹ UFC/dia); redução de náuseas (RR: 0,50) e diarreia (RR: 0,33), efeito antiemético mantido; bem tolerado, sem eventos adversos. Elaborada com base em: Abreu AT, et al. Antibiotics. 2025;14(5):439."
        />
        <Figure
          center
          mt={0}
          src="artigos/id12/tabela-2-criancas.webp"
          width={860}
          height={545}
          alt="Tabela 2. Estudos em crianças. Análise combinada de 3 ECRs com 435 crianças com infecções diversas; B. clausii (4 × 10⁹ UFC/dia); grupo intervenção 218 pacientes, grupo controle 217 pacientes; incidência de DiAA de 1,8% (intervenção) vs. 6,5% (controle), p = 0,017; conclusão: eficácia reforçada na prevenção de DiAA em crianças. ECR: estudo clínico randomizado. Elaborada com base em: Abreu AT, et al. Antibiotics. 2025;14(5):439."
        />
      </div>
      <div style={{ marginTop: 6 }}>
        <h2 className="art-h2">Discussão</h2>
        <p>
          A administração de Bacillus clausii (cepas O/C, N/R, SIN e T) demonstrou-se eficaz na prevenção da diarreia
          associada ao uso de antibióticos (DiAA), com redução significativa de sintomas como diarreia, náusea e dor
          epigástrica, especialmente na primeira semana de tratamento.<sup>2</sup> Seus efeitos benéficos são atribuídos a
          imunomodulação, produção de antimicrobianos e fortalecimento da barreira intestinal; além disso, apresenta alta
          tolerância a antibióticos e baixo risco de transferência de resistência.<sup>2</sup> Os estudos reforçam seu papel
          como adjuvante terapêutico e na melhora da adesão ao tratamento.<sup>2</sup> As doses aplicadas estão em
          conformidade com recomendações internacionais, mas ainda não há consenso sobre a posologia ideal.<sup>2</sup> A
          maioria dos estudos foi conduzida na Europa, o que pode limitar a generalização dos resultados a outras
          populações.<sup>2</sup>
        </p>
      </div>
      <div>
        <h2 className="art-h2">Mensagens finais</h2>
        <ul className="art-bullets">
          <li>
            B. clausii (O/C, N/R, SIN e T) reduz significativamente incidência de DiAA em adultos e crianças.<sup>2</sup>
          </li>
          <li>
            Apresenta mecanismos de ação múltiplos e é seguro; é baixo o risco de contribuir para resistência
            antimicrobiana.
          </li>
          <li>
            Pode melhorar a adesão ao tratamento antibiótico, especialmente em esquemas de erradicação do H. pylori.
            <sup>2</sup>
          </li>
        </ul>
      </div>

      <References
        rule={false}
        title="Referências"
        className="art-refs--h2-title art-refs--tight"
        items={[
          'Ramirez J, Guarner F, Bustos-Fernandez L, Maruy A, Sdepanian VL, Cohen H. Antibiotics as major disruptors of gut microbiota. Front Cell Infect Microbiol. 2020;10:572912.',
          'Abreu AT, Frías RV, Marzet CB, Stefanolo JP, Mejía AC, Fernández LB, et al. Effectiveness of bacillus clausii (O/C, N/R, SIN, T) in the prevention of antibiotic-associated diarrhea and gastrointestinal symptoms: a systematic review. Antibiotics. 2025;14(5):439.',
        ]}
      />
      <p className="art-mat art-mat--lg art-mat--stack">
        MAT-BR-2503656 AGOSTO/2025
        <br />
        ENTEROGERMINA<sup>®</sup> - NÃO CONTÉM GLÚTEN.
      </p>
    </>
  ),
  pageCode: 'MAT-BR-2404503',
};

export default article;
