<script setup>
import { useUserStore } from '@/stores/counter'

const store = useUserStore()

function increase() {
  store.theCounter++
}
</script>

<template>
  <div>
    <h2 class="mb-4">Pegawai</h2>
    <div class="card">
      <div class="card-body">
        <h3 class="card-title mb-3">Counter: {{ store.theCounter }}</h3>
        <button @click="increase" class="btn btn-primary">Increase Counter</button>
      </div>
    </div>
  </div>
</template>