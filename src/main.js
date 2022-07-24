import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FontAwesomeIcon from './fontawesome'
import { axiosInstance, VueAxios } from '@/axios'

createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axiosInstance)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
