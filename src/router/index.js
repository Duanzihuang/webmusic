import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

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
    path: '/playlist/:id',
    name: 'Playlist',
    component: () => import('@/views/Playlist')
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
  },
  {
    path: '/mv/:id',
    name: 'Mv',
    component: () => import('@/views/Mv')
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('@/views/Result')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test')
  }
]

const router = new VueRouter({
  history: 'history',
  routes
})

export default router
