import { defineNuxtPlugin } from '#app'

interface Obra {
  nome: string;
  descricao: string;
  local: string;
  tipo: string;
}

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.apiCadastrarObra = async (obra: Obra, fotos: File[]): Promise<void> => {
    try {
      const formData = new FormData();

      // Adiciona os dados de 'obra' ao FormData
      formData.append('nome', obra.nome);
      formData.append('descricao', obra.descricao);
      formData.append('local', obra.local);
      formData.append('tipo', obra.tipo);

      // Adiciona cada foto ao FormData (manter a tipagem do array de File)
      fotos.forEach((foto) => {
        formData.append('fotos', foto);
      });

      const apiToken = localStorage.getItem('apiToken');
      const url = `${config.public.baseUrl}/obras`;

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${apiToken || ''}`, // Tratando o token opcionalmente
        },
        body: formData,
        method: 'POST' as const // Método constante do tipo string literal
      };

      await $fetch(url, requestConfig);
    } catch (error) {
      console.log('Erro', error);
    }
  };
});
