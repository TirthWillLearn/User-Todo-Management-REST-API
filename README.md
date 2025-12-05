# 📚 User & Todo Management REST API

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8-blue?logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Prisma](https://img.shields.io/badge/ORM-Prisma-informational)

A **backend RESTful API** for managing users and todos.  
Built with **Node.js, Express.js, MySQL (Prisma ORM)**, and secured using **JWT authentication and bcrypt password hashing**.  
Includes features like **CRUD operations for todos, authentication, pagination**, and **MVC architecture**.

---

## 📑 Table of Contents

- Features
- Tech Stack
- Project Structure
- Getting Started
- API Overview
- Screenshots / Demo (Coming Soon)
- Detailed API Reference
- Security Notes
- Deployment
- Author

---

## 🚀 Features

- **Authentication & Authorization**

  - Secure login/signup using **JWT + bcrypt**
  - Register always assigns role `"user"`

- **Todo Management**

  - **CRUD operations** (create, update, delete, list)
  - Each todo belongs only to the logged-in user
  - **Pagination** supported

- **Architecture**
  - **MVC folder structure**
  - **Rate limiting** on auth routes
  - **Centralized error handler**
  - Environment configuration using **dotenv**

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL + Prisma ORM
- **Auth**: JWT, bcrypt
- **Security**: express-rate-limit
- **Architecture**: MVC

---

## 📂 Project Structure

```
user-todo-api/
│── server.js
│── prisma/
│   └── schema.prisma
│── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── utils/
│── postman_collection.json
│── .env.example
│── README.md
```

---

## ⚡ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/user-todo-api.git
cd user-todo-api
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env`

```ini
DATABASE_URL="mysql://root:password@localhost:3306/todo_api"
JWT_SECRET="your-secret-key"
PORT=4000
```

### 4️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5️⃣ Run Server

```bash
npm run dev
```
📥 API Collection: [postman_collection.json](./postman_collection.json)

---

## 🔑 API Overview

### 🔐 Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### 👤 User Routes

- `GET /api/user/profile`

### 📝 Todo Routes

- `POST /api/todos`
- `GET /api/todos`
- `PATCH /api/todos/:id`
- `DELETE /api/todos/:id`

---

## 📸 Screenshots / Demo (Coming Soon)

---

## 📘 Detailed API Reference

---

### ➡️ Register User — POST `/api/auth/register`

**Request Body**

```json
{
  "name": "Tirth Patel",
  "email": "example@example.com",
  "password": "123456"
}
```

**Response (201 Created)**

```json
{
  "message": "User registered successfully",
  "token_type": "Bearer",
  "expires_in": 2592000,
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "Tirth Patel",
    "role": "user"
  }
}
```

---

### ➡️ Login User — POST `/api/auth/login`

**Request Body**

```json
{
  "email": "example@example.com",
  "password": "123456"
}
```

**Response (200 OK)**

```json
{
  "message": "Login successful",
  "token_type": "Bearer",
  "expires_in": 2592000,
  "token": "your-jwt-token",
  "user": {
    "id": 1,
    "name": "Tirth Patel",
    "role": "user"
  }
}
```

---

### ➡️ Get Profile — GET `/api/user/profile`

**Response (200 OK)**

```json
{
  "name": "Tirth Patel",
  "email": "example@example.com",
  "id": 1,
  "role": "user"
}
```

---

### ➡️ Create Todo — POST `/api/todos`

**Request Body**

```json
{
  "title": "Learn Backend",
  "description": "Todo API build"
}
```

**Response (201 Created)**

```json
{
  "id": 1,
  "title": "Learn Backend",
  "description": "Todo API build",
  "status": "pending",
  "userId": 1,
  "createdAt": "2025-12-05T12:34:56.789Z",
  "updatedAt": "2025-12-05T12:34:56.789Z"
}
```

---

### ➡️ List Todos — GET `/api/todos`

**Response (200 OK)**

```json
{
  "page": 1,
  "limit": 10,
  "total": 2,
  "pages": 1,
  "data": [
    {
      "id": 1,
      "title": "Learn Backend",
      "description": "Todo API build",
      "status": "pending",
      "userId": 1,
      "createdAt": "2025-12-05T12:34:56.789Z",
      "updatedAt": "2025-12-05T12:34:56.789Z"
    }
  ]
}
```

---

### ➡️ Update Todo — PATCH `/api/todos/:id`

**Request Body**

```json
{
  "status": "completed"
}
```

**Response (200 OK)**

```json
{
  "id": 1,
  "title": "Learn Backend",
  "description": "Todo API build",
  "status": "completed",
  "userId": 1,
  "createdAt": "2025-12-05T12:34:56.789Z",
  "updatedAt": "2025-12-05T13:00:00.000Z"
}
```

---

### ➡️ Delete Todo — DELETE `/api/todos/:id`

**Response (200 OK)**

```json
{
  "message": "Deleted"
}
```

---

## 🔒 Security Notes

- Register always assigns `"user"` role.
- JWT required for all protected routes.
- Rate limiting applied to `/api/auth`.
- Never commit `.env`.

---

## 📦 Deployment

Can be deployed on:

- Render
- Railway
- Vercel
- AWS EC2

Database hosting options:

- PlanetScale
- Railway
- AWS RDS

---

## 👨‍💻 Author

**Tirth Patel**  
GitHub: https://github.com/TirthWillLearn  
LinkedIn: https://www.linkedin.com/in/tirth-k-patel/
