import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@/styles/theme.scss'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)
import zhHans from 'vuetify/es5/locale/zh-Hans'
// import colors from 'vuetify/lib/util/colors'

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      // light: {
      //   primary: '#ee44aa',
      //   secondary: '#424242',
      //   accent: '#82B1FF',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FFC107'
      // },
    }
  },
  icons: {
    iconfont: 'mdi' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  lang: {
    locales: { zhHans },
    current: 'zh-Hans'
  }
})
