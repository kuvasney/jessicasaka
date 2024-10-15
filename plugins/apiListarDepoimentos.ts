// Interface para definir o tipo de Depoimento
interface Depoimento {
  _id: string;
  nome: string;
  referencia?: string;
  depoimento: string;
}

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const router = useRouter()

  nuxtApp.apiListarDepoimentos = async ():Promise<Depoimento[] | undefined> => {
    try {
      const url = `${ config.public.baseUrl }/public/depoimentos`
      const res: any = await $fetch(url, { method: 'GET' })
      if (res.data) {
        return res.data
      } else {
        throw new Error('Retorno da api vazio')
      }
    } catch (error: any) {
      console.log('Erro', error);
    }
  }
})
