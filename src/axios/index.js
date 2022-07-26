import axios from 'axios'
import VueAxios from 'vue-axios'
import authHeader from '../services/auth-header.service'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: authHeader()
})

export {
  axiosInstance,
  VueAxios
}
