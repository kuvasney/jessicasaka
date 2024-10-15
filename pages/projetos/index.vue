<template>
  <div>
    <article id="projetos" class="sect center">
      <h1 class="hrTtl handwriting centered">
        Projetos Autênticos
      </h1>
      <div class="intro sitecont">
        <p>
          Trabalhamos com projetos de interiores <b>RESIDENCIAIS</b> e <b>CORPORATIVOS</b>.
        </p>
        <p>
          Realizamos todo acompanhamento da obra, desde o planejamento até a entrega, para que tudo seja realizado da
          melhor
          maneira - e no final ainda superamos suas expectativas!
        </p>
        <p>
          Escolha na lista um projeto para vê-lo em detalhes
        </p>
      </div>
    </article>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Projetos',
  setup() {
    const router = useRouter()

    onMounted(() => {
      router.push('/projetos/maximus')
    })
  }
})
</script>
