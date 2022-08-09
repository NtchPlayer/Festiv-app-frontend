import axios from 'axios'
import VueAxios from 'vue-axios'
import authHeader from '../services/auth-header.service'

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: authHeader()
})

export {
  axiosInstance,
  VueAxios
}
