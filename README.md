# 🚀 ProdReady API - Production-Ready Backend Template

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

> A production-ready backend API template built with NestJS, Prisma, and PostgreSQL. Features JWT authentication with refresh tokens, RBAC, complete CRUD operations, Swagger documentation, and automated CI/CD deployment to AWS.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)

## ✨ Features

### Authentication & Authorization
- ✅ **JWT Authentication** - Access & refresh token strategy
- ✅ **Token Refresh** - Seamless token renewal without re-login
- ✅ **Role-Based Access Control (RBAC)** - User/Admin roles
- ✅ **Secure Password Hashing** - bcrypt with salt rounds
- ✅ **Multi-Device Logout** - Logout from current or all devices

### API Features
- ✅ **RESTful CRUD Operations** - Task management with full CRUD
- ✅ **User-Scoped Data** - Users only access their own resources
- ✅ **Data Validation** - class-validator with DTOs
- ✅ **Swagger/OpenAPI Documentation** - Interactive API explorer
- ✅ **Global Error Handling** - Consistent error responses
- ✅ **Type Safety** - Zero `any` types, fully typed TypeScript

### Database & ORM
- ✅ **Prisma ORM** - Type-safe database queries
- ✅ **PostgreSQL** - Production-grade relational database
- ✅ **Database Migrations** - Version-controlled schema changes
- ✅ **Connection Pooling** - Optimized database connections

### DevOps & Infrastructure
- ✅ **Dockerized** - Multi-stage Docker builds
- ✅ **Docker Compose** - Local development environment
- ✅ **Environment Configuration** - Separate dev/prod configs

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | NestJS 11 |
| **Language** | TypeScript 5.7 |
| **ORM** | Prisma 7 |
| **Database** | PostgreSQL 16 |
| **Authentication** | JWT (Passport) |
| **Validation** | class-validator & class-transformer |
| **Documentation** | Swagger/OpenAPI |
| **Containerization** | Docker & Docker Compose |
| **Testing** | Jest |

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Web App, Mobile App, Postman, Swagger UI)                 │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/HTTPS
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                   NestJS Application                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers (REST Endpoints)                        │   │
│  │  ┌──────────┬──────────┬──────────┐                 │   │
│  │  │   Auth   │   Task   │   User   │                 │   │
│  │  └─────┬────┴─────┬────┴────┬─────┘                 │   │
│  │        │          │         │                        │   │
│  │  ┌─────▼──────────▼─────────▼───────┐               │   │
│  │  │  Guards & Middleware              │               │   │
│  │  │  (JWT, RBAC, Validation)         │               │   │
│  │  └─────┬──────────┬─────────┬───────┘               │   │
│  │        │          │         │                        │   │
│  │  ┌─────▼──────────▼─────────▼───────┐               │   │
│  │  │     Services Layer                │               │   │
│  │  │  (Business Logic)                │               │   │
│  │  └─────┬──────────┬─────────┬───────┘               │   │
│  │        │          │         │                        │   │
│  │  ┌─────▼──────────▼─────────▼───────┐               │   │
│  │  │      Prisma ORM Layer             │               │   │
│  │  │  (Type-safe Queries)             │               │   │
│  │  └─────────────────┬─────────────────┘               │   │
│  └────────────────────┼──────────────────────────────────┘   │
└───────────────────────┼──────────────────────────────────────┘
                        │
                        ▼
          ┌─────────────────────────┐
          │   PostgreSQL Database    │
          │  (Persistent Storage)    │
          └─────────────────────────┘
