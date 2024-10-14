interface Depoimento {
  nome: string;
  referencia: string;
  depoimento: string;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Tipando a função de cadastrar depoimento
  nuxtApp.apiCadastrarDepoimento = async (depoimento: Depoimento): Promise<any> => {
    try {
      const apiToken = localStorage.getItem('apiToken');
      const url = `${config.public.baseUrl}/depoimentos`;

      // Corrigindo o tipo para NitroFetchOptions
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${apiToken || ''}`, // Tipando o token como string opcional
        },
        body: depoimento,
        method: 'POST' as const // O método é uma string literal, precisa ser constante
      };

      const res = await $fetch(url, requestConfig);
      console.log('res', res);
      return res; // Retornando o resultado da requisição
    } catch (error) {
      console.log('Erro', error);
    }
  };
});
