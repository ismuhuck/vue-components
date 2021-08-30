import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/renderTest',
    name: 'renderTest',
    component: () => import('../views/renderTest.vue')
  },
  {
    path: '/Tabs',
    name: 'Tabs',
    component: () => import('../views/Tabs.vue')
  },
  {
    path: '/expand',
    name: 'expand',
    component: () => import('../views/expand.vue')
  },
  {
    path: '/slot',
    name: 'slot',
    component: () => import('../views/slot/slot.vue')
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('../views/ol/index.vue')
  },
  {
    path: '/css',
    name: 'Css',
    component: () => import('../views/css/css.vue'),
    redirect: '/css/radius',
    children: [
      {
        path: 'radius',
        name: '波浪绘制',
        component: () => import('../views/css/radius.vue')
      },
      {
        path: 'dowmload',
        name: '下载图片',
        component: () => import('../views/css/downloadImg.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
