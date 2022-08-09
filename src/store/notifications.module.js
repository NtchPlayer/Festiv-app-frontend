export const notifications = {
  namespaced: true,
  state: {
    notification: null
  },
  actions: {
    emitNotification ({ commit }, data) {
      commit('createNotification', data)
    },
    deleteNotifications ({ commit }) {
      commit('removeNotification')
    }
  },
  mutations: {
    createNotification (state, data) {
      state.notification = {
        content: data.content,
        style: data.style
      }
    },
    removeNotification (state) {
      state.notification = null
    }
  }
}
