<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/counter'
import Footer from './views/Footer.vue'

const store = useUserStore()
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <main class="container flex-grow-1 py-4">
      <RouterView />
    </main>

    <Footer />
  </div>
</template>