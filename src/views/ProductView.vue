<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-brand">Product<span>.</span>Manager</div>
      <div class="nav-right">
        <span class="nav-user">👤 {{ auth.currentUser }}</span>
        <button class="btn-logout" @click="doLogout">Logout</button>
      </div>
    </nav>

    <!-- Main -->
    <div class="main-container">
      <div class="page-header">
        <div>
          <div class="page-title">Daftar Produk</div>
          <div class="page-count">{{ filteredProducts.length }} produk ditemukan</div>
        </div>
        <button v-if="auth.currentUser === 'admin'" class="btn-add" @click="openAddModal">+ Tambah Produk</button>
      </div>

      <!-- Search & Filter -->
      <div class="search-bar">
        <input
          class="search-input"
          type="text"
          v-model="search"
          placeholder="Cari produk, brand..."
        />
        <select class="filter-select" v-model="filterCategory">
          <option value="">Semua Kategori</option>
          <option v-for="c in productStore.categories" :key="c" :value="c">
            {{ c }}
          </option>
        </select>
      </div>

      <!-- Table -->
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Diskon</th>
              <th>Rating</th>
              <th>Stok</th>
              <th v-if="auth.currentUser === 'admin'">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="7">
                <div class="empty-state">
                  <div class="empty-icon">📦</div>
                  <div>Tidak ada produk ditemukan</div>
                </div>
              </td>
            </tr>
            <tr v-for="p in filteredProducts" :key="p.id" @click="openDetail(p)" style="cursor:pointer">
              <td>
                <div style="display: flex; align-items: center; gap: 12px">
                  <img
                    v-if="p.thumbnail"
                    :src="p.thumbnail"
                    class="product-thumb"
                  />
                  <div v-else class="product-thumb-placeholder">📱</div>
                  <div>
                    <div class="product-title">{{ p.title }}</div>
                    <div class="product-brand">{{ p.brand }}</div>
                  </div>
                </div>
              </td>
              <td><span class="badge">{{ p.category }}</span></td>
              <td><span class="price">${{ p.price }}</span></td>
              <td style="color: var(--accent)">{{ p.discountPercentage }}%</td>
              <td><span class="rating">⭐ {{ p.rating }}</span></td>
              <td :class="p.stock < 40 ? 'stock-low' : 'stock-ok'">{{ p.stock }}</td>
              <td v-if="auth.currentUser === 'admin'">
                <div class="action-btns">
                    <button class="btn-edit" @click="openEditModal(p)">Edit</button>
                    <button class="btn-delete" @click="confirmDelete(p)">Hapus</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Add/Edit -->
    <ProductModal
      v-if="showModal"
      :edit-mode="editMode"
      :initial-data="formData"
      @save="saveProduct"
      @close="showModal = false"
    />

    <!-- Modal Konfirmasi Hapus -->
    <ConfirmDelete
      v-if="showDeleteConfirm"
      :product="deleteTarget"
      @confirm="deleteProduct"
      @cancel="showDeleteConfirm = false"
    />

    <!-- Modal Detail -->
    <ProductDetail
      v-if="showDetail"
      :product="detailTarget"
      @close="showDetail = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/product'
import { useToastStore } from '../stores/toast'
import ProductModal from '../components/ProductModal.vue'
import ProductDetail from '../components/ProductDetail.vue'
import ConfirmDelete from '../components/ConfirmDelete.vue'

const router = useRouter()
const auth = useAuthStore()
const productStore = useProductStore()
const toast = useToastStore()

const search = ref('')
const filterCategory = ref('')
const showModal = ref(false)
const editMode = ref(false)
const editId = ref(null)
const formData = ref(null)
const showDeleteConfirm = ref(false)
const deleteTarget = ref(null)

const filteredProducts = computed(() =>
  productStore.products.filter((p) => {
    const q = search.value.toLowerCase()
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    const matchCat = !filterCategory.value || p.category === filterCategory.value
    return matchSearch && matchCat
  })
)

