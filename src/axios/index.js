import axios from 'axios'
import VueAxios from 'vue-axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

export {
  axiosInstance,
  VueAxios
}
