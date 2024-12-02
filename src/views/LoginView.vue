<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const theRouter = useRouter()
const auth = ref(null)
const username = ref('')
const password = ref('')
const store = useUserStore()

const customConfig = {
  'Content-Type': 'application/json',
}

const bodyParameters = computed(() => {
  return {
    email: username.value,
    password: password.value,
  }
})

function login() {
  axios({
    url: 'http://127.0.0.1:8000/api/login',
    method: 'POST',
    headers: customConfig,
    data: bodyParameters.value,
  })
    .then((response) => {
      auth.value = response.data
      console.log(response.data)
      if (auth.value.success === true) {
        store.setEmail(username.value)
        store.setToken(auth.value.data)
        store.incrementCounter()
        theRouter.push('/menu')
      }
    })
    .catch((error) => {
      console.log('AJAX' + error)
    })
}
</script>

<template>
  <div class="row justify-content-center align-items-center min-vh-100">
    <div class="col-md-6 col-lg-4">
      <div class="card bg-light">
        <div class="card-body">
          <div class="text-center mb-4">
            <div
              class="bg-primary text-white d-inline-flex justify-content-center align-items-center rounded-circle mb-3"
              style="width: 64px; height: 64px"
            >
              <span class="fs-4 fw-bold">C</span>
            </div>
            <h2 class="card-title">SISTEM PENJUALAN</h2>
          </div>

          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="email"
                class="form-control"
                id="username"
                v-model="username"
                placeholder="vivi@yahoo.com"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">
              LOGIN <i class="bi bi-arrow-right ms-2"></i>
            </button>
          </form>

          <div class="mt-3">
            <small class="text-muted"
              >Don't have an account? <a href="#" class="text-primary">Register</a></small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
