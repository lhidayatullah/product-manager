# Product Manager - Vue 3 + Vite

Aplikasi CRUD produk dengan login menggunakan Vue 3, Vite, Vue Router, dan Pinia.

Untuk lebih mudahnya dapat mendownload langsung dari zip file dengan nama product-manager yang ada di github ini

Download file terlebih dahulu ke dalam penyimpanan perangkat

## Cara Menjalankan

```
# 1. ketikkan cmd pada kolom <img width="1189" height="487" alt="image" src="https://github.com/user-attachments/assets/79ecd910-1fce-4842-8d7f-f58750e436c9" />

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

## Fitur

- ✅ Login / Logout dengan auth guard (Vue Router)
- ✅ State management dengan Pinia
- ✅ CRUD Produk (Create, Read, Update, Delete)
- ✅ Search & filter by kategori
- ✅ Toast notifikasi
- ✅ Konfirmasi sebelum hapus
