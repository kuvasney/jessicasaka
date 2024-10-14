export default defineComponent({
  name: 'JSHome',
  setup() {
    const route = useRoute()
    const config = useRuntimeConfig()
    const nuxtApp = useNuxtApp()
    const buscarProjetos = nuxtApp.apiListarObras
    let projectList = ref()

    const getObras = async () => {
      try {
        projectList.value = await buscarProjetos()
        console.log('proj', projectList.value);
      } catch (error) {
        console.log('error', error);
      }
    }

    const init = () => {
      getObras()
    }

    onMounted(() => {
      init()
    })

    return {
      projectList
    }
  }
})
