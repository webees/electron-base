import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const files = require.context('.', true, /\.js$/)
const modules = []
files.keys().forEach(key => {
  if (key === './index.js') return
  modules.push(files(key).default)
})

const routes = [
  {
    path: '/',
    redirect: '/step_a'
  },
  {
    meta: {
      title: 'Check For Updates'
    },
    path: '/step_a',
    component: () => import(/* webpackChunkName: "step_a" */ '@/views/StepA')
  },
  {
    meta: {
      title: 'Major Version Upgrade'
    },
    path: '/step_a_major',
    component: () => import(/* webpackChunkName: "step_a_major" */ '@/views/StepAmajor')
  },
  {
    meta: {
      title: 'Patch Version Upgrade'
    },
    path: '/step_a_patch',
    component: () => import(/* webpackChunkName: "step_a_patch" */ '@/views/StepApatch')
  },
  {
    meta: {
      title: 'Please Connect ABCKEY'
    },
    path: '/step_b',
    component: () => import(/* webpackChunkName: "step_b" */ '@/views/StepB')
  },
  ...modules
]

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    return {
      y: 0
    }
  }
}

const router = new Router({
  base: process.env.BASE_URL,
  path: '/',
  routes,
  scrollBehavior,
  linkActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
  console.log(`%c█ router = ${to.path}`, 'background: rgba(0, 0, 255, 0.1);color: blue')
  if (to.path !== '/step_a' && from.path === '/') {
    // reload
    router.push({
      path: '/step_a'
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
