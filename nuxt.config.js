export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // eslint-disable-next-line quotes
    title: 'TODO',
    htmlAttrs: {
      lang: 'tr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { hid: 'description', name: 'description', content: 'Todo APP' },
      { name: 'theme-color', content: '#1620d7' },
      { name: 'msapplication-TileColor', content: '#1620d7' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '~/assets/styles/main.scss',
  ],

  target: 'static',

  loading: '~/components/PageLoading/PageLoading.vue',

  env: {
    baseUrl: process.env.NUXT_ENV_BASE_URL,
  },

  router: {
    base: process.env.NUXT_ENV_BASE_URL,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vueSelect/vueSelect.js',
    '~/plugins/clipboard/clipboard.js',
    { src: '~/plugins/vueToasted/vueToasted.js', ssr: false },
    '~/plugins/veeValidate/veeValidate.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/apollo',
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.NUXT_ENV_APOLLO_ENDPOINT,
      },
    },
  },

  svgSprite: {
    input: '~/assets/svg/original',
    output: '~/assets/svg/generated',
    defaultSprite: 'sprite',
    elementClass: 'c-icon',
    spriteClassPrefix: '',
  },

  // Storybook Options: https://storybook.nuxtjs.org/options/
  storybook: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
};
