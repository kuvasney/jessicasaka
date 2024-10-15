// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Yrsa:ital,wght@0,300..700;1,300..700&display=swap', onload: 'this.onload=null;this.removeAttribute("media");', fetchpriority: 'high' }
      ],
      script: [
        { src: '//titulares.becompliance.com/becompliance.js', defer: true, async: true },
      ]
    }
  },
  runtimeConfig: { // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    public: {
      baseUrl: process.env.NUXT_ENV_API,
      JWT_SECRET: process.env.JWT_SECRET,
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PWD: process.env.EMAIL_PWD,
      EMAIL_USER: process.env.EMAIL_USER
    },
    MONGODB_USERNAME: process.env.MONGODB_USERNAME,
    MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/css/mediaquery.scss" as *; @use "@/assets/css/mixins.scss" as *;'
        }
      }
    }
  },

  css: ['@/assets/css/main.scss'],

  nitro: {
    plugins: ['~/server/index.ts']
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt']
})
