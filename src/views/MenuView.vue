<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { storeToRefs, createPinia } from 'pinia'

const pini = createPinia()
const store = useUserStore()
const { theCounter } = storeToRefs(store)
const theRouter = useRouter()

const customConfig = {
  headers: {
    Authorization: 'Bearer ' + store.token,
  },
}

function logout() {
  axios({
    url: 'http://127.0.0.1:8000/api/logout',
    method: 'GET',
    headers: customConfig.headers,
  })
    .then((response) => {
      console.log(response.data)
      if (response.data.success === true) {
        store.reset()
        theRouter.push('/')
      }
    })
    .catch((error) => {
      console.log('AJAX' + error)
    })
}
</script>

<template>
  <div>
    <h2 class="mb-4">Main Menu</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <RouterLink to="/pegawai" class="text-decoration-none">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">Edit Pegawai</h3>
            </div>
          </div>
        </RouterLink>
      </div>
      <div class="col-md-4">
        <RouterLink to="/barang" class="text-decoration-none">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">Edit Barang</h3>
            </div>
          </div>
        </RouterLink>
      </div>
      <div class="col-md-4">
        <RouterLink to="/user-management" class="text-decoration-none">
          <div class="card h-100">
            <div class="card-body">
              <h3 class="card-title">Manage Users</h3>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-4">
      <p class="mb-0">Counter: {{ theCounter }}</p>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
  </div>
</template>
