interface Email {
  name: string,
  email: string,
  phone: string,
  message: string
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Tipando a função de cadastrar depoimento
  nuxtApp.apiEnviarEmail = async (email: Email): Promise<any> => {
    try {
      const url = `${config.public.baseUrl}/public/contato`;

      // Corrigindo o tipo para NitroFetchOptions
      const requestConfig = {
        body: email,
        method: 'POST' as const // O método é uma string literal, precisa ser constante
      };

      const res = await $fetch(url, requestConfig);
      if (res) {
        return res; // Retornando o resultado da requisição
      } else {
        throw new Error('Erro ao enviar email')
      }
    } catch (error) {
      console.log('Erro', error);
      return false
    }
  };
});
