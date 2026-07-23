# 🗄️ GoldVest Database Design

## Overview

GoldVest menggunakan PostgreSQL sebagai Database Management System (DBMS) dengan Prisma ORM sebagai Object Relational Mapping (ORM).

Database dirancang menggunakan pendekatan relasional (Relational Database) untuk menjaga konsistensi data, integritas referensial, serta mendukung transaksi finansial secara aman.

---

# Database Information

| Property | Value |
|----------|-------|
| Database | PostgreSQL |
| ORM | Prisma ORM |
| Primary Key | UUID |
| Relationship | One-to-One, One-to-Many |
| Migration | Prisma Migration |

---

# Entity Relationship

Database GoldVest terdiri dari lima entitas utama.

```text
User
 │
 ├────────────┐
 │            │
 │            │
 ▼            ▼
Wallet    Portfolio
 │
 │
 ▼
Transaction
 │
 ▼
GoldPrice
```

---

# Table : User

Menyimpan seluruh informasi pengguna aplikasi.

| Column | Type | Constraint | Description |
|---------|------|------------|-------------|
| id | UUID | PK | User ID |
| fullName | VARCHAR | NOT NULL | Nama Lengkap |
| email | VARCHAR | UNIQUE | Email User |
| password | VARCHAR | NOT NULL | Password Hash |
| role | ENUM | DEFAULT USER | Role User |
| createdAt | TIMESTAMP | | Waktu Dibuat |
| updatedAt | TIMESTAMP | | Waktu Update |

---

## Business Rules

- Email harus unik.
- Password disimpan menggunakan bcrypt hash.
- Role terdiri dari USER dan ADMIN.
- Setiap user hanya memiliki satu wallet.
- Setiap user hanya memiliki satu portfolio.

---

# Table : Wallet

Menyimpan saldo uang pengguna.

| Column | Type | Constraint | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Wallet ID |
| userId | UUID | FK | User Owner |
| balance | DECIMAL | DEFAULT 0 | Saldo |
| createdAt | TIMESTAMP | | Created Time |
| updatedAt | TIMESTAMP | | Updated Time |

---

## Business Rules

- Wallet dibuat otomatis saat registrasi.
- Saldo tidak boleh negatif.
- Digunakan saat membeli emas.

---

# Table : Portfolio

Menyimpan total kepemilikan emas.

| Column | Type | Constraint | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Portfolio ID |
| userId | UUID | FK | User Owner |
| totalGram | DECIMAL | DEFAULT 0 | Total Gram |
| averageBuyPrice | DECIMAL | DEFAULT 0 | Harga Rata-rata |
| createdAt | TIMESTAMP | | Created Time |
| updatedAt | TIMESTAMP | | Updated Time |

---

## Business Rules

- Portfolio dibuat otomatis saat register.
- Total gram tidak boleh negatif.
- Average Buy Price dihitung otomatis setelah transaksi pembelian.

---

# Table : GoldPrice

Menyimpan histori harga emas.

| Column | Type | Constraint | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Gold Price ID |
| buyPrice | DECIMAL | NOT NULL | Harga Beli |
| sellPrice | DECIMAL | NOT NULL | Harga Jual |
| effectiveDate | TIMESTAMP | NOT NULL | Tanggal Berlaku |
| createdBy | UUID | FK | Admin Creator |
| createdAt | TIMESTAMP | | Created Time |

---

## Business Rules

- Hanya ADMIN yang dapat membuat harga emas.
- Harga terbaru digunakan saat transaksi.
- Harga lama tetap disimpan sebagai histori.

---

# Table : Transaction

Menyimpan seluruh aktivitas transaksi pengguna.

| Column | Type | Constraint | Description |
|---------|------|------------|-------------|
| id | UUID | PK | Transaction ID |
| userId | UUID | FK | User |
| goldPriceId | UUID | FK | Gold Price |
| type | ENUM | BUY / SELL | Jenis Transaksi |
| gram | DECIMAL | NOT NULL | Jumlah Gram |
| pricePerGram | DECIMAL | NOT NULL | Harga Saat Transaksi |
| totalPrice | DECIMAL | NOT NULL | Total Harga |
| createdAt | TIMESTAMP | | Waktu Transaksi |

---

## Business Rules

- BUY mengurangi saldo Wallet.
- BUY menambah gram Portfolio.
- SELL mengurangi gram Portfolio.
- SELL menambah saldo Wallet.
- Seluruh transaksi bersifat immutable (tidak dapat diubah).

---

# Relationships

## User → Wallet

Relationship

```text
One To One
```

Setiap user hanya memiliki satu wallet.

---

## User → Portfolio

Relationship

```text
One To One
```

Setiap user hanya memiliki satu portfolio.

---

## User → Transaction

Relationship

```text
One To Many
```

Satu user dapat memiliki banyak transaksi.

---

## GoldPrice → Transaction

Relationship

```text
One To Many
```

Satu harga emas dapat digunakan oleh banyak transaksi.

---

# Data Integrity

Database menerapkan beberapa aturan integritas.

## Entity Integrity

- Primary Key menggunakan UUID.

## Referential Integrity

- Seluruh Foreign Key dijaga oleh PostgreSQL.

## Domain Integrity

- Harga tidak boleh negatif.
- Gram tidak boleh negatif.
- Saldo tidak boleh negatif.

---

# Transaction Flow

## Buy Gold

```text
Wallet

↓

Check Balance

↓

Gold Price

↓

Create Transaction

↓

Update Wallet

↓

Update Portfolio

↓

Commit
```

Semua proses menggunakan Prisma Transaction sehingga bersifat Atomic.

---

## Sell Gold

```text
Portfolio

↓

Check Total Gram

↓

Gold Price

↓

Create Transaction

↓

Update Wallet

↓

Update Portfolio

↓

Commit
```

---

# Index Recommendation

| Table | Column |
|---------|---------|
| User | email |
| Wallet | userId |
| Portfolio | userId |
| Transaction | userId |
| GoldPrice | effectiveDate |

---

# Security

Database menerapkan:

- UUID sebagai Primary Key
- Prisma ORM
- SQL Injection Protection
- Foreign Key Constraint
- Atomic Transaction
- Password Hashing menggunakan bcrypt

---

# Summary

GoldVest menggunakan desain database relasional yang memenuhi kebutuhan transaksi finansial digital dengan menjaga konsistensi data, integritas referensial, serta keamanan transaksi melalui Prisma Transaction dan PostgreSQL Constraint.