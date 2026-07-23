# 🚀 GoldVest Deployment Documentation

# Overview

GoldVest menggunakan arsitektur deployment modern dengan memisahkan Frontend, Backend, dan Database menjadi layanan independen.

Deployment dilakukan menggunakan cloud platform sehingga setiap komponen dapat di-scale dan di-maintain secara terpisah.

---

# Production Architecture

```text
                    Internet
                        │
                        │
        ┌───────────────┴────────────────┐
        │                                │
        ▼                                ▼
+------------------+          +---------------------+
|      Vercel      |          |      Railway        |
| React + Vite App |─────────▶| Express REST API    |
+------------------+          +----------+----------+
                                         │
                                         │ Prisma ORM
                                         ▼
                               +----------------------+
                               |   Neon PostgreSQL    |
                               |     Database         |
                               +----------------------+
```

---

# Infrastructure

| Component | Platform |
|------------|----------|
| Frontend | Vercel |
| Backend | Railway |
| Database | Neon PostgreSQL |
| ORM | Prisma ORM |
| API Documentation | Swagger |
| Version Control | GitHub |

---

# Deployment Flow

```text
Developer

↓

Git Commit

↓

GitHub Repository

↓

──────────────┬──────────────

              │

      Automatic Deployment

              │

      ┌───────┴────────┐

      ▼                ▼

   Vercel          Railway

      │                │

      └───────┬────────┘

              ▼

        Production Ready
```

---

# Frontend Deployment

Platform

```text
Vercel
```

Framework

```text
React + Vite
```

Build Command

```bash
npm run build
```

Output Directory

```text
dist
```

Environment Variable

```env
VITE_API_BASE_URL=https://goldvest-production.up.railway.app/api
```

Deployment Process

```text
Git Push

↓

Vercel detects new commit

↓

Install Dependencies

↓

Build Project

↓

Deploy

↓

Production URL Generated
```

---

# Backend Deployment

Platform

```text
Railway
```

Runtime

```text
Node.js
```

Build Command

```bash
npm install
```

Start Command

```bash
npm start
```

Environment Variables

```env
PORT=8080

DATABASE_URL=postgresql://...

ACCESS_TOKEN_SECRET=********

REFRESH_TOKEN_SECRET=********

NODE_ENV=production
```

Deployment Process

```text
Git Push

↓

Railway detects changes

↓

Install Dependencies

↓

Prisma Generate

↓

Start Express Server

↓

Production API Online
```

---

# Database Deployment

Platform

```text
Neon PostgreSQL
```

ORM

```text
Prisma ORM
```

Migration

```bash
npx prisma migrate deploy
```

Generate Prisma Client

```bash
npx prisma generate
```

Seed Admin

```bash
npm run seed
```

---

# Environment Configuration

## Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Production (Vercel)

```env
VITE_API_BASE_URL=https://goldvest-production.up.railway.app/api
```

---

## Backend (.env)

```env
DATABASE_URL=postgresql://...

ACCESS_TOKEN_SECRET=your_secret

REFRESH_TOKEN_SECRET=your_secret

PORT=5000
```

---

# Deployment Checklist

## Backend

- ✅ Install Dependencies
- ✅ Prisma Generate
- ✅ Prisma Migration
- ✅ Seed Admin
- ✅ Railway Variables
- ✅ CORS Configuration
- ✅ Swagger Running

---

## Frontend

- ✅ Build Success
- ✅ API Base URL
- ✅ Vercel Environment Variable
- ✅ React Router Rewrite
- ✅ Production Build

---

# CORS Configuration

Backend mengizinkan komunikasi dari Frontend.

```javascript
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://goldvest.vercel.app"
        ],
        credentials: true
    })
)
```

---

# React Router Configuration

Karena GoldVest menggunakan React Router, maka Vercel memerlukan file:

```text
vercel.json
```

Isi file

```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

Hal ini memungkinkan SPA (Single Page Application) tetap berjalan ketika halaman direfresh.

---

# Production URLs

## Frontend

```text
https://goldvest.vercel.app
```

## Backend

```text
https://goldvest-production.up.railway.app
```

## Swagger

```text
https://goldvest-production.up.railway.app/api-docs
```

---

# Deployment Pipeline

```text
Developer

↓

VS Code

↓

Git

↓

GitHub

↓

──────────────────────────────

↓

Vercel Build

↓

React Production

↓

──────────────────────────────

↓

Railway Build

↓

Express Production

↓

──────────────────────────────

↓

Neon Database

↓

Production Ready
```

---

# Security

Deployment menerapkan beberapa mekanisme keamanan.

## Authentication

- JWT Access Token
- Refresh Token

---

## Password Security

- bcrypt Hashing

---

## Environment Variables

Seluruh secret disimpan menggunakan Environment Variables.

Contoh

```text
ACCESS_TOKEN_SECRET

REFRESH_TOKEN_SECRET

DATABASE_URL
```

---

## HTTPS

Seluruh komunikasi menggunakan HTTPS.

```text
Browser

↓

HTTPS

↓

Vercel

↓

HTTPS

↓

Railway

↓

Prisma

↓

Neon PostgreSQL
```

---

# Monitoring

Platform deployment menyediakan monitoring bawaan.

## Railway

- Deployment Log
- Runtime Log
- API Health
- Resource Usage

---

## Vercel

- Build Log
- Deployment Status
- Analytics
- Performance Insight

---

# Scalability

Arsitektur GoldVest memungkinkan pengembangan lebih lanjut.

Future Improvements

- Docker Containerization
- CI/CD GitHub Actions
- Redis Cache
- Rate Limiter
- Load Balancer
- Kubernetes Deployment
- Monitoring Grafana
- Prometheus
- Object Storage
- Email Service

---

# Summary

GoldVest menggunakan arsitektur deployment modern berbasis cloud dengan memanfaatkan Vercel sebagai hosting frontend, Railway sebagai backend service, dan Neon PostgreSQL sebagai database.

Pemisahan deployment ini memungkinkan setiap komponen dikembangkan, di-deploy, dan diskalakan secara independen sehingga sistem lebih fleksibel, mudah dipelihara, dan siap dikembangkan untuk kebutuhan produksi.