import { createRouter, createWebHistory } from 'vue-router'
import SearchLocation from '@/components/searchLocation'
import Home from '@/components/Home'

const routes = [
  {
    path: '/',
    component: Home,
    meta:{
      enterClass: 'animate__animated animate__slideInLeft  animate__faster',
      leaveClass: 'animate__animated animate__slideOutRight   animate__faster'
    }
  },

  {
    path: '/search',
    component: SearchLocation,
    meta:{
      enterClass: 'animate__animated animate__slideInRight  animate__faster',
      leaveClass: 'animate__animated animate__slideOutLeft animate__faster'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
