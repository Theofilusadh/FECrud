<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/counter'

const store = useUserStore()
const users = ref([])
const newUser = ref({ name: '', email: '', password: '' })
const editingUser = ref(null)
const isEditing = ref(false)

const userName = computed({
  get: () => isEditing.value ? editingUser.value.name : newUser.value.name,
  set: (value) => {
    if (isEditing.value) {
      editingUser.value.name = value
    } else {
      newUser.value.name = value
    }
  }
})

const userEmail = computed({
  get: () => isEditing.value ? editingUser.value.email : newUser.value.email,
  set: (value) => {
    if (isEditing.value) {
      editingUser.value.email = value
    } else {
      newUser.value.email = value
    }
  }
})

const fetchUsers = async () => {
  try {
    console.log('Fetching users with token:', store.token)
    const response = await axios.get('http://127.0.0.1:8000/api/users', {
      headers: { Authorization: `Bearer ${store.token}` }
    })
    console.log('Users response:', response.data)
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message)
  }
}

const addUser = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/users', newUser.value, {
      headers: { Authorization: `Bearer ${store.token}` }
    })
    newUser.value = { name: '', email: '', password: '' }
    await fetchUsers()
  } catch (error) {
    console.error('Error adding user:', error)
  }
}

const startEdit = (user) => {
  editingUser.value = { ...user }
  isEditing.value = true
}

const updateUser = async () => {
  try {
    await axios.put(`http://127.0.0.1:8000/api/users/${editingUser.value.id}`, editingUser.value, {
      headers: { Authorization: `Bearer ${store.token}` }
    })
    isEditing.value = false
    editingUser.value = null
    await fetchUsers()
  } catch (error) {
    console.error('Error updating user:', error)
  }
}

const deleteUser = async (id) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${store.token}` }
      })
      await fetchUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

onMounted(() => {
  console.log('Component mounted, token:', store.token)
  fetchUsers()
})
</script>

<template>
  <div>
    <h2 class="mb-4">User Management</h2>
    
    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title mb-3">{{ isEditing ? 'Edit User' : 'Add New User' }}</h3>
        <form @submit.prevent="isEditing ? updateUser() : addUser()">
          <div class="mb-3">
            <input 
              v-model="userName"
              class="form-control" 
              placeholder="Name" 
              required
            >
          </div>
          <div class="mb-3">
            <input 
              v-model="userEmail"
              type="email" 
              class="form-control" 
              placeholder="Email" 
              required
            >
          </div>
          <div class="mb-3" v-if="!isEditing">
            <input 
              v-model="newUser.password" 
              type="password" 
              class="form-control" 
              placeholder="Password" 
              required
            >
          </div>
          <button type="submit" class="btn btn-primary me-2">
            {{ isEditing ? 'Update User' : 'Add User' }}
          </button>
          <button v-if="isEditing" @click="isEditing = false; editingUser = null" type="button" class="btn btn-secondary">
            Cancel
          </button>
        </form>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h3 class="card-title mb-3">User List</h3>
        <div class="list-group">
          <div v-for="user in users" :key="user.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ user.name }}</h5>
              <small class="text-muted">{{ user.email }}</small>
            </div>
            <div>
              <button @click="startEdit(user)" class="btn btn-sm btn-outline-primary me-2">Edit</button>
              <button @click="deleteUser(user.id)" class="btn btn-sm btn-outline-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>