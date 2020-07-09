import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: () => import('@/views/Discovery')
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: () => import('@/views/Playlists')
  },
  {
    path: '/songs',
    name: 'Songs',
    component: () => import('@/views/Songs')
  },
  {
    path: '/mvs',
    name: 'Mvs',
    component: () => import('@/views/Mvs')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
