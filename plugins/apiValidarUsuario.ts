import { defineNuxtPlugin } from '#app'
interface User {
  email: String
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  nuxtApp.apiValidarUsuario = async (user: User): Promise<void> => {

    const apiToken = localStorage.getItem('apiToken')
    console.log('apiToken', apiToken);
    const url = `${ config.public.baseUrl }/usuarios/validarUsuario`
    const params = {
      email: user.email
    }

    const requestConfig = {
      headers: {
        Authorization: `Bearer ${apiToken || ''}`, // Tratando o token opcionalmente
      },
      body: params,
      method: 'POST' as const
    }
    try {
      const res: any = await $fetch(url, requestConfig)
      if (res) {
        return res
      } else {
        throw new Error('Usuário não pode ser validado')
      }
    } catch (error) {
      console.log('Erro', error);
    }
  }
})
