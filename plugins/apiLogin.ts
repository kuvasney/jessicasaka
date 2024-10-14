interface User {
  email: String,
  password: String
}

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  const router = useRouter()

  nuxtApp.apiLogin = async (user: User): Promise<Object> => {
    const url = `${ config.public.baseUrl }/public/login`

    const params = {
      email: user.email,
      password: user.password
    }

    const requestConfig = {
      body: params,
      method: 'POST' as const
    }
    try {
      return await $fetch(url, requestConfig)
    } catch (error) {
      console.log('Erro', error);
      return { erro: 'Usuário não encontrado' }
    }
  }
})
