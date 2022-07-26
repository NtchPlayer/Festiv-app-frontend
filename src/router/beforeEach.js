import store from '@/store'

export default async function beforeEach ({ to, from, next }) {
  if (to.meta.requireAuth && to.name !== 'login') {
    await store.dispatch('auth/checkUserSession')
  }
  if (!store.state.auth.status.loggedIn && to.meta.requireAuth) {
    next({ name: 'login' })
  } else if (store.state.auth.status.loggedIn && !to.meta.requireAuth) {
    next({ name: 'home' })
  } else {
    // await store.dispatch('auth/logout')
    next()
  }
}
