# Product Manager - Vue 3 + Vite

Aplikasi CRUD produk dengan login menggunakan Vue 3, Vite, Vue Router, dan Pinia.

## Struktur Folder

```
product-manager/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js              # Entry point
    ├── App.vue              # Root component
    ├── assets/
    │   └── main.css         # Global styles
    ├── router/
    │   └── index.js         # Vue Router + Navigation Guard
    ├── stores/
    │   ├── auth.js          # Pinia store: login/logout
    │   ├── product.js       # Pinia store: CRUD produk
    │   └── toast.js         # Pinia store: notifikasi
    ├── views/
    │   ├── LoginView.vue    # Halaman Login
    │   └── ProductView.vue  # Halaman CRUD Produk
    └── components/
        ├── ProductModal.vue     # Modal tambah/edit
        ├── ConfirmDelete.vue    # Modal konfirmasi hapus
        └── ToastNotification.vue # Notifikasi toast
```

## Cara Menjalankan

```bash
# 1. Masuk ke folder project
cd product-manager

# 2. Install dependencies
npm install

# 3. Jalankan dev server
npm run dev
```

Buka browser ke `http://localhost:5173`

## Akun Login (Hardcode)

| Username | Password  |
|----------|-----------|
| admin    | admin123  |
| user     | user123   |

## Fitur

- ✅ Login / Logout dengan auth guard (Vue Router)
- ✅ State management dengan Pinia
- ✅ CRUD Produk (Create, Read, Update, Delete)
- ✅ Search & filter by kategori
- ✅ Toast notifikasi
- ✅ Konfirmasi sebelum hapus
