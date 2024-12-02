import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import LoginView from '@/views/LoginView.vue'
import PegawaiView from '@/views/PegawaiView.vue'
import BarangView from '@/views/BarangView.vue'
import UserManagement from '@/views/UserManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/menu',
      name: 'menu',
      component: MenuView,
      meta: { requiresAuth: true },
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      component: PegawaiView,
      meta: { requiresAuth: true },
    },
    {
      path: '/barang',
      name: 'barang',
      component: BarangView,
      meta: { requiresAuth: true },
    },
    {
      path: '/user-management',
      name: 'user-management',
      component: UserManagement,
      meta: { requiresAuth: true },
    }
  ],
})

export default router