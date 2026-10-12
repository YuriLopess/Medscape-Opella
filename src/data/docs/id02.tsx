/* ID02 — Menopausa e saúde óssea, no formato da página de documento (Os-Cal · "Saúde óssea feminina").
   Mesmo texto do artigo em data/articles/id02.tsx (transcrito do PDF enviado). */
import { img } from '../../lib/assets';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const content = (
  <>
    <p className="doc-lead">
      A osteoporose é a doença mais prevalente durante a menopausa. Entenda o porquê dessa relação, e como prevenir a
      osteoporose em mulheres na menopausa!
    </p>

    <h2>Introdução</h2>
    <p>
      Com o aumento da expectativa de vida, espera-se que a maioria das mulheres passará mais de um terço da sua vida na
      pós-menopausa. Assim, a medidas que favoreçam uma boa saúde das mulheres nesta fase torna-se uma questão primordial,
      sendo a saúde óssea um dos pontos de atenção mais importantes.<sup>1</sup>
    </p>

    <h2>Envelhecimento e massa óssea</h2>
    <p>
      O aumento de densidade mineral óssea começa na infância, com o pico de massa óssea sendo alcançado em meados dos 20
      anos de idade. Durante a transição para a menopausa, há uma rápida perda óssea que já se inicia cerca de 1 ano antes
      da última menstruação.<sup>2</sup> Aos 70 anos, a massa óssea encontra-se cerca de 30-40% inferior em relação à
      idade reprodutiva.<sup>1</sup>
    </p>
    <p>
      Essas mudanças são impulsionadas pelas alterações hormonais características da menopausa, especialmente a
      diminuição dos níveis de estradiol <strong>(Figura 1)</strong>.<sup>2</sup>
    </p>
    <figure className="doc-figure doc-figure--narrow">
      <img
        src={img('artigos/id02/figura-1.webp')}
        alt="Gráfico: estrógeno e densidade mineral óssea caem após o último ciclo menstrual, entre os 18 e os 75 anos"
        width={531}
        height={472}
        loading="lazy"
      />
      <figcaption>
        <strong>Figura 1.</strong> Adaptada de de Weaver <em>et al.</em> Osteoporos Int, 2016; 27(1):367–76.<sup>3</sup> &amp;
        Eastell R <em>et al.</em> Eastell R <em>et al.</em> Nat Rev Dis Primers. 2016; 2:16069.<sup>4</sup>
      </figcaption>
    </figure>

    <h2>Regulação hormonal, menopausa e saúde óssea</h2>
    <p>
      O estrogênio auxilia a formação óssea por diferentes vias <strong>(Figura 2)</strong>:<sup>4</sup>
    </p>
    <ol>
      <li>estimulando a diferenciação e função dos osteoblastos;</li>
      <li>
        suprimindo a diferenciação e atividade dos osteoclastos através de mecanismos diretos na célula e indiretos
        (através de mediadores);
      </li>
    </ol>
    <p>
      Além disso, o estrogênio é necessário para a função adequada dos osteócitos, na detecção dos estímulos mecânicos com
      consequente formação óssea.<sup>4,5</sup>
    </p>
    <figure className="doc-figure doc-figure--narrow">
      <img
        src={img('artigos/id02/figura-2.webp')}
        alt="Diagrama: o estrogênio estimula a formação óssea pelos osteoblastos e suprime a reabsorção pelos osteoclastos"
        width={530}
        height={490}
        loading="lazy"
      />
      <figcaption>
        <strong>Figura 2.</strong> Papel do estrogênio na remodelação óssea. Adaptado de Eastell R <em>et al.</em> Nat Rev
        Dis Primers. 2016; 2:16069.<sup>4</sup>
      </figcaption>
    </figure>
    <p>
      Com a <strong>deficiência de estrogênio</strong>, há perda de massa óssea principalmente através dos seguintes
      mecanismos <strong>(Figura 3)</strong>:<sup>4</sup>
    </p>
    <ol>
      <li>
        aumento da produção de fatores que estimulam a diferenciação do pré-osteoclasto em osteoclasto, traduzindo-se em
        maior número e atividade de osteoclastos;
      </li>
      <li>a função de osteoblastos é suprimida;</li>
      <li>a função dos osteócitos na também é prejudicada.</li>
    </ol>
    <p>
      Assim, na menopausa, a deficiência de estrogênio leva ao aumento da atividade de reabsorção osteoclástica enquanto a
      atividade osteoblástica diminui, com menor formação de matriz óssea. Como resultado, a quantidade de osso reabsorvido
      excede a quantidade depositada, o que leva a uma perda de massa óssea.<sup>1</sup>
    </p>
    <figure className="doc-figure doc-figure--narrow">
      <img
        src={img('artigos/id02/figura-3.webp')}
        alt="Diagrama: na deficiência de estrogênio, a formação óssea diminui e a reabsorção óssea aumenta"
        width={531}
        height={489}
        loading="lazy"
      />
      <figcaption>
        <strong>Figura 3.</strong> Deficiência de estrogênio. Adaptado de Eastell R <em>et al.</em> Nat Rev Dis Primers.
        2016; 2:16069.<sup>4</sup>
      </figcaption>
    </figure>
    <p>O estrogênio também afeta os ossos através dos seguintes mecanismos:<sup>1</sup></p>
    <ol>
      <li>Diminui a sensibilidade do osso ao PTH (hormônio da paratireóide), reduzindo assim a reabsorção óssea.</li>
      <li>Aumenta a produção de calcitonina, inibindo assim a reabsorção óssea.</li>
      <li>Acelera a absorção de cálcio pelo intestino.</li>
      <li>Reduz a excreção de cálcio pelos rins.</li>
    </ol>

    <h2>A importância do cálcio e da Vitamina D na menopausa</h2>
    <p>
      O <strong>cálcio</strong> é o mineral mais abundante no corpo, sendo 99% encontrado nos dentes e nos ossos e apenas 1%
      no sangue circulante.<sup>6</sup> Por sua vez, a <strong>vitamina D</strong> é muito importante na regulação do
      metabolismo do cálcio, auxiliando em sua absorção pelo intestino delgado, promovendo a mineralização óssea e
      regulando o paratormônio.<sup>7</sup>
    </p>
    <p>
      Em mulheres na menopausa, a capacidade de produzir e absorver vitamina D é reduzida, contribuindo para níveis mais
      baixos dessa vitamina no organismo.<sup>7</sup>
    </p>
    <p>
      Isso deve ser um ponto de atenção, pois já foi demonstrado que níveis adequados de{' '}
      <strong>cálcio e vitamina D reduzem a perda óssea em mulheres na peri e pós-menopausa</strong>. Em um estudo com
      acompanhamento durante 18 anos de mais de 70 mil mulheres na pós-menopausa, observou-se que a ingestão de vitamina D
      estava associada a um risco reduzido de fraturas osteoporóticas de quadril.<sup>7</sup> Além disso, a suplementação
      de cálcio e vitamina D podem auxiliar na saúde óssea em mulheres na pós-menopausa, como demonstrado em uma
      meta-análise,<sup>7</sup> e também em outro estudo realizado pela Sociedade Americana de Menopausa, que mostraram
      redução na perda óssea e no risco de fraturas em mulheres na peri e pós-menopausa.<sup>8</sup>
    </p>

    <div className="doc-callout doc-callout--text">
      <h2>Conclusões</h2>
      <p>
        A menopausa é um fenômeno fisiológico natural na vida da mulher. Nesse período, o ciclo normal de renovação óssea é
        prejudicado pela deficiência de estrogênio, o que aumenta as chances de fragilidade óssea, fraturas e osteoporose.
        Garantir níveis adequados de cálcio e vitamina D, nutrientes essenciais para a saúde óssea da mulher, é
        fundamental.<sup>7</sup>
      </p>
      <p>
        Quer saber mais sobre os fatores importantes para a construção do banco ósseo ao longo da vida? Veja o artigo{' '}
        <strong>“Determinantes fisiológicos do pico de massa óssea e manutenção”</strong>!
      </p>
    </div>

    <h2>Referências</h2>
    <ol className="doc-refs">
      <li>
        Ji M-X, Yu Q. Primary osteoporosis in postmenopausal women. Chronic Dis Transl Med [Internet] 2015;1(1):9–13.
        Available from: <a href="http://dx.doi.org/10.1016/j.cdtm.2015.02.006" {...ext}>http://dx.doi.org/10.1016/j.cdtm.2015.02.006</a>.
      </li>
      <li>
        Karlamangla AS, Burnett-Bowie S-AM, Crandall CJ. Bone Health during the Menopause Transition and Beyond. Obstet
        Gynecol Clin North Am [Internet] 2018 [cited 2023 Nov 27];45(4):695. Available from:{' '}
        <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6226267/" {...ext}>https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6226267/</a>.
      </li>
      <li>
        Weaver CM, Alexander DD, Boushey CJ, et al. Calcium plus vitamin D supplementation and risk of fractures: an updated
        meta-analysis from the National Osteoporosis Foundation. Osteoporos Int [Internet] 2016;27(1):367–76. Available
        from: <a href="https://pubmed.ncbi.nlm.nih.gov/26510847" {...ext}>https://pubmed.ncbi.nlm.nih.gov/26510847</a>.
      </li>
      <li>
        Eastell R, O’Neill TW, Hofbauer LC, et al. Postmenopausal osteoporosis. Nature Reviews Disease Primers [Internet]
        2016 [cited 2023 Nov 29];2(1):1–16. Available from:{' '}
        <a href="https://www.nature.com/articles/nrdp201669" {...ext}>https://www.nature.com/articles/nrdp201669</a>.
      </li>
      <li>
        Li MCM, Chow SKH, Wong RMY, Qin L, Cheung WH. The role of osteocytes-specific molecular mechanism in regulation of
        mechanotransduction - A systematic review. J Orthop Translat [Internet] 2021;29:1–9. Available from:{' '}
        <a href="http://dx.doi.org/10.1016/j.jot.2021.04.005" {...ext}>http://dx.doi.org/10.1016/j.jot.2021.04.005</a>.
      </li>
      <li>
        Beto JA. The Role of Calcium in Human Aging. Clin Nutr Res [Internet] 2015 [cited 2023 Nov 28];4(1):1. Available
        from: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4337919/" {...ext}>https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4337919/</a>.
      </li>
      <li>
        Mei Z, Hu H, Zou Y, Li D. The role of vitamin D in menopausal women’s health. Front Physiol [Internet] 2023 [cited
        2023 Nov 24];14. Available from:{' '}
        <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10291614/" {...ext}>https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10291614/</a>.
      </li>
      <li>
        The role of calcium in peri-and postmenopausal women: consensus opinion of The North American Menopause Society.
        Menopause [Internet] 2001 [cited 2023 Nov 29];8(2):84. Available from:{' '}
        <a
          href="https://journals.lww.com/menopausejournal/abstract/2001/03000/the_role_of_calcium_in_peri_and_postmenopausal.3.aspx"
          {...ext}
        >
          https://journals.lww.com/menopausejournal/abstract/2001/03000/the_role_of_calcium_in_peri_and_postmenopausal.3.aspx
        </a>
        .
      </li>
    </ol>
    <p className="doc-source-note">MAT-BR-2401663</p>
  </>
);

export default content;
