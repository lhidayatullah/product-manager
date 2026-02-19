<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-top-bar"></div>
      <div class="modal-header">
        <div class="modal-title">{{ editMode ? 'Edit Produk' : 'Tambah Produk' }}</div>
        <button class="btn-close" @click="$emit('close')">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-grid">
          <div class="field-group full">
            <label class="field-label">Judul Produk</label>
            <input class="field-input" type="text" v-model="form.title" placeholder="Nama produk" />
          </div>
          <div class="field-group full">
            <label class="field-label">Deskripsi</label>
            <textarea
              class="field-input"
              v-model="form.description"
              rows="3"
              placeholder="Deskripsi produk"
              style="resize: vertical"
            ></textarea>
          </div>
          <div class="field-group">
            <label class="field-label">Brand</label>
            <input class="field-input" type="text" v-model="form.brand" placeholder="Brand" />
          </div>
          <div class="field-group">
            <label class="field-label">Kategori</label>
            <select class="field-input" v-model="form.category">
              <option value="" disabled>Select Kategori</option>
              <option value="smartphones">Smartphones</option>
              <option value="laptops">Laptops</option>
              <option value="fragrances">Fragrances</option>
              <option value="skincare">Skincare</option>
              <option value="groceries">Groceries</option>
              <option value="home-decoration">Home Decoration</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label">Harga ($)</label>
            <input class="field-input" type="number" v-model.number="form.price" placeholder="0" />
          </div>
          <div class="field-group">
            <label class="field-label">Diskon (%)</label>
            <input class="field-input" type="number" v-model.number="form.discountPercentage" step="0.01" placeholder="0" />
          </div>
          <div class="field-group">
            <label class="field-label">Rating</label>
            <input class="field-input" type="number" v-model.number="form.rating" step="0.01" min="0" max="5" placeholder="0-5" />
          </div>
          <div class="field-group">
            <label class="field-label">Stok</label>
            <input class="field-input" type="number" v-model.number="form.stock" placeholder="0" />
          </div>
          <div class="field-group full">
            <label class="field-label">Thumbnail</label>
            <div style="display:flex; gap:8px; margin-bottom:10px;">
              <button type="button" :class="['btn-toggle', thumbMode === 'url' ? 'active' : '']" @click="thumbMode = 'url'">URL</button>
              <button type="button" :class="['btn-toggle', thumbMode === 'file' ? 'active' : '']" @click="thumbMode = 'file'">Upload File</button>
            </div>
            <input
              v-if="thumbMode === 'url'"
              class="field-input"
              type="text"
              v-model="form.thumbnail"
              placeholder="https://..."
            />
            <input
              v-if="thumbMode === 'file'"
              type="file"
              accept="image/*"
              class="field-input"
              @change="handleImage"
            />
            <img v-if="form.thumbnail" :src="form.thumbnail" style="margin-top:8px; width:80px; height:80px; object-fit:cover; border-radius:4px;" />
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-cancel" @click="$emit('close')">Batal</button>
          <button class="btn-save" @click="handleSave">
            {{ editMode ? 'SIMPAN PERUBAHAN' : 'TAMBAH PRODUK' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useToastStore } from '../stores/toast'

const props = defineProps({
  editMode: Boolean,
  initialData: Object,
})
const emit = defineEmits(['save', 'close'])
const toast = useToastStore()

const form = reactive(
  props.initialData
    ? { ...props.initialData }
    : { title: '', description: '', brand: '', category: '', price: 0, discountPercentage: 0, rating: 0, stock: 0, thumbnail: '' }
)
const thumbMode = ref('url')

function handleSave() {
  if (!form.title.trim()) {
    toast.show('Judul produk wajib diisi!', 'error')
    return
  }
  emit('save', { ...form })
}

function handleImage(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => form.thumbnail = reader.result
  reader.readAsDataURL(file)
}
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
.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.25s ease;
}
.modal-top-bar {
  height: 3px;
  background: var(--accent);
  border-radius: 4px 4px 0 0;
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 28px 0;
  margin-bottom: 24px;
}
.modal-title {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 700;
}
.btn-close {
  background: none;
  border: 1px solid var(--border);
  color: var(--muted);
  width: 32px;
  height: 32px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}
.btn-close:hover { border-color: var(--danger); color: var(--danger); }
.modal-body { padding: 0 28px 28px; }
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.full { grid-column: 1 / -1; }
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}
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
.btn-save {
  background: var(--accent);
  color: #000;
  border: none;
  padding: 10px 24px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  transition: opacity 0.2s;
}
.btn-save:hover { opacity: 0.85; }
.btn-toggle {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 5px 14px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}
.btn-toggle.active {
  border-color: var(--accent);
  color: var(--accent);
}
</style>
