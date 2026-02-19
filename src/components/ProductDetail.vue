<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-top-bar"></div>
      <div class="modal-header">
        <div class="modal-title">Detail Produk</div>
        <button class="btn-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="detail-layout">
          <div class="detail-img">
            <img v-if="product.thumbnail" :src="product.thumbnail" />
            <div v-else class="img-placeholder">📦</div>
          </div>
          <div class="detail-info">
            <div class="detail-title">{{ product.title }}</div>
            <div class="detail-brand">{{ product.brand }}</div>
            <span class="badge">{{ product.category }}</span>
            <p class="detail-desc">{{ product.description }}</p>
            <div class="detail-grid">
              <div class="detail-item">
                <div class="detail-label">Harga</div>
                <div class="detail-value price">${{ product.price }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Diskon</div>
                <div class="detail-value" style="color:var(--accent)">{{ product.discountPercentage }}%</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Rating</div>
                <div class="detail-value rating">⭐ {{ product.rating }}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Stok</div>
                <div class="detail-value" :class="product.stock < 40 ? 'stock-low' : 'stock-ok'">{{ product.stock }} unit</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ product: Object })
defineEmits(['close'])
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.8);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}
.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  width: 580px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.25s ease;
}
.modal-top-bar { height: 3px; background: var(--accent2); border-radius: 4px 4px 0 0; }
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px 0;
  margin-bottom: 24px;
}
.modal-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; }
.btn-close {
  background: none;
  border: 1px solid var(--border);
  color: var(--muted);
  width: 32px; height: 32px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.btn-close:hover { border-color: var(--danger); color: var(--danger); }
.modal-body { padding: 0 28px 28px; }
.detail-layout { display: flex; gap: 24px; }
.detail-img img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--border);
}
.img-placeholder {
  width: 160px; height: 160px;
  background: var(--surface2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}
.detail-info { flex: 1; }
.detail-title { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 700; margin-bottom: 4px; }
.detail-brand { color: var(--muted); font-size: 13px; margin-bottom: 10px; }
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  background: var(--surface2);
  color: var(--accent2);
  border: 1px solid rgba(64,224,208,0.2);
  margin-bottom: 14px;
}
.detail-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 20px; }
.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.detail-item {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 12px;
}
.detail-label { font-size: 11px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
.detail-value { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; }
.price { color: var(--text); }
.rating { color: var(--accent); }
.stock-low { color: var(--danger); }
.stock-ok { color: var(--success); }
</style>