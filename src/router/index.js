import { createRouter, createWebHistory } from 'vue-router'
import beforeEach from './beforeEach'

import HomeView from '../views/HomeView.vue'

const routes = [{
  path: '/',
  name: 'home',
  meta: { requireAuth: true },
  component: HomeView
}, {
  path: '/:name',
  name: 'profile',
  meta: { requireAuth: true },
  component: () => import(/* webpackChunkName: "profile" */ '../views/ProfileView.vue')
}, {
  path: '/search',
  name: 'search',
  meta: { requireAuth: true },
  component: () => import(/* webpackChunkName: "search" */ '../views/SearchView.vue')
}, {
  path: '/about',
  name: 'about',
  meta: { requireAuth: false },
  // route level code-splitting
  // this generates a separate chunk (about.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
}, {
  path: '/auth',
  redirect: { name: 'login' },
  meta: { requireAuth: false },
  component: () => import(/* webpackChunkName: "auth" */ '../views/AuthView.vue'),
  children: [{
    path: 'login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/auth/LoginView.vue')
  }, {
    path: 'signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/auth/SignupView.vue')
  }]
}, {
  path: '/:pathMatch(.*)*',
  redirect: '/'
}]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => beforeEach({ to, from, next }))

export default router
