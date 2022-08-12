import { axiosInstance } from '@/axios'

class AuthService {
  login (user) {
    return axiosInstance
      .post('auth/login', {
        email: user.email,
        password: user.password
      }, {
        headers: null
      })
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data))
        delete axiosInstance.defaults.headers.common.Authorization
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`
        return response.data
      })
      .catch((e) => {
        throw e
      })
  }

  logout () {
    localStorage.removeItem('user')
    delete axiosInstance.defaults.headers.common.Authorization
  }

  register (user) {
    return axiosInstance.post('users/signup', {
      username: user.username,
      email: user.email,
      name: user.name,
      password: user.password,
      isProfessional: user.isProfessional,
      tags: user.tags
    })
  }

  getCurrentUser () {
    return axiosInstance.get('profile')
      .catch(() => {
        console.log('getCurrentUser')
        delete axiosInstance.defaults.headers.Authorization
      })
  }
}

export default new AuthService()
