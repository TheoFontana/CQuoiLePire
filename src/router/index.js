import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Game from '@/views/Game.vue'
import Data from '@/views/Data.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/game',
    name: 'Game',
    component: Game
  },
  {
    path: '/data',
    name: 'Data',
    component: Data
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
