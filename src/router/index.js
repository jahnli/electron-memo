import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import Layout from '../components/layout/Layout';
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: Layout,
    children:[
      {path:'/',name:'home',component: () => import('../views/home/Home')}
    ]
  },
  {
    path: '/lock',
    name:'lock',
    component: () => import('../views/lock/Lock'),
  },
  {
    path: '/setting',
    name:'setting',
    component: () => import('../views/setting/Setting'),
  },
  {
    path: '/tools',
    name:'tools',
    component: () => import('../views/tools/Tools'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
