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
      const res:any = await $fetch(url, {method: 'GET'})
      if (res.obras) {
        return res.obras
      } else {
        throw new Error('Retorno da api vazio')
      }
    } catch (error: any) {
      console.log('Erro', error);
    }
  }
})