const showDetail = ref(false)
const detailTarget = ref(null)

function openDetail(p) {
  detailTarget.value = p
  showDetail.value = true
}

function doLogout() {
  auth.logout()
  router.push({ name: 'login' })
}

function openAddModal() {
  editMode.value = false
  formData.value = null
  showModal.value = true
}

function openEditModal(p) {
  editMode.value = true
  editId.value = p.id
  formData.value = { ...p }
  showModal.value = true
}

function saveProduct(data) {
  if (editMode.value) {
    productStore.updateProduct(editId.value, data)
    toast.show('Produk berhasil diupdate ✓', 'success')
  } else {
    productStore.addProduct(data)
    toast.show('Produk berhasil ditambahkan ✓', 'success')
  }
  showModal.value = false
}

function confirmDelete(p) {
  deleteTarget.value = p
  showDeleteConfirm.value = true
}

function deleteProduct() {
  productStore.deleteProduct(deleteTarget.value.id)
  showDeleteConfirm.value = false
  toast.show('Produk berhasil dihapus', 'success')
}
</script>

<style scoped>
.navbar {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-brand {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 800;
}
.nav-brand span { color: var(--accent); }
.nav-right { display: flex; align-items: center; gap: 16px; }
.nav-user { font-size: 13px; color: var(--muted); }
.btn-logout {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 6px 14px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}
.btn-logout:hover { border-color: var(--danger); color: var(--danger); }
.main-container { padding: 32px; max-width: 1400px; margin: 0 auto; }
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
}
.page-title {
  font-family: 'Syne', sans-serif;
  font-size: 32px;
  font-weight: 800;
}
.page-count { font-size: 13px; color: var(--muted); margin-top: 2px; }
.btn-add {
  background: var(--accent);
  color: #000;
  border: none;
  padding: 11px 22px;
  border-radius: 3px;
  cursor: pointer;
  font-family: 'Syne', sans-serif;
  font-size: 13px;
  font-weight: 700;
  transition: opacity 0.2s;
}
.btn-add:hover { opacity: 0.85; }
.search-bar { display: flex; gap: 12px; margin-bottom: 24px; }
.search-input {
  flex: 1;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 10px 16px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.search-input:focus { border-color: var(--accent); }
.filter-select {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 3px;
  padding: 10px 14px;
  color: var(--text);
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  cursor: pointer;
}
.table-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
}
table { width: 100%; border-collapse: collapse; }
thead { background: var(--surface2); border-bottom: 1px solid var(--border); }
th {
  padding: 12px 16px;
  text-align: left;
  font-family: 'Syne', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--muted);
}
td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  font-size: 14px;
  vertical-align: middle;
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: rgba(255, 255, 255, 0.02); }
.product-thumb {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  object-fit: cover;
}
.product-thumb-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 4px;
  background: var(--surface2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}
.product-title { font-weight: 500; }
.product-brand { font-size: 12px; color: var(--muted); }
.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 500;
  background: var(--surface2);
  color: var(--accent2);
  border: 1px solid rgba(64, 224, 208, 0.2);
}
.price { font-weight: 600; font-family: 'Syne', sans-serif; }
.rating { color: var(--accent); font-weight: 500; }
.stock-low { color: var(--danger); }
.stock-ok { color: var(--success); }
.action-btns { display: flex; gap: 8px; }
.btn-edit {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 5px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}
.btn-edit:hover { border-color: var(--accent); color: var(--accent); }
.btn-delete {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 5px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'DM Sans', sans-serif;
  transition: all 0.2s;
}
.btn-delete:hover { border-color: var(--danger); color: var(--danger); }
.empty-state {
  text-align: center;
  padding: 60px;
  color: var(--muted);
}
.empty-icon { font-size: 48px; margin-bottom: 12px; }
</style>
