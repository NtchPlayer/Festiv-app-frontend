import { createStore } from 'vuex'
import { auth } from './auth.module'
import { notifications } from './notifications.module'

export default createStore({
  modules: {
    auth,
    notifications
  }
})
