# 🥇 GoldVest

> **GoldVest** adalah project Fullstack Developer yang saya bangun sebagai media pembelajaran untuk mengembangkan kemampuan dalam membangun aplikasi fintech berbasis investasi emas menggunakan teknologi modern.

> ⚠️ **Disclaimer**
>
> Project ini dibuat **untuk kebutuhan belajar dan pengembangan portofolio**.
> Data harga emas **tidak menggunakan API pihak ketiga maupun data realtime**, melainkan **diinput secara manual oleh Admin** sebagai simulasi proses transaksi investasi emas.

---

# 📖 Tentang Project

GoldVest merupakan simulasi aplikasi investasi emas digital yang dikembangkan menggunakan arsitektur Fullstack modern.

Project ini dibuat untuk mempelajari bagaimana membangun aplikasi fintech mulai dari perancangan database, pengembangan REST API, autentikasi, hingga integrasi frontend dan backend.

## Status Project

- ✅ Backend Development
- ✅ Frontend Development
- ✅ REST API
- ✅ Authentication & Authorization
- ✅ PostgreSQL Database
- ✅ Prisma ORM
- ✅ Swagger API Documentation
- ✅ Frontend & Backend Integration
- 🚧 Pengembangan fitur lanjutan masih berlangsung

---

# ✨ Fitur

## 👤 Authentication

- Register
- Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Route

---

## 📊 Dashboard

- Ringkasan Portfolio
- Saldo Wallet
- Total Kepemilikan Emas
- Nilai Aset
- Total Kekayaan
- Grafik Harga Emas

---

## 💰 Wallet

- Informasi Saldo
- Top Up Wallet
- Withdraw Wallet
- Riwayat Wallet

---

## 🪙 Portfolio

- Total Gram Emas
- Harga Beli Rata-rata
- Nilai Aset Saat Ini

---

## 🔄 Transaction

- Pembelian Emas
- Penjualan Emas
- Riwayat Transaksi

---

## 👨‍💼 Admin

- Tambah Harga Emas
- Edit Harga Emas
- Hapus Harga Emas
- Riwayat Harga Emas

> Harga emas diinput secara manual oleh Admin sebagai simulasi proses transaksi investasi emas.

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Zustand
- TanStack React Query
- Recharts
- Lucide React

---

## Backend

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT
- bcrypt
- Multer
- Swagger

---

# 📂 Struktur Project

```
GoldVest
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
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
│   └── .env
│
└── README.md
```

---

# 🏗 Backend Architecture

Backend menggunakan konsep **Layered Architecture**.

```
Client
   │
Routes
   │
Controllers
   │
Services
   │
Repositories
   │
Prisma ORM
   │
PostgreSQL
```

## Penjelasan

- **Routes** menerima request dari client.
- **Controllers** menangani request dan response.
- **Services** berisi business logic.
- **Repositories** berinteraksi langsung dengan database menggunakan Prisma ORM.
- **Database** menggunakan PostgreSQL.

Pendekatan ini membuat project lebih mudah dikembangkan, dipelihara, dan scalable.

---

# 🔐 Authentication

Authentication menggunakan:

- JSON Web Token (JWT)
- Password Hashing (bcrypt)
- Authentication Middleware
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

# 📄 API Documentation

Backend telah dilengkapi dokumentasi API menggunakan Swagger.
```
https://goldvest-production.up.railway.app/api-docs/
```
http://localhost:5000/api-docs
```

---

# 📋 Prerequisites

Pastikan telah menginstal:

- Node.js (v18+)
- PostgreSQL
- Git
- npm

---

# 🚀 Cara Menjalankan Project

## 1. Clone Repository

```bash
git clone https://github.com/rayhan204/GoldVest.git

cd GoldVest
```

---

# 🚀 Menjalankan Backend

Masuk ke folder server

```bash
cd server
```

Install dependency

```bash
npm install
```

Buat file `.env`

```env
DATABASE_URL=postgresql://username:password@localhost:5432/goldvest
JWT_SECRET=your_secret_key
PORT=5000
```

Generate Prisma Client

```bash
npx prisma generate
```

Jalankan Migration

```bash
npx prisma migrate dev
```

Menjalankan Backend

```bash
npm run dev
```

Backend berjalan di:

```
http://localhost:5000
```

Swagger API:

```
http://localhost:5000/api-docs
```

---

# 💻 Menjalankan Frontend

Buka terminal baru.

Masuk ke folder client

```bash
cd client
```

Install dependency

```bash
npm install
```

Buat file `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Menjalankan Frontend

```bash
npm run dev
```

Frontend berjalan di:

```
http://localhost:5173
```

---

# 📸 Tampilan Aplikasi

### Authentication

- Login
- Register

### Dashboard

- Ringkasan Portfolio
- Grafik Harga Emas
- Statistik Investasi

### Wallet

- Top Up
- Withdraw
- Riwayat Wallet

### Portfolio

- Informasi Kepemilikan Emas

### Transaction

- Pembelian Emas
- Penjualan Emas
- Riwayat Transaksi

### Admin

- CRUD Harga Emas

---

# 🎯 Tujuan Project

Project ini dibuat sebagai media pembelajaran untuk meningkatkan kemampuan dalam:

- Fullstack Development
- React.js
- Express.js
- PostgreSQL
- Prisma ORM
- REST API
- JWT Authentication
- Layered Architecture
- Database Design
- API Documentation
- Frontend & Backend Integration

---

# 📌 Roadmap Pengembangan

Beberapa fitur yang direncanakan:

- Refresh Token Authentication
- Role Based Authorization
- Upload Foto Profil
- Dashboard Analytics
- Unit Testing
- Docker
- CI/CD
- Deployment
- Integrasi API Harga Emas Realtime

---

# 👨‍💻 Developer

**Rayhan**

Informatics Engineering Student | Fullstack Developer Enthusiast

GitHub

https://github.com/rayhan204

LinkedIn

https://www.linkedin.com/in/rayhan-ray-022933244/

---

# 📝 Catatan

GoldVest merupakan project portofolio yang dikembangkan sebagai simulasi aplikasi investasi emas digital.

Fokus utama project adalah implementasi Fullstack Development, Layered Architecture, REST API, autentikasi menggunakan JWT, manajemen database dengan PostgreSQL & Prisma ORM, dokumentasi API menggunakan Swagger, serta integrasi frontend dan backend.

Project ini **tidak ditujukan untuk kebutuhan produksi** dan **tidak menggunakan data harga emas secara realtime**.