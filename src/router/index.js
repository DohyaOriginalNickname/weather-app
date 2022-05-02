import { createRouter, createWebHistory } from 'vue-router'
import SearchLocation from '@/components/searchLocation'
import Home from '@/components/Home'

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/search',
    component: SearchLocation
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
