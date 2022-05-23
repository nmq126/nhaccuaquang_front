window.axios = require('axios')
let token = JSON.parse( localStorage.getItem('token') );
if( token ){
  window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// import '../dist/output.css'
import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'

import VueToastr from '@deveodk/vue-toastr'
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css'
Vue.use(VueToastr)

Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router

}).$mount('#app')
