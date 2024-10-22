<template>
  <div>

    <Head>
      <Title>Envia sua planta | Jessica Saka Designer de Interiores</Title>
    </Head>
    <article id="planta" class="sect center">
      <h1 class="hrTtl centered">
        Planta baixa / 2D
      </h1>
      <section class="introduction">
        <div class="sitecont">
          <canvas ref="board" width="800" height="600" id="canva"></canvas>
          <div class="forms">
            <form id="plantaTipo">
              <h2>Quantas paredes tem seu cômodo?</h2>
              <input type="number" name="comodoParedes" id="comodoParedes" v-model="numeroParedes"
                @input="mudarQuantidadeParedes()" min="4" max="7" />
            </form>
            <form id="sala" @submit.prevent="drawRoom()" v-if="numeroParedes === 4">
              <h2>Desenhar cômodo principal</h2>
              <p>
                nome do cômodo: <input type="text" id="salaNome" v-model="comodo.nome" />
              </p>
              <p>
                largura do cômodo em cm: <input type="number" id="salaW" v-model="comodo.largura" />
              </p>
              <p>
                altura do cômodo em cm: <input type="number" id="salaH" v-model="comodo.altura" />
              </p>
              <button type="submit">Desenhar</button>
            </form>

            <form id="comodoMaior" @submit.prevent="desenharComodoMaior()" v-else-if="numeroParedes > 4">
              <h2>Desenhar cômodo</h2>
              <p>
                nome do cômodo: <input type="text" id="salaNome" v-model="comodoMaior.nome" />
              </p>

              <p v-for="(parede, index) in numeroParedes">
                medida da parede {{ parede }}:
                <input type="number" id="ComodoMaiorW" v-model="comodoMaior.paredes[index].medida" />
              </p>
              <button type="submit">Desenhar</button>
            </form>

            <hr>

            <form id="sala" @submit.prevent="drawDoor()" v-show="comodoDesenhado">
              <h2>Desenhar porta ou janela</h2>
              <p>
                tipo:
                <select name="door" id="doorTipo" v-model="abertura.tipo">
                  <option value="janela">Janela</option>
                  <option value="porta">Porta</option>
                </select>
              </p>
              <p>
                em qual parede:
                <select name="paredes" id="paredes" v-model="abertura.parede">
                  <option :value="index + 1" v-for="(parede, index) in numeroParedes" :key="index">Parede {{ index + 1
                    }}</option>
                  <!-- <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option> -->
                </select>
              </p>
              {{ abertura.parede }}
              <p>
                largura do item em cm: <input type="number" id="doorW" v-model="abertura.largura" />
              </p>
              <p>
                a qual distância da parede (em cm) este item se encontra?
                <input type="number" id="doorDistancia" v-model="abertura.distancia">
              </p>
              <button type="submit">Desenhar</button>
            </form>
            <button @click="limpar()">Limpar</button>
          </div>
        </div>
      </section>

      <hr class="coluna">

    </article>
  </div>