```

### Authentication Flow

```
Client                                     Server
  │                                          │
  │  1. POST /auth/register                 │
  │  { email, password }                    │
  ├─────────────────────────────────────────>
  │                                          │
  │         2. Hash password (bcrypt)       │
  │         3. Create user in DB            │
  │         4. Generate JWT tokens          │
  │                                          │
  │  5. Return tokens + user data           │
  <─────────────────────────────────────────┤
  │  { accessToken, refreshToken, user }    │
  │                                          │
  │  6. POST /tasks (Protected)             │
  │  Authorization: Bearer <accessToken>    │
  ├─────────────────────────────────────────>
  │                                          │
  │         7. Validate JWT                 │
  │         8. Extract user from token      │
  │         9. Execute business logic       │
  │                                          │
  │  10. Return response                    │
  <─────────────────────────────────────────┤
  │                                          │
  │  11. Access token expires (15 min)      │
  │  POST /auth/refresh                     │
  │  { refreshToken }                       │
  ├─────────────────────────────────────────>
  │                                          │
  │         12. Validate refresh token      │
  │         13. Check DB for token          │
  │         14. Generate new tokens         │
  │         15. Invalidate old token        │
  │                                          │
  │  16. Return new tokens                  │
  <─────────────────────────────────────────┤
  │                                          │
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL 16+
- Docker & Docker Compose (optional)

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/prodready-api.git
cd prodready-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=8080
```

4. **Start PostgreSQL (Docker)**
```bash
docker-compose up -d postgres
```

5. **Run database migrations**
```bash
npx prisma migrate dev
```

6. **Generate Prisma Client**
```bash
npx prisma generate
```

7. **Start development server**
```bash
npm run start:dev
```

8. **Access the application**
- API: http://localhost:8080
- Swagger UI: http://localhost:8080/api

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop all services
docker-compose down
```

## 📚 API Documentation

### Swagger UI
Interactive API documentation is available at: **http://localhost:8080/api**

### Quick API Reference

#### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| POST | `/auth/refresh` | Refresh access token | No |
| POST | `/auth/logout` | Logout from current device | Yes |
| POST | `/auth/logout-all` | Logout from all devices | Yes |

#### Task Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/tasks` | Create new task | Yes |
| GET | `/tasks` | Get all user tasks | Yes |
| GET | `/tasks/:id` | Get task by ID | Yes |
| PATCH | `/tasks/:id` | Update task | Yes |
| DELETE | `/tasks/:id` | Delete task | Yes |

### Example Requests

**Register:**
```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

**Create Task (with JWT):**
```bash
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "Complete project",
    "content": "Finish the backend API"
  }'
```

## 🗄️ Database Schema

```prisma
model User {
  id            String         @id @default(uuid())
  email         String         @unique
  password      String
  role          Role           @default(USER)
  tasks         Task[]
  refreshTokens RefreshToken[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
}

model Task {
  id        String   @id @default(uuid())
  title     String
  content   String?
  completed Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model RefreshToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}
```

## 🔒 Security

### Implemented Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **JWT Tokens** - Short-lived access tokens (15 min) + refresh tokens (7 days)
- ✅ **Token Rotation** - Refresh tokens invalidated on use
- ✅ **RBAC** - Role-based access control
- ✅ **Input Validation** - class-validator on all DTOs
- ✅ **SQL Injection Protection** - Prisma parameterized queries
- ✅ **Type Safety** - Zero `any` types

### Recommended Production Additions

```bash
npm install helmet compression rate-limit
```

## 📁 Project Structure

```
prodready-api/
├── src/
│   ├── auth/                     # Authentication module
│   │   ├── dto/                  # Data transfer objects
│   │   ├── guards/               # Auth guards
│   │   ├── strategies/           # Passport strategies
│   │   ├── interfaces/           # TypeScript interfaces
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── task/                     # Task CRUD module
│   │   ├── dto/
│   │   ├── task.controller.ts
│   │   ├── task.service.ts
│   │   └── task.module.ts
│   ├── prisma/                   # Database module
│   │   ├── schema.prisma         # Database schema
│   │   ├── migrations/           # Migration history
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── common/                   # Shared utilities
│   │   ├── decorators/           # Custom decorators
│   │   └── guards/               # Shared guards
│   ├── app.module.ts             # Root module
│   └── main.ts                   # Application entry
├── test/                         # E2E tests
├── docker-compose.yml            # Docker compose config
├── Dockerfile                    # Docker build config
├── .env.example                  # Environment template
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies
```

## 🌍 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-key` |
| `PORT` | Server port | `8080` |

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

---

⭐ Star this repo if you found it helpful!
