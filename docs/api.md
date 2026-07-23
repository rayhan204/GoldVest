# 🌐 GoldVest REST API Documentation

## Overview

GoldVest menyediakan REST API untuk mendukung seluruh proses bisnis investasi emas digital.

Seluruh endpoint menggunakan format JSON.

---

# Base URL

## Development

```text
http://localhost:5000/api
```

## Production

```text
https://goldvest-production.up.railway.app/api
```

---

# Authentication

Sebagian endpoint membutuhkan JWT Access Token.

Header:

```http
Authorization: Bearer <access_token>
```

---

# Response Format

## Success

```json
{
    "success": true,
    "message": "Success",
    "data": {}
}
```

---

## Error

```json
{
    "success": false,
    "message": "Error Message"
}
```

---

# Authentication API

---

## Register

### POST

```http
/api/auth/register
```

### Request

```json
{
    "fullName": "Rayhan",
    "email": "rayhan@gmail.com",
    "password": "password123"
}
```

### Response

```json
{
    "success": true,
    "message": "Register berhasil"
}
```

---

## Login

### POST

```http
/api/auth/login
```

### Request

```json
{
    "email": "rayhan@gmail.com",
    "password": "password123"
}
```

### Response

```json
{
    "success": true,
    "message": "Login berhasil",
    "data": {
        "accessToken": "...",
        "refreshToken": "...",
        "user": {
            "id": "...",
            "fullName": "Rayhan",
            "email": "rayhan@gmail.com",
            "role": "USER"
        }
    }
}
```

---

## Refresh Token

### POST

```http
/api/auth/refresh
```

### Request

```json
{
    "refreshToken": "xxxxx"
}
```

### Response

```json
{
    "success": true,
    "data": {
        "accessToken": "new_access_token"
    }
}
```

---

## Get Profile

### GET

```http
/api/auth/me
```

Authentication Required

### Response

```json
{
    "success": true,
    "data": {
        "id": "...",
        "fullName": "Rayhan",
        "email": "rayhan@gmail.com",
        "role": "USER"
    }
}
```

---

# Wallet API

---

## Get Wallet

### GET

```http
/api/wallet
```

Authentication Required

### Response

```json
{
    "success": true,
    "data": {
        "balance": 10000000
    }
}
```

---

## Top Up Wallet

### POST

```http
/api/wallet/topup
```

### Request

```json
{
    "amount": 5000000
}
```

### Response

```json
{
    "success": true,
    "message": "Top Up berhasil"
}
```

---

# Portfolio API

---

## Get Portfolio

### GET

```http
/api/portofolios
```

Authentication Required

### Response

```json
{
    "success": true,
    "data": {
        "totalGram": 2.35,
        "averageBuyPrice": 1850000
    }
}
```

---

# Gold Price API

---

## Get Latest Gold Price

### GET

```http
/api/gold-prices/latest
```

### Response

```json
{
    "success": true,
    "data": {
        "buyPrice": 1950000,
        "sellPrice": 1900000,
        "effectiveDate": "2026-07-23"
    }
}
```

---

## Get Price History

### GET

```http
/api/gold-prices/history
```

### Response

```json
{
    "success": true,
    "data": []
}
```

---

## Create Gold Price

ADMIN ONLY

### POST

```http
/api/gold-prices
```

Authentication Required

### Request

```json
{
    "buyPrice": 1950000,
    "sellPrice": 1900000,
    "effectiveDate": "2026-07-23"
}
```

### Response

```json
{
    "success": true,
    "message": "Gold price berhasil ditambahkan"
}
```

---

# Transaction API

---

## Buy Gold

### POST

```http
/api/transactions/buy
```

Authentication Required

### Request

```json
{
    "gram": 1
}
```

### Response

```json
{
    "success": true,
    "message": "Pembelian emas berhasil"
}
```

---

## Sell Gold

### POST

```http
/api/transactions/sell
```

Authentication Required

### Request

```json
{
    "gram": 0.5
}
```

### Response

```json
{
    "success": true,
    "message": "Penjualan emas berhasil"
}
```

---

## Transaction History

### GET

```http
/api/transactions
```

Authentication Required

### Response

```json
{
    "success": true,
    "data": []
}
```

---

# Dashboard API

---

## Dashboard Summary

### GET

```http
/api/dashboard
```

Authentication Required

### Response

```json
{
    "success": true,
    "data": {
        "walletBalance": 10000000,
        "goldOwned": 2,
        "buyPrice": 1950000,
        "sellPrice": 1900000,
        "assetValue": 3800000,
        "totalWealth": 13800000
    }
}
```

---

# HTTP Status Code

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

# Authorization Matrix

| Endpoint | USER | ADMIN |
|----------|:----:|:-----:|
| Register | ✅ | ✅ |
| Login | ✅ | ✅ |
| Dashboard | ✅ | ✅ |
| Wallet | ✅ | ✅ |
| Portfolio | ✅ | ✅ |
| Buy Gold | ✅ | ✅ |
| Sell Gold | ✅ | ✅ |
| Transaction History | ✅ | ✅ |
| Latest Gold Price | ✅ | ✅ |
| Price History | ✅ | ✅ |
| Create Gold Price | ❌ | ✅ |

---

# Notes

- Semua request dan response menggunakan format JSON.
- Password disimpan menggunakan bcrypt hash.
- Authentication menggunakan JWT Access Token dan Refresh Token.
- Endpoint yang memerlukan autentikasi harus mengirimkan header `Authorization: Bearer <access_token>`.
- Endpoint admin dilindungi menggunakan Role Based Access Control (RBAC).

---

# API Version

Current Version

```text
v1
```