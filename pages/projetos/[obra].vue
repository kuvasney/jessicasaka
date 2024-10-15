<template>
  <div>
    <Head>
      <Title>Projetos | Jessica Saka Designer de Interiores</Title>
    </Head>
    <article id="projetos" class="sect center" v-if="obra">
      <h1 class="hrTtl handwriting centered">
        Projeto: {{ obra.nome }}
      </h1>
      <div class="intro sitecont">
        <p>
          Trabalhamos com projetos de interiores <b>RESIDENCIAIS</b> e <b>CORPORATIVOS</b>.
        </p>
        <p>
          Realizamos todo acompanhamento da obra, desde o planejamento até a entrega, para que tudo seja realizado da
          melhor maneira - e no final ainda superamos suas expectativas!
        </p>
        <p> Escolha um projeto na lista abaixo para ver seus detalhes</p>
        <select v-model="projetosSelect" @change="mudarProjeto()">
          <option disabled value="" selected>Selecione</option>
          <option v-for="p in projetoDetalhes" :value="p.slug">{{ p.nome }}</option>
        </select>
      </div>
      <div class="project__details">
        <section class="photoset">
          <ul class="photos"
            :style="{ 'width': sliderSpecs.width + 'vw', 'margin-left': '-' + sliderSpecs.left + 'vw' }">
            <li v-for="foto of obra.fotos">
              <div class="frame">
                <img :src="`/uploads/obras/${foto.nomeArquivo}`" :alt="obra.nome">
              </div>
              <p>
                {{ foto.descricaoFoto }}
              </p>
            </li>
          </ul>
          <button @click="slideIt('next')" class="photoset__next">
            <i class="icon-arrow_forward_ios" />
          </button>
          <button @click="slideIt('previous')" class="photoset__prev">
            <i class="icon-arrow_back_ios" />
          </button>
        </section>
        <section class="project__info sitecont">
          <div class="side">
            <p class="project__place">
              {{ obra.local }}
            </p>
            <h2 class="project__name">
              {{ obra.nome }}
            </h2>
          </div>
          <div class="side">
            <p class="project__description">
              {{ obra.descricao }}
            </p>
          </div>
        </section>
      </div>
      <Messenger />
    </article>
    <article v-else>
      <i class="icon-loading icon"></i>
      <Messenger />
    </article>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '~/store/layout'

interface Obras {}

interface Obra {
  _id: string;
  nome: string;
  descricao: string;
  local: string;
  tipo?: string;
  fotos: [{
    nomeArquivo: string,
    descricaoFoto: string
  }];
}

interface SliderSpecs {
  left: number,
  right: number,
  width: any,
  param: number
}


export default defineComponent({
  name: 'Projetos',
  setup() {
    const nuxtApp = useNuxtApp()
    const getObra = nuxtApp.apiGetObra as (obraNome: string) => Promise<Obra>; // Tipagem da função de busca de obra
    const buscarProjetos = nuxtApp.apiListarObras as () => Promise<Obras>
    const route = useRoute()
    const router = useRouter()
    const layoutStore = useLayoutStore()
    const projetoDetalhes = ref()

    let obra = ref<Obra | null>(null); // Definindo o tipo da obra como Obra ou null
    let sliderSpecs = ref<SliderSpecs>({
      left: 0,
      right: 0,
      width: 0,
      param: 98
    })
    let projectList = ref<any>(null)
    let projetosSelect = ref<any>()

    const listarProjetos = async () => {
      try {
        projectList.value = await buscarProjetos()
        projetoDetalhes.value = projectList.value.map((projeto: any) => ({
          nome: projeto.nome,
          slug: projeto.slug
        }))
      } catch (error) {
        console.log('error', error);
      }
    }




    const listarProjeto = async (): Promise<void> => {

      const obraNome = route.params.obra as string; // Tipagem do parâmetro da rota como string
      layoutStore.toggleLoading(true)
      try {
        obra.value = await getObra(obraNome)
        layoutStore.toggleLoading(false)
        sliderSpecs.value.width = obra.value.fotos.length * sliderSpecs.value.param
        sliderSpecs.value.left = 0
        projetosSelect.value = route.params.obra
        // projetosSelect.value.map((proj: any) => {
        //   if (proj.slug === route.params.obra) {
        //     proj.selectedValue = proj.slug
        //   }
        // })
      } catch (err: any) {
        layoutStore.setMessage({ message: 'Não foi possível carregar a obra selecionada', type: 0 })
        layoutStore.toggleLoading(false)
      }
    }

    const slideIt = (direction: string) => {
      switch (direction) {
        case 'next':
          if (sliderSpecs.value.left >= sliderSpecs.value.width - sliderSpecs.value.param) {
            sliderSpecs.value.left = 0
          } else {
            sliderSpecs.value.left = sliderSpecs.value.left + sliderSpecs.value.param
          }
          break;

        case 'previous':
          if (sliderSpecs.value.left === 0) {
            sliderSpecs.value.left = sliderSpecs.value.width - sliderSpecs.value.param
          } else {
            sliderSpecs.value.left = sliderSpecs.value.left - sliderSpecs.value.param
          }
      }
    }

    const mudarProjeto = () => {
      router.push(projetosSelect.value)
    }

    onMounted(() => {
      listarProjetos()
      listarProjeto()
    })

    return {
      obra,
      sliderSpecs,
      projectList,
      projetoDetalhes,
      projetosSelect,
      mudarProjeto,
      slideIt
    }

  }
})
</script>

