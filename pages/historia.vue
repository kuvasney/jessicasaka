<template>
  <div>

    <Head>
      <Title>História | Jessica Saka Designer de Interiores</Title>
    </Head>
    <article id="about-us" class="sect center">
      <!-- <h1 class="hrTtl centered">
      <b>Quem</b> Somos?
    </h1> -->
      <section class="introduction">
        <div class="sitecont">
          <div class="header">
            <h2 class="hrTtl alt">
              <b>Oi gente, eu sou a</b> <br>
              <strong class="handwriting">Jéssica Saka</strong>
            </h2>
            <img src="/assets/selo-colormain.svg" alt="Selo Jéssica Saka" class="selo">
          </div>
          <div class="person">
            <div class="picframe">
              <img src="/assets/pics/jessica-saka.jpg" alt="Jessica Saka" class="pic">
              <div class="frame"></div>
            </div>
            <div class="about">
              <p>
                Sou mãe, esposa, designer de interiores, apaixonada por bichinhos e pela natureza. Além disso, também
                conhecida como <b>FUNDADORA DA DOLCE DESIGN</b>!
              </p>

              <p>
                Criei a empresa em 2014, com o intuito de facilitar a vida das pessoas durante as reformas. Sei que esse
                pode ser um momento estressante, então eu transformo isso na experiência mais agradável possível!
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr class="coluna">
      <section class="metodo">
        <div class="sitecont">
          <h4 class="hrTtl">Posicionamento</h4>
          <p>
            Atender de forma humana, sincera e personalizada. Acreditamos que é possível executar um bom projeto,
            com valor justo. Permitimos o bem-estar pessoal numa esfera muito mais ampla que a de decoração.
          </p>

          <h4 class="hrTtl">Diferenciais</h4>
          <ul class="reglist">
            <li>Projetos de qualidade com valor acessível</li>
            <li>Personalização, unindo beleza e funcionalidade</li>
            <li>Designer que coloca a mão na massa</li>
            <li>Sempre faz uma surpresa positiva</li>
            <li>Supera a expectativa na entrega do projeto</li>
            <li>Participação de todas as etapas do projeto</li>
          </ul>

          <h4 class="hrTtl">Conceito</h4>
          <p>
            <strong class="handwriting sttl">
              Suporte essencial para soluções de interiores <b>não óbvias</b>.
            </strong>
          </p>
          <p>
            A Jéssica Saka proporciona sugestões inesperadas, que são tudo que o cliente deseja. Ao unir a beleza e o
            design, oferece suporte real durante a obra.
          </p>
        </div>
      </section>
      <!-- <section class="metodo-dolce-d">
      <div class="sitecont">
        <h2 class="hrTtl centered handwriting">
          MÉTODO Exclusivo DOLCE DESIGN
        </h2>
        <p>Cada pessoa é única, com personalidade, traços individuais e rotinas diferentes.⠀</p>
        <p>Por isso vimos a necessidade de desenvolver um <b class="hlight">MÉTODO EXCLUSIVO</b>.</p>

        <p>
          <strong>1 - EXISTE UM PRÉ ATENDIMENTO</strong> e, através de uma entrevista elaboramos o design estudando a personalidade e as
          particularidades de cada pessoa.
        </p>

        <p>
          <strong>2 - TOMAMOS UM CAFÉ DA TARDE</strong> Sempre que possível, esse processo de atendimento é realizado em um CAFÉ DA TARDE!
        </p>
        ⠀⠀
        <p>
          <strong>3 - CRIAMOS LAÇOS</strong> com você e seus sonhos, oferecendo projetos únicos e harmônicos. Essa é a nossa forma única de atender, que vem dando MUITO RESULTADO.
        </p>
        ​

        <p>
          <strong>4 - CONFECCIONAMOS ALGO ÚNICO</strong> um ponto incrível da nossa empresa é que sempre colocamos a mão na massa e CONFECCIONAMOS
          ALGO PERSONALIZADO em cada projeto. Nos apegamos aos detalhes!
        </p>

      </div>
    </section> -->
      <!-- <section class="nossos-diferenciais">
      <div class="sitecont">
        <h2 class="rTtl">
          <span>
            NOSSOS <b>DIFERENCIAIS</b>
          </span>
        </h2>
        <ul class="nossos-diferenciais__list">
          <li>
            <span class="icon-star-full"></span>
            <h3>
              FORNECEDORES DE CONFIANÇA
            </h3>
            <p>
              temos parceiros de obra responsáveis!
            </p>
          </li>
          <li>
            <span class="icon-mao-na-massa"></span>
            <h3>
              SOMOS MÃO NA MASSA
            </h3>
            <p>
              criamos um detalhe exclusivo para você no final do projeto (com nossas próprias mãos)
            </p>
          </li>
          <li>
            <span class="icon-coffeecup"></span>
            <h3>
              EXPERIÊNCIAS ÚNICAS
            </h3>
            <p>
              são criadas para cada cliente. Você não é "mais um"!
            </p>
          </li>
          <li>
            <span class="icon-checkmark"></span>
            <h3>
              MÉTODO EXCLUSIVO
            </h3>
            <p>
              e o melhor: os valores podem ser adaptados
            </p>
          </li>
        </ul>
      </div>
    </section> -->
    </article>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Historia',
  setup() {

  }
})
</script>
<style lang="scss">

    #about-us {
      background: rgba($color4, .5);
      padding: 1em 0;
    }

    .header {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-around;
    }

    .selo {
      height: auto;
      align-content: flex-end;
      margin: 1em;

      @include fhd {
        width: 200px;
      }

      @include medium {
        width: 200px;
      }

      @include small {
        align-self: flex-end;
        width: 30vw;
      }
    }

    .introduction {
      position: relative;

      .hrTtl.partner {
        width: 250px;
        line-height: .9;
        text-align: center;
        letter-spacing: 0;
      }

      .hrTtl b,
      .hrTtl span {
        font-size: 1em;
      }
    }

    .person {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      @include small {
        flex-direction: column;
      }

      a {
        color: $color-main;
      }

      .picframe {
        width: 25%;
        position: relative;

        @include small {
          width: 100%;
          text-align: center;
        }

        .pic {
          border-radius: 100%;
          max-width: 95%;
        }

        .frame {
          border: 3px solid $color-main;
          position: absolute;
          top: 10px;
          left: 0;
          width: 190px;
          height: 190px;

          @include small {
            left: 50%;
            transform: translate(-50%, 0);
          }
        }
      }

      .about {
        width: 75%;

        @include small {
          width: 100%;
        }

        p {
          color: $color-main;
          font-size: 1.2em;
          margin-bottom: 1em;
          ;
        }
      }
    }

    .about__name {
      color: $color-main;
      font-size: 1.6em;
      margin-bottom: 1em;
      letter-spacing: 2px;
    }

    .about__role {
      letter-spacing: 2px;
      margin-bottom: 2em;
      ;
    }

    .metodo-dolce-d {
      background: url('../assets/bg/marmore.jpg') no-repeat;
      background-size: cover;

      p {
        color: $color2;
        font-size: .9em;
        margin-bottom: 1em;
      }


      strong {
        background-color: $color-main;
        color: #FFF;
        font-weight: bold;
        padding-right: 2px;
      }
    }
</style>
