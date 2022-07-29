import { axiosInstance } from '@/axios'

class AuthService {
  login (user) {
    return axiosInstance
      .post('auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        }
        return response.data
      })
      .catch((e) => {
        throw e
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    return axiosInstance.post('users/signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  getCurrentUser () {
    return axiosInstance.get('profile')
      .then((res) => {
        return res.data
      })
      .catch((e) => {
        throw e
      })
  }
}

export default new AuthService()
