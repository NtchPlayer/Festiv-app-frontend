import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import FontAwesomeIcon from './fontawesome'
import { axiosInstance, VueAxios } from '@/axios'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueAxios, axiosInstance)
  .component('font-awesome-icon', FontAwesomeIcon)

app.config.globalProperties.$filters = {
  timeFilter (value) {
    const publicationTime = new Date(value)
    const currentDate = new Date()
    const monthsList = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'aout', 'sept.', 'oct.', 'nov.', 'dec.']

    const month = monthsList[publicationTime.getMonth()]
    const years = currentDate.getFullYear() !== publicationTime.getFullYear() ? publicationTime.getFullYear() : ''

    return `${publicationTime.getDay()} ${month} ${years}`
  }
}

router.isReady().then(() => app.mount('#app'))
