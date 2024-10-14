interface Obras {
  _id: String,
  nome: String,
  local?: String,
  tipo?: String,
  descricao: String,
  fotos: []
}

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const router = useRouter()

  nuxtApp.apiListarObras = async (): Promise<Obras[] | undefined> => {
    try {
      const url = `${ config.public.baseUrl }/public/obras`
      return await $fetch(url, {method: 'GET'})
    } catch (error: any) {
      console.log('Erro', error);
    }
  }
})