</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Planta',
  setup() {
    let numeroParedes = ref(0)
    let comodoDesenhado = ref(false)
    let eixos = ref({
      x: 0,
      y: 0
    })
    let paredes = ref({
      A: { x: 0, y: 0 },
      B: { x: 0, y: 0 },
      C: { x: 0, y: 0 },
      D: { x: 0, y: 0 }
    })
    let comodo = ref({
      nome: 'Sala',
      largura: 400,
      altura: 400
    })

    let comodoMaior = ref({
      nome: '',
      quantidadeParedes: numeroParedes.value,
      paredes: []
    })

    let abertura = ref({
      tipo: 'janela',
      parede: 'A',
      largura: 80,
      distancia: 30
    })

    const board = ref(null)
    let canvas = ''
    let ctx = ''


    const drawRoom = () => {

      if (canvas.getContext) {
        ctx.fillStyle = 'black'
        ctx.strokeRect(eixos.value.x, eixos.value.y, comodo.value.largura, comodo.value.largura)
        ctx.font = '10px Arial'
        ctx.fillText('' + comodo.value.nome + ' (área: ' + comodo.value.largura + ' x ' + comodo.value.largura + ')', eixos.value.x + 10, eixos.value.y + 10)

        eixos.value.x = comodo.value.largura
        eixos.value.y = comodo.value.altura
        paredes.value.A = { x: 0, y: comodo.value.altura }
        paredes.value.B = { x: 0, y: comodo.value.largura }
        paredes.value.C = { x: comodo.value.altura, y: comodo.value.largura }
        paredes.value.D = { x: comodo.value.altura, y: 0 }

        comodoDesenhado.value = true

      } else {
        alert('não suportado')
      }
    }


    const desenharComodoMaior = () => {
      if (canvas.getContext) {

        // ctx.strokeRect(eixos.value.x, eixos.value.y, comodo.value.largura, comodo.value.largura)
        /*
        ctx.moveTo(0, 0)
        ctx.lineTo(0, medida-parede-1) // a primeira parede desce, então altera apenas o Y
        ctx.lineTo(medida-parede-2 ,medida-parede-1) // a segunda parede deve manter o Y e mover apenas o X
        ctx.lineTo(medida-parede-2 ,medida-parede-3 - medida-parede-1) // a terceira parede vai subir. Mantem o X e move o Y para cima, subtraindo a medida da parede 1  pela medida da parede 3
        ctx.lineTo(medida-parede-2 - medida-parede-4, medida-parede-1) // a quarta parede vai mover o X para trás. O Y mantém e subtrai a medida da parede 2 por parede 4
        ctx.lineTo(medida-parede-2 - medida-parede-4, medida-parede-1 - medida-parede-5) // a quinta parede subir. Mantem o X onde está e subtrai parede 1 por parede 5
        ctx.lineTo(0, 0) // a última parede volta pro início
        */

        ctx.fillStyle = 'black'
        ctx.font = '10px Arial'
        ctx.beginPath()
        ctx.moveTo(0, 0)

        ctx.lineTo(0, comodoMaior.value.paredes[0].medida) // a primeira parede desce, então altera apenas o Y
        ctx.fillText('Parede: 1', 10, (comodoMaior.value.paredes[0].medida / 2))

        ctx.lineTo(comodoMaior.value.paredes[1].medida, comodoMaior.value.paredes[0].medida) // a segunda parede deve manter o Y e mover apenas o X
        ctx.fillText('Parede: 2', (comodoMaior.value.paredes[1].medida / 2), comodoMaior.value.paredes[1].medida - 10)

        ctx.lineTo(comodoMaior.value.paredes[1].medida, comodoMaior.value.paredes[0].medida - comodoMaior.value.paredes[2].medida) // a terceira parede vai subir. Mantem o X e move o Y para cima, subtraindo a medida da parede 1  pela medida da parede 3
        ctx.fillText('Parede: 3', comodoMaior.value.paredes[1].medida + 10, (comodoMaior.value.paredes[0].medida - comodoMaior.value.paredes[2].medida) + ((comodoMaior.value.paredes[0].medida - comodoMaior.value.paredes[2].medida) / 2))

        ctx.lineTo(comodoMaior.value.paredes[1].medida - comodoMaior.value.paredes[3].medida, comodoMaior.value.paredes[0].medida - comodoMaior.value.paredes[2].medida) // a quarta parede vai mover o X para trás. O Y mantém e subtrai a medida da parede 2 por parede 4
        ctx.fillText('Parede: 4', (comodoMaior.value.paredes[1].medida - comodoMaior.value.paredes[3].medida) * 2, (comodoMaior.value.paredes[0].medida - comodoMaior.value.paredes[2].medida) - 10)

        ctx.lineTo(comodoMaior.value.paredes[1].medida - comodoMaior.value.paredes[3].medida, 0)  // a quinta parede vai subir. Mantem o X onde está e volta o Y para 0
        ctx.fillText('Parede: 5', (comodoMaior.value.paredes[1].medida - comodoMaior.value.paredes[3].medida) + 10, comodoMaior.value.paredes[4].medida / 2)

        ctx.lineTo(0, 0)
        ctx.fillText('Parede: 6', 10, 10)

        ctx.stroke();
        comodoDesenhado.value = true

      } else {
        alert('não suportado')
      }
    }

    const mudarQuantidadeParedes = () => {
      const quantidadeAtual = comodoMaior.value.paredes.length

      // Se o valor no input for maior que a quantidade atual de paredes, adiciona novas paredes
      if (numeroParedes.value > quantidadeAtual) {
        for (let i = quantidadeAtual; i < numeroParedes.value; i++) {
          comodoMaior.value.paredes.push({ parede: i, medida: 0 })
        }
      }
      // Se for menor, remove paredes excedentes
      else if (numeroParedes.value < quantidadeAtual) {
        comodoMaior.value.paredes.splice(numeroParedes.value, quantidadeAtual - numeroParedes.value)
      }
    }

    const drawDoor = () => {
      let color = 'red'
      const porta = 4

      if (abertura.value.tipo === 'janela') {
        color = 'blue'
      } else {
        color = 'red'
      }
      if (canvas.getContext) {
        let _parede = ''
        let _distancia = {}
        ctx.strokeStyle = color
        if (paredes.value.hasOwnProperty(abertura.parede)) {
          _parede = paredes[abertura.value.abertura.value.parede]
        }
        console.log('abertura.value.largura', abertura.value.largura);
        _distancia = function () {
          if (numeroParedes.value === 4) {
            switch (abertura.value.parede) {
              case 1:
                return { x: 0 - (porta / 2), y: abertura.value.distancia, w: porta, h: abertura.value.largura, textoX: porta, textoY: (abertura.value.distancia + (abertura.value.distancia / 2)), textAlign: 'center' }
                break;

              case 2:
                return { x: abertura.value.distancia, y: 0 - (porta / 2), w: abertura.value.largura, h: porta, textoX: (abertura.value.distancia), textoY: porta * 2, textAlign: 'center' }
                break;

              case 3:
                return { x: paredes.value.C.y - (porta / 2), y: abertura.value.distancia, w: porta, h: abertura.value.largura, textoX: paredes.value.C.y - 60, textoY: (abertura.value.distancia + (abertura.value.distancia / 2)), textAlign: 'center' }
                break;

              case 4:
                return { x: abertura.value.distancia, y: paredes.value.D.x - (porta / 2), w: abertura.value.largura, h: porta, textoX: abertura.value.distancia, textoY: paredes.value.D.x - porta, textAlign: 'center' }
                break;
            }
          } else if (numeroParedes.value === 6) {
            switch (abertura.value.parede) {
              case 1:
                return { x: 0, y: comodoMaior.value.paredes[0].medida - abertura.value.distancia - abertura.value.largura, w: porta, h: abertura.value.largura, textoX: porta + 10, textoY: (comodoMaior.value.paredes[0].medida - abertura.value.distancia - abertura.value.largura) + 10, textAlign: 'center' }
                break;

              case 2:
                return { x: comodoMaior.value.paredes[1].medida - abertura.value.distancia - abertura.value.largura, y: comodoMaior.value.paredes[0].medida - porta, w: abertura.value.largura, h: porta, textoX: paredes.value.C.y - 60, textoY: (abertura.value.distancia + (abertura.value.distancia / 2)), textAlign: 'center' }
                break;

                case 3:
                return { x: comodoMaior.value.paredes[1].medida, y: comodoMaior.value.paredes[0].medida - abertura.value.largura - abertura.value.distancia , w: porta, h: abertura.value.largura, textoX: (abertura.value.distancia), textoY: porta * 2, textAlign: 'center' }
                break;

              case 4:
                return { x: abertura.value.distancia, y: paredes.value.D.x - (porta / 2), w: abertura.value.largura, h: porta, textoX: abertura.value.distancia, textoY: paredes.value.D.x - porta, textAlign: 'center' }
                break;

              case 5:
                return { x: abertura.value.distancia, y: paredes.value.D.x - (porta / 2), w: abertura.value.largura, h: porta, textoX: abertura.value.distancia, textoY: paredes.value.D.x - porta, textAlign: 'center' }
                break;

              case 6:
                return { x: abertura.value.distancia, y: paredes.value.D.x - (porta / 2), w: abertura.value.largura, h: porta, textoX: abertura.value.distancia, textoY: paredes.value.D.x - porta, textAlign: 'center' }
                break;
            }

          }

        }
        console.log('_distancia().x, _distancia().y, _distancia().w, _distancia().h', _distancia().x, _distancia().y, _distancia().w, _distancia().h);
        ctx.fillRect(_distancia().x, _distancia().y, _distancia().w, _distancia().h)

        ctx.font = '10px Arial'
        ctx.textAlign = _distancia.textAlign;

        ctx.fillStyle = color
        ctx.fillText(abertura.value.tipo + ': ' + abertura.value.largura + 'cm', _distancia().textoX, _distancia().textoY)

      }
    }

    const limpar = () => {
      console.log('canvas', canvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      comodoDesenhado.value = false
      numeroParedes.value = 0

      // canvas.remove(...canvas.getObjects());
    }

    const init = () => {
      // console.log('ref', this.$refs);

    }

    const preencherComodo = () => {
      //  Desenho de 6 paredes
      comodoMaior.value = {
        "nome": "Sala",
        "quantidadeParedes": 0,
        "paredes": [
          {
            "parede": 0,
            "medida": 400
          },
          {
            "parede": 1,
            "medida": 300
          },
          {
            "parede": 2,
            "medida": 200
          },
          {
            "parede": 3,
            "medida": 100
          },
          {
            "parede": 4,
            "medida": 200
          },
          {
            "parede": 5,
            "medida": 200
          }
        ]
      }
      numeroParedes.value = 6
      desenharComodoMaior()
    }

    onMounted(() => {
      // init()
      canvas = board.value
      ctx = canvas.getContext('2d')
      preencherComodo()
    })

    return {
      drawRoom,
      mudarQuantidadeParedes,
      drawDoor,
      desenharComodoMaior,
      limpar,
      preencherComodo,
      numeroParedes,
      comodoDesenhado,
      board,
      eixos,
      paredes,
      comodo,
      comodoMaior,
      abertura
    }

  }
})
</script>
<style lang="scss">
canvas {
  border: 1px solid blue;
  background-image: url('/grid.png');
}

.forms {
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 10px;
  /* border: 1px solid #333; */
  box-shadow: -2px 2px 8px gray;
  z-index: 1000;
}

.forms form {
  margin-bottom: 20px;
}

.forms input {
  width: 80px;
}
</style>
