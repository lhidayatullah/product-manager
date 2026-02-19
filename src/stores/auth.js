import { defineStore } from 'pinia'
import { ref } from 'vue'

const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'user', password: 'user123' },
]

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const currentUser = ref('')

  function login(username, password) {
    const found = USERS.find(
      (u) => u.username === username && u.password === password
    )
    if (found) {
      isLoggedIn.value = true
      currentUser.value = found.username
      return true
    }
    return false
  }

  function logout() {
    isLoggedIn.value = false
    currentUser.value = ''
  }

  return { isLoggedIn, currentUser, login, logout }
})
