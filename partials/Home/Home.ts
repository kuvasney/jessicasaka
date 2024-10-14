interface Obras {
  _id: string;
  nome: string;
  local?: string;
  tipo?: string;
  descricao: string;
  fotos: string[];  // Especifiquei que fotos é um array de strings, pode ajustar conforme necessário
}

export default defineComponent({
  name: 'JSHome',
  setup() {
    const route = useRoute();
    const config = useRuntimeConfig();
    const nuxtApp = useNuxtApp();

    // Tipagem para buscarProjetos como uma função que retorna Promise<Obras[]>
    const buscarProjetos = nuxtApp.apiListarObras as () => Promise<Obras[]>;

    // Tipagem para projectList como uma ref de Obras[]
    let projectList = ref<Obras[] | null>(null);

    const getObras = async () => {
      try {
        projectList.value = await buscarProjetos();
        console.log('proj', projectList.value);
      } catch (error: any) {
        console.log('error', error);
      }
    };

    const init = () => {
      getObras();
    };

    onMounted(() => {
      init();
    });

    return {
      projectList
    };
  }
});
