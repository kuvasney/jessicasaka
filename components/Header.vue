<template>
  <header class="pagetop">
    <div class="pagetop__page-logo">
      <div class="logo">
        <nuxt-link to="/">
          <img src="../assets/logo.svg" alt="Jessica Saka - designer de interiores" class="signo">
          <p><img class="jessicasaka" src="../assets/jessicasaka.svg" alt="Jessica Saka"> <span> designer de
              interiores</span></p>
        </nuxt-link>
      </div>
    </div>
    <button class="mobo_menu" @click="mobomenu = !mobomenu">
      <i class="icon-menu"></i>
    </button>
    <nav :class="[mobomenu ? 'mobomenu' : '', 'pagetop__main-nav']">
      <ul>
        <li @click="mobomenu = false">
          <nuxt-link to="/historia">
            História
          </nuxt-link>
        </li>
        <li @click="mobomenu = false">
          <nuxt-link to="/projetos">
            Projetos
            <!-- is log {{ sessionStorage.getItem('email') }} -->
          </nuxt-link>
        </li>
        <li v-if="isLoggedIn">
          <a @click="logout()">
            Sair
          </a>
        </li>
      </ul>
    </nav>
    <section class="pagetop__page-info">
    </section>
  </header>
</template>
<script>
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'PageHeader',
    setup() {
      const router = useRouter()
      const isLoggedIn = ref()
      let mobomenu = ref(false)

      const verificarLogin = () => {
        if (localStorage.getItem('email')) {
          isLoggedIn.value = true
        } else {
          isLoggedIn.value = false
        }
      }

      const logout = () => {
        localStorage.removeItem('email')
        localStorage.removeItem('apiToken')

        router.push('/admin')
      }

      const init = () => {
        verificarLogin()
      }

      onMounted(() => {
        init()
      })

      return {
        isLoggedIn,
        mobomenu,
        logout
      }
    }
  })
</script>
