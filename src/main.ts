import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/app.scss"
import "bootstrap/dist/js/bootstrap"
import axios, {AxiosStatic} from "axios";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faFacebook, faFontAwesome, faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {EnvironmentHelper} from "@/EnvironnementHelper";

library.add(faLinkedin)
library.add(faFacebook)
library.add(faFontAwesome)
Vue.component('font-awesome-icon', FontAwesomeIcon)
interface Env {
  apiUrl:string
  url:string
}
const environmentHelper = new EnvironmentHelper()
let  env:Env;
if (environmentHelper.isDevelopment){
  env = {apiUrl: 'https://localhost:8000/api', url: 'https://localhost:8000'}
}else {
  env = {apiUrl: 'https://portfolio.galcera.ovh/api', url: 'https://portfolio.galcera.ovh'}

}
axios.defaults.baseURL = env.apiUrl
Vue.prototype.$env = env
Vue.prototype.$axios = axios
declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
  }
}
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
