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

  nuxtApp.apiGetObra = async (slug:string): Promise<Obras[] | undefined> => {
    try {
      const url = `${ config.public.baseUrl }/public/obras/slug?slug=${slug}`

      return await $fetch(url, {method: 'GET'})
    } catch (error: any) {
      console.log('Erro', error);
    }
  }
})
