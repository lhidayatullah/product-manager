<template>
  <div class="toast-wrap">
    <div
      v-for="t in toast.toasts"
      :key="t.id"
      class="toast"
      :class="t.type"
    >
      {{ t.msg }}
    </div>
  </div>
</template>

<script setup>
import { useToastStore } from '../stores/toast'
const toast = useToastStore()
</script>

<style scoped>
.toast-wrap {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toast {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 12px 20px;
  font-size: 13px;
  animation: slideRight 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}
.toast.success { border-left: 3px solid var(--success); }
.toast.error { border-left: 3px solid var(--danger); }
</style>
