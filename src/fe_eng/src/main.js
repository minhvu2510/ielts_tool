import Vue from 'vue'
// import './plugins/vuetify'

// import socketio from 'socket.io-client'
// import VueSocketIO from 'vue-socketio'
//
// Vue.use(VueSocketIO, socketio(process.env.SOCKET_SERVER + '/supervisor'))

import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import VueSingleSelect from 'vue-single-select'
// import { Message } from 'element-ui'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)

// import './permission' // permission control
// import './test'
import VueCookies from 'vue-cookies'

import * as filters from './filters' // global filters
import locale from '@/lang/vi'
import VueSession from 'vue-session'
import vueResource from 'vue-resource'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue)
Vue.use(VueSession)
Vue.use(VueSingleSelect)
Vue.use(vueResource)
Vue.use(VueCookies)
// Vue.use(VueRightClick)
Vue.use(Element, {
  size: 'small', // set element-ui default size
  locale
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import { getToken } from '@/utils/auth'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  watch: {
    '$route': 'checkLogin()'
  },
  components: { App },
  mounted() {
    this.checkLogin()
  },
  created() {
    // this.$session.start()
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      if (!getToken()) {
        this.$router.push('/login')
      }
      // this.$session.set('token', this.$cookies.get('token'))
      // this.$session.set('otp', this.$cookies.get('otp'))
      // // }
      // if (!this.$session.get('token')) {
      //   console.log('aaaaa')
      //   this.$router.push('/login')
      // } else {
      //   if (!this.$session.get('otp')) {
      //     this.$router.push('/authen')
      //   }
      // }
    }
  }
})
