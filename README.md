# 🌊 Mimico – Aesthetic Jewelry E-Commerce Platform

Mimico is a full-stack e-commerce web application built to **digitize and streamline the sale of handmade, beach-inspired jewelry**.  
It enables **admins/artisans** to manage products efficiently while allowing **customers** to browse securely from anywhere.

---

## 📌 Project Purpose

- Built to digitize and streamline the sale of handmade, beach-inspired jewelry.
- Replaces manual and social-media-based selling with a centralized web platform.
- Separates admin and customer responsibilities using secure role-based access control.

---

## 🚀 Project Overview

Mimico solves the problem of **unstructured product management and insecure online selling** by providing:

- Secure authentication and authorization
- Admin-only product management
- File-based image uploads (no external image URLs required)
- Clean backend architecture with scalable design

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios / Fetch API
- Custom CSS (Auth, Dashboard, Admin Panel)

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- Role-Based Authorization

### Database
- PostgreSQL (Dockerized)

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Role-based access control (Admin / Customer)

### 🛠 Admin Features
- Admin dashboard
- Add products with **multiple image uploads**
- Category-based product organization
- Secure admin-only APIs

### 👤 User Features
- Secure login
- User dashboard
- Product browsing foundation implemented

---

## 🧱 Backend Architecture

The backend follows a **clean layered architecture**:
Controllers
↓
Services
↓
Repositories
↓
Database (PostgreSQL)

### Benefits
- Separation of concerns
- Maintainability
- Testability
- Scalability

---

## 🗄 Database Design

- PostgreSQL used as the relational database
- Managed using Entity Framework Core
- Docker used for consistent local development
- EF Core migrations handle schema changes

---

## 🔐 Security Implementation

- Passwords hashed using **HMACSHA512**
- JWT tokens contain:
  - User ID
  - Email
  - Role
- Admin APIs protected using:
  ```csharp
  [Authorize(Roles = "Admin")]
## API Documentation

### Base URL
http://localhost:5212/api

---

### Authentication Endpoints

#### Register User

- **Method:** `POST`
- **Endpoint:** `/auth/register`
- **Access:** Public

**Request Body**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```
#### Login User

- **Method:** `POST`
- **Endpoint:** `/auth/login`
- **Access:** Public

**Request Body**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```
#### Get current user

- **Method:** `GET`
- **Endpoint:** `/auth/me`
- **Access:** Authenticated User

**Headers**
```makefile
Authorization: Bearer <JWT_TOKEN>
```
### Admin Product Endpoints
Admin Product Endpoints
#### Create Product
- **Method:** `POST`
- **Endpoint:** `/admin/products`
- **Access:**Admin Only
- **Content-Type:**multipart/form-data

**Headers**
```makefile
Authorization: Bearer <JWT_TOKEN>
```
Form Data Parameters
| Parameter   | Type    |
| ----------- | ------- |
| name        | string  |
| description | string  |
| price       | decimal |
| category    | string  |
| images      | file[]  |

## 📌 Project Setup
### Backend Setup
1. Restore dependencies
   - dotnet restore
2. Apply database migrations
   - dotnet ef database update
3. Run the backend server
   - dotnet run
- Backend URL
  http://localhost:5212
### Frontend Setup
1. install dependencies
   - npm install
2. Start development server
   - npm run dev
- Frontend URL
  http://localhost:5173

### Database Setup (PostgreSQL with Docker)
```bash
docker run --name mimico-postgres \
  -e POSTGRES_PASSWORD=admin123 \
  -e POSTGRES_DB=mimico \
  -p 5432:5432 \
  -d postgres:15
```
