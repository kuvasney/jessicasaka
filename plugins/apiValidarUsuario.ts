interface User {
  email: String
}

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const router = useRouter()

  nuxtApp.apiValidarUsuario = async (user: User): Promise<boolean> => {

    const url = `${ config.public.baseUrl }/usuarios/validarUsuario`
    const apiToken = localStorage.getItem('apiToken')

    const params = {
      email: user.email
    }

    const requestConfig = {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      body: params,
      method: 'POST' as const
    }
    try {
      return await $fetch(url, requestConfig)
    } catch (error) {
      console.log('Erro', error);
      return false
    }
  }
})
