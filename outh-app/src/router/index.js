import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:{name: 'profile'}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      public: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    meta: {
      public: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
    const isPublic = to.matched.some(record => record.meta.public)
    const loggedIn = localStorage.getItem('token')

    if (!isPublic && !loggedIn && !from.meta.public) {
        return next({name: 'login'})
    }
    if (isPublic && loggedIn && from.meta.public) {
        return next({name: 'profile'})
    }

    next()
})

export default router
