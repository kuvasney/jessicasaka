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
            {{ comodoMaior }}

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
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </p>
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
      const cm = { "nome": "Sala", "quantidadeParedes": 0, "paredes": [{ "parede": 0, "medida": 400 }, { "parede": 1, "medida": 400 }, { "parede": 2, "medida": 200 }, { "parede": 3, "medida": 100 }, { "parede": 4, "medida": 100 }, { "parede": 5, "medida": 200 }] }
      let pontos = []
      // ponto A
      pontos.push({ X: 0, y: cm.paredes[0].medida })
      pontos.push({ X: cm.paredes[1].medida, y: cm.paredes[0].medida })
      pontos.push({ X: cm.paredes[1].medida, y: cm.paredes[0].medida })

      if (canvas.getContext) {
        ctx.fillStyle = 'black'
        // ctx.strokeRect(eixos.value.x, eixos.value.y, comodo.value.largura, comodo.value.largura)
        ctx.font = '10px Arial'
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 400)
        ctx.fillText('parede 1', 0, 400)
        ctx.lineTo(400, 400)
        ctx.fillText('parede 2', 400, 400)
        ctx.lineTo(400, 300)
        ctx.fillText('parede 3', 400, 300)
        ctx.lineTo(300, 300)
        ctx.fillText('parede 4', 300, 300)
        ctx.lineTo(300, 0)
        ctx.fillText('parede 5', 400, 300)
        // ctx.lineTo(200, 100)

        ctx.fill()
        // ctx.lineTo(comodoMaior.paredes[0].medida, comodoMaior.paredes[1].medida)
        // ctx.lineTo(comodoMaior.paredes[1].medida, comodoMaior.paredes[2].medida)
        // ctx.lineTo(comodoMaior.paredes[1].medida, comodoMaior.paredes[3].medida - comodoMaior.paredes[2].medida)
        // ctx.lineTo(comodoMaior.paredes[1].medida, comodoMaior.paredes[3].medida - comodoMaior.paredes[2].medida)


        // ctx.font = '10px Arial'
        // ctx.fillText('' + comodo.value.nome + ' (área: ' + comodo.value.largura + ' x ' + comodo.value.largura + ')', eixos.value.x + 10, eixos.value.y + 10)

        // eixos.value.x = comodo.value.largura
        // eixos.value.y = comodo.value.altura
        // paredes.value.A = { x: 0, y: comodo.value.altura }
        // paredes.value.B = { x: 0, y: comodo.value.largura }
        // paredes.value.C = { x: comodo.value.altura, y: comodo.value.largura }
        // paredes.value.D = { x: comodo.value.altura, y: 0 }

        // comodoDesenhado.value = true

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
      const porta = 8

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

        _distancia = function () {
          switch (abertura.value.parede) {
            case 'A':
              return { x: 0 - (porta / 2), y: abertura.value.distancia, w: porta, h: abertura.value.largura, textoX: porta, textoY: (abertura.value.distancia + (abertura.value.distancia / 2)), textAlign: 'center' }
              break;

            case 'B':
              return { x: abertura.value.distancia, y: 0 - (porta / 2), w: abertura.value.largura, h: porta, textoX: (abertura.value.distancia), textoY: porta * 2, textAlign: 'center' }
              break;

            case 'C':
              return { x: paredes.value.C.y - (porta / 2), y: abertura.value.distancia, w: porta, h: abertura.value.largura, textoX: paredes.value.C.y - 60, textoY: (abertura.value.distancia + (abertura.value.distancia / 2)), textAlign: 'center' }
              break;

            case 'D':
              return { x: abertura.value.distancia, y: paredes.value.D.x - (porta / 2), w: abertura.value.largura, h: porta, textoX: abertura.value.distancia, textoY: paredes.value.D.x - porta, textAlign: 'center' }
              break;
          }
        }
        ctx.strokeRect(_distancia().x, _distancia().y, _distancia().w, _distancia().h)

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

    onMounted(() => {
      // init()
      canvas = board.value
      ctx = canvas.getContext('2d')
      desenharComodoMaior()
    })

    return {
      drawRoom,
      mudarQuantidadeParedes,
      drawDoor,
      desenharComodoMaior,
      limpar,
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
