import AuthService from '../services/auth.service'
const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    checkUserSession ({ commit, dispatch }) {
      return AuthService.getCurrentUser()
        .then((e) => {
          commit('setUser', {
            name: e.user.name,
            avatar: e.user.avatar?.url,
            id: e.user.id,
            accessToken: e.user.accessToken
          })
        })
        .catch(() => {
          AuthService.logout()
          dispatch('logout')
        })
    },
    logout ({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    signup ({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure (state) {
      state.status.loggedIn = false
      state.user = null
    },
    setUser (state, user) {
      state.user = user
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess (state) {
      state.status.loggedIn = false
    },
    registerFailure (state) {
      state.status.loggedIn = false
    }
  }
}
