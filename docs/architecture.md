# 🏛️ GoldVest System Architecture

## Overview

GoldVest adalah aplikasi investasi emas digital (Digital Gold Investment Platform) yang memungkinkan pengguna membeli, menjual, dan memantau kepemilikan emas secara online.

Sistem dibangun menggunakan arsitektur Client-Server dengan REST API sebagai media komunikasi antara frontend dan backend.

---

# High Level Architecture

```text
                    +----------------------+
                    |      Web Browser     |
                    +----------+-----------+
                               |
                               |
                               | HTTPS
                               |
                               ▼
               +-------------------------------+
               | React.js + Vite + TailwindCSS |
               |        Frontend Client        |
               +---------------+---------------+
                               |
                               | REST API
                               |
                               ▼
                +------------------------------+
                |      Express.js Backend      |
                |------------------------------|
                | Authentication (JWT)         |
                | Authorization (RBAC)         |
                | Zod Validation               |
                | Prisma ORM                   |
                | Swagger Documentation        |
                +---------------+--------------+
                                |
                                |
                                ▼
                    +------------------------+
                    | PostgreSQL Database    |
                    |        (Neon)          |
                    +------------------------+
```

---

# Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js |
| Build Tool | Vite |
| Styling | TailwindCSS |
| Backend | Express.js |
| ORM | Prisma ORM |
| Database | PostgreSQL |
| Authentication | JWT |
| Validation | Zod |
| API Documentation | Swagger |
| Deployment Backend | Railway |
| Deployment Frontend | Vercel |
| Database Hosting | Neon |

---

# System Components

## Frontend

Frontend dibangun menggunakan React.js dengan Vite sebagai build tool.

Frontend bertanggung jawab untuk:

- Authentication
- Dashboard
- Wallet
- Portfolio
- Transaction
- Gold Price
- Admin Panel

---

## Backend

Backend menggunakan Express.js dengan Feature-Based Architecture.

Setiap module memiliki struktur:

```text
modules/
│
├── auth
├── users
├── wallet
├── dashboard
├── gold-price
├── portfolio
└── transaction
```

Masing-masing module terdiri dari:

```text
auth/
│
├── auth.controller.js
├── auth.service.js
├── auth.repository.js
├── auth.route.js
├── auth.validation.js
└── auth.swagger.js
```

---

## Database

Database menggunakan PostgreSQL yang diakses menggunakan Prisma ORM.

Entity utama:

- User
- Wallet
- Portfolio
- Transaction
- GoldPrice

---

# Authentication Flow

```text
User

↓

Login

↓

JWT Access Token

↓

Frontend menyimpan Access Token

↓

Authorization Header

↓

Protected API

↓

Middleware Authentication

↓

Controller

↓

Service

↓

Repository

↓

Database
```

---

# Request Lifecycle

```text
Browser

↓

React Component

↓

Axios

↓

Express Route

↓

Authentication Middleware

↓

Validation (Zod)

↓

Controller

↓

Service

↓

Repository

↓

Prisma ORM

↓

PostgreSQL

↓

Response JSON

↓

Frontend
```

---

# Deployment Architecture

```text
                 +------------------+
                 |     Vercel       |
                 |   React Client   |
                 +---------+--------+
                           |
                           |
                           ▼
                 +------------------+
                 |     Railway      |
                 |   Express API    |
                 +---------+--------+
                           |
                           |
                           ▼
                 +------------------+
                 |       Neon       |
                 |   PostgreSQL DB  |
                 +------------------+
```

---

# Folder Structure

```text
GoldVest

│
├── client
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── prisma
│   ├── src
│   │
│   ├── modules
│   │   ├── auth
│   │   ├── users
│   │   ├── wallet
│   │   ├── dashboard
│   │   ├── goldPrice
│   │   ├── portfolio
│   │   └── transaction
│   │
│   ├── middleware
│   ├── routes
│   ├── utils
│   └── docs
│
└── docs
```

---

# Architecture Pattern

GoldVest menggunakan beberapa design pattern:

- Client-Server Architecture
- REST API
- Layered Architecture
- Feature-Based Architecture
- Repository Pattern
- Service Layer Pattern
- Middleware Pattern

---

# Security

Implementasi keamanan meliputi:

- JWT Authentication
- Role Based Access Control (RBAC)
- Password Hashing (bcrypt)
- Input Validation (Zod)
- CORS Protection
- Environment Variables
- Prisma ORM (SQL Injection Protection)

---

# Summary

GoldVest dirancang menggunakan arsitektur modern berbasis REST API dengan pemisahan frontend dan backend sehingga mudah dikembangkan, dipelihara, dan di-deploy secara independen.