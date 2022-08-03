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
  timeFilter (value, withYear = false, withHour = false) {
    const publicationTime = new Date(value)
    const currentDate = new Date()
    const monthsList = ['janv.', 'fév.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'dec.']

    const month = monthsList[publicationTime.getMonth()]
    const years = (currentDate.getFullYear() !== publicationTime.getFullYear()) || !withYear ? publicationTime.getFullYear() : ''
    const hours = publicationTime.getHours() < 10 ? `0${publicationTime.getHours()}` : publicationTime.getHours()
    const minutes = publicationTime.getMinutes() < 10 ? `0${publicationTime.getMinutes()}` : publicationTime.getMinutes()
    const exactTime = !withHour ? `${hours}:${minutes} • ` : ''

    return `${exactTime}${publicationTime.getDay()} ${month} ${years}`
  }
}

router.isReady().then(() => app.mount('#app'))
