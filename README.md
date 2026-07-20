# 🥇 GoldVest

> **GoldVest** merupakan project pribadi Fullstack Developer yang saya bangun sebagai media pembelajaran untuk mengembangkan kemampuan dalam membangun aplikasi fintech berbasis investasi emas menggunakan teknologi modern.

> **⚠️ Disclaimer**
>
> Project ini dibuat **hanya untuk kebutuhan belajar dan pengembangan portofolio**.
> Data harga emas **tidak menggunakan API pihak ketiga maupun data realtime**, melainkan **diinput secara manual oleh Admin** sebagai simulasi proses transaksi investasi emas.

---

# 📖 Tentang Project

GoldVest merupakan simulasi aplikasi investasi emas digital yang dikembangkan dengan konsep Fullstack Development.

Tujuan utama project ini adalah mempelajari bagaimana membangun aplikasi skala nyata mulai dari:

- Perancangan Database
- RESTful API
- Authentication & Authorization
- Backend Architecture
- Integrasi Database
- Dokumentasi API
- Integrasi Frontend dan Backend

Saat ini progress project adalah:

- ✅ Backend selesai dikembangkan
- 🚧 Frontend masih dalam tahap pengembangan menggunakan React.js + Vite

Project ini dibangun sebagai latihan agar memahami alur pengembangan aplikasi fintech dari sisi backend maupun frontend.

---

# ✨ Fitur yang Sudah Dibuat

## Authentication

- Registrasi User
- Login User
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Route

---

## Dashboard

- Informasi Saldo Wallet
- Total Kepemilikan Emas
- Nilai Aset
- Total Kekayaan

---

## Wallet

- Informasi Saldo
- Manajemen Saldo Wallet

---

## Portfolio Emas

- Total Gram Emas
- Harga Beli Rata-rata
- Perhitungan Nilai Aset

---

## Transaksi

- Pembelian Emas
- Penjualan Emas
- Riwayat Transaksi

---

## Manajemen Harga Emas (Admin)

- Tambah Harga Emas
- Edit Harga Emas
- Hapus Harga Emas
- Riwayat Harga Emas

> Harga emas **diinput secara manual oleh Admin**, bukan berasal dari API eksternal.
>
> Hal ini dilakukan karena fokus utama project adalah mempelajari implementasi business logic dan pengembangan backend.

---

# 🛠 Tech Stack

## Frontend (Masih Development)

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zustand
- React Query

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt
- Multer
- Swagger API Documentation

---

# 📂 Struktur Project

```
GoldVest
│
├── client/                 # Frontend (Development)
│
├── server/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── validations/
│   │   ├── docs/
│   │   └── server.js
│   │
│   ├── uploads/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

# 🏗️ Arsitektur Backend

Backend dikembangkan menggunakan konsep **Layered Architecture** agar setiap bagian memiliki tanggung jawab yang jelas.

```
Client

↓

Routes

↓

Controllers

↓

Services

↓

Repositories

↓

Prisma ORM

↓

PostgreSQL
```

### Penjelasan

- **Routes** menerima request dari client.
- **Controller** menangani request dan response.
- **Service** berisi business logic.
- **Repository** berinteraksi langsung dengan database menggunakan Prisma.
- **Database** menggunakan PostgreSQL.

Pendekatan ini membuat project lebih mudah dikembangkan, dipelihara, dan scalable.

---

# 🔐 Authentication

Sistem autentikasi menggunakan:

- JSON Web Token (JWT)
- Password Hashing menggunakan bcrypt
- Middleware Authentication
- Protected API

---

# 🗄 Database

Database yang digunakan:

- PostgreSQL

ORM:

- Prisma ORM

Entity utama:

- User
- Wallet
- Portfolio
- GoldPrice
- Transaction

---

# 📄 Dokumentasi API

Backend telah dilengkapi dengan dokumentasi API menggunakan **Swagger**.

Melalui Swagger seluruh endpoint dapat diuji secara langsung tanpa menggunakan aplikasi tambahan.

Endpoint dokumentasi:

```
/api-docs
```

---

# 🚀 Menjalankan Backend

Clone repository

```bash
git clone https://github.com/rayhan204/GoldVest.git
```

Masuk ke folder backend

```bash
cd GoldVest/server
```

Install dependency

```bash
npm install
```

Buat file `.env`

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

Generate Prisma Client

```bash
npx prisma generate
```

Migrasi Database

```bash
npx prisma migrate dev
```

Menjalankan server

```bash
npm run dev
```

---

# 🚧 Status Frontend

Frontend masih dalam proses pengembangan.

Beberapa fitur yang akan dikembangkan antara lain:

- Halaman Login
- Halaman Register
- Dashboard
- Wallet
- Portfolio
- Grafik Harga Emas
- Riwayat Transaksi
- Halaman Admin
- Responsive Design

Frontend dibangun menggunakan:

- React.js
- Vite
- Tailwind CSS

---

# 🎯 Tujuan Project

Project ini dibuat sebagai media belajar untuk meningkatkan kemampuan dalam:

- Fullstack Development
- RESTful API
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Backend Architecture
- Database Design
- API Documentation
- Frontend Integration

---

# 📌 Pengembangan Selanjutnya

Beberapa fitur yang direncanakan:

- Penyelesaian Frontend
- Dashboard Analytics
- Upload Foto Profil
- Refresh Token Authentication
- Role Based Authorization
- Unit Testing
- Docker
- CI/CD
- Deployment
- Integrasi API Harga Emas Realtime

---

# 👨‍💻 Developer

**Rayhan**

Mahasiswa Teknik Informatika | Fullstack Developer Enthusiast

GitHub

https://github.com/rayhan204

LinkedIn

https://www.linkedin.com/in/rayhan-ray-022933244/

---

# 📝 Catatan

Project ini merupakan project pribadi yang dikembangkan sebagai latihan membangun aplikasi Fullstack dengan studi kasus investasi emas digital.

Seluruh implementasi difokuskan pada pembelajaran arsitektur backend, autentikasi, manajemen database, dokumentasi API menggunakan Swagger, serta integrasi frontend dan backend.

Project ini **bukan aplikasi investasi emas yang digunakan untuk kebutuhan produksi** dan **tidak menggunakan data harga emas secara realtime**.
