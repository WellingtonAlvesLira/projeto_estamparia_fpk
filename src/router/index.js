import Vue from 'vue'
import VueRouter from 'vue-router'
import listarPedido from '@/components/list'
import editarPedido from '@/components/editPedido'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'lista',
    component: listarPedido
  },

  {
    path: '/lista',
    name: 'lista',
    component: listarPedido
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: editarPedido
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
