import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import cadastrarPedido from '@/components/cadastrarPedido.vue'
import listarPedido from '@/components/list.vue'
import editarPedido from '@/components/editPedido.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path:'/cadastrar',
    name: 'cadastrarPedido',
    component: cadastrarPedido
  },

  {
    path: '/lista',
    name: 'listPedido',
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
