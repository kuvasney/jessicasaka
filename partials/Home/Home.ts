export default defineComponent({
  name: 'JSHome',
  setup() {
    const route = useRoute()
    const config = useRuntimeConfig()
    const nuxtApp = useNuxtApp()
    const buscarProjetos: any = nuxtApp.apiListarObras
    const buscarDepoimentos: any = nuxtApp.apiListarDepoimentos
    let projectList = ref()
    let depoimentosList = ref()

    useSeoMeta({
      title: 'Jessica Saka Interiores',
      ogTitle: 'Jessica Saka Interiores',
      description: 'Jéssica Saka deisgner de interiores. Sempre a melhor solução ADAPTADA AO SEU ORÇAMENTO, não importa qual o tamanho e o tipo de ambiente que você quer planejar. Vem comigo!',
      ogDescription: 'Jéssica Saka deisgner de interiores. Sempre a melhor solução ADAPTADA AO SEU ORÇAMENTO, não importa qual o tamanho e o tipo de ambiente que você quer planejar. Vem comigo!',
      ogImage: 'https://jessicasaka.com.br/selo-jessicasaka.png'
    })

    useHead({
      link: [{
        rel: 'canonical',
        href: 'https://jessicasaka.com.br/' + route.path,
      }],
      meta: [{
        name: 'description',
        content: 'Jéssica Saka deisgner de interiores. Sempre a melhor solução ADAPTADA AO SEU ORÇAMENTO, não importa qual o tamanho e o tipo de ambiente que você quer planejar. Vem comigo!'
      }]
    })

    const getObras = async () => {
      try {
        projectList.value = await buscarProjetos()
      } catch (error) {
        console.log('error', error);
      }
    }

    const getDepoimentos = async () => {
      try {
        depoimentosList.value = await buscarDepoimentos()
      } catch (error) {
        console.log('error', error);
      }
    }

    const init = () => {
      getObras()
      getDepoimentos()
    }

    onMounted(() => {
      init()
    })

    return {
      projectList,
      depoimentosList
    }
  }
})
