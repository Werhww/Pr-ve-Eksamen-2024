// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    'nuxt-quasar-ui',
    '@vueuse/nuxt'
  ],
  quasar: {
    iconSet: "material-symbols-rounded",
    extras: {
      fontIcons: [
        "material-symbols-rounded",
        "material-symbols-outlined",
        "material-symbols-sharp",
        "material-icons-outlined",
        "material-icons-round",
        "material-icons-sharp",
        "material-icons",
      ],

      svgIcons: [
        "material-symbols-rounded",
        "material-symbols-outlined",
        "material-symbols-sharp",
        "material-icons-outlined",
        "material-icons-round",
        "material-icons-sharp",
        "material-icons",
      ],
    },

    config: {
      dark: true,

      brand: {
        primary: '#0b0c0e',
        secondary: '#403829',
        accent: '#2f3130',
        dark: '#0b0c0e',

        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      },
    },
  }
})
