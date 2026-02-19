<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-logo">Product<span>.</span><br>Manager</div>
      <div class="login-sub">Masuk untuk mengelola data produk</div>

      <div class="field-group">
        <label class="field-label">Username</label>
        <input
          class="field-input"
          type="text"
          v-model="username"
          placeholder="input username"
          @keyup.enter="doLogin"
        />
      </div>

      <div class="field-group">
        <label class="field-label">Password</label>
        <input
          class="field-input"
          type="password"
          v-model="password"
          placeholder="input password"
          @keyup.enter="doLogin"
        />
      </div>

      <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

      <button class="btn-primary" @click="doLogin" style="margin-top: 8px">
        MASUK
      </button>

      <div class="login-hint">
        Demo credentials:<br />
        <strong>admin</strong> / <strong>admin123</strong> &nbsp;atau&nbsp;
        <strong>user</strong> / <strong>user123</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const errorMsg = ref('')

function doLogin() {
  const ok = auth.login(username.value, password.value)
  if (ok) {
    router.push({ name: 'products' })
  } else {
    errorMsg.value = 'Username atau password salah!'
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 30% 50%, #1a1a00 0%, #0d0d0d 60%);
  position: relative;
  overflow: hidden;
}
.login-page::before {
  content: 'PRODUCT\AMANAGER';
  white-space: pre;
  position: absolute;
  top: -40px;
  left: -20px;
  font-family: 'Syne', sans-serif;
  font-size: 180px;
  font-weight: 800;
  color: rgba(255, 255, 255, 0.02);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.login-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 48px;
  width: 400px;
  position: relative;
  animation: slideUp 0.5s ease;
}
.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent);
}
.login-logo {
  font-family: 'Syne', sans-serif;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 8px;
  text-align: center;
  line-height: 1.2;
  word-break: break-word;
}
.login-logo span { color: var(--accent); }
.login-sub {
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 36px;
}
.error-msg {
  color: var(--danger);
  font-size: 12px;
  margin-top: 8px;
}
.login-hint {
  margin-top: 20px;
  padding: 12px;
  background: var(--surface2);
  border-radius: 3px;
  font-size: 12px;
  color: var(--muted);
  line-height: 1.6;
}
.login-hint strong { color: var(--accent2); }
</style>
