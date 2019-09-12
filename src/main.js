import Vue from 'vue'
import App from '@/App'

import router from '@/router'
import store from '@/store'
import i18n from '@/i18n'
import vuetify from '@/plugins/vuetify'

import '@/plugins'
import '@/components'

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
