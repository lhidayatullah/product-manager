<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="confirm-modal">
      <div class="confirm-icon">🗑️</div>
      <div class="confirm-title">Hapus Produk?</div>
      <div class="confirm-text">
        Yakin hapus <strong>{{ product?.title }}</strong>?<br />
        Aksi ini tidak bisa dibatalkan.
      </div>
      <div class="confirm-actions">
        <button class="btn-cancel" @click="$emit('cancel')">Batal</button>
        <button class="btn-confirm-delete" @click="$emit('confirm')">Hapus</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: Object })
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}
.confirm-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  width: 380px;
  padding: 32px;
  animation: slideUp 0.25s ease;
  text-align: center;
}
.confirm-icon { font-size: 40px; margin-bottom: 16px; }
.confirm-title {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
}
.confirm-text { color: var(--muted); font-size: 14px; margin-bottom: 28px; }
.confirm-actions { display: flex; gap: 12px; justify-content: center; }
.btn-cancel {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 10px 20px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  transition: all 0.2s;
}
.btn-cancel:hover { border-color: var(--text); color: var(--text); }
.btn-confirm-delete {
  background: var(--danger);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  transition: opacity 0.2s;
}
.btn-confirm-delete:hover { opacity: 0.85; }
</style>
