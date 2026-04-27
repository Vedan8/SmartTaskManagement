# Smart Task Management System 

A backend API built using **Node.js, Express, TypeScript, and MongoDB** for managing users and tasks with authentication and role-based access control.

---

## Features

* User Authentication (JWT-based)
* Role-based Access (Admin / User)
* Task CRUD Operations
* Task Analytics
* Input Validation (Zod)
* Secure Password Hashing (bcrypt)

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB + Mongoose
* JWT (Authentication)
* Zod (Validation)

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd smart_task_management_system
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Create `.env` file

Create a `.env` file in the root directory:

```env
PORT=5000
URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

### 4. Run the project (Development)

```bash
npm run dev
```

---

### 5. Build and Run (Production)

```bash
npm run build
npm start
```

---

## Authentication

* JWT Token is required for protected routes
* Pass token in headers:

```bash
Authorization: Bearer <your_token>
```

---

## API Documentation

---

### Auth Routes

#### Register User

```
POST /auth/register
```

**Body:**

```json
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```
User Created
```

---

#### Login

```
POST /auth/login
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "jwt_token"
}
```

---

### User Routes

#### Get All Users (Admin Only)

```
GET /users
```

---

#### Get Profile

```
GET /users/profile
```

---

#### Update Profile

```
PUT /users/profile
```

---

### Task Routes

#### Create Task

```
POST /tasks
```

---

#### Get User Tasks

```
GET /tasks
```

---

#### Get All Tasks (Admin Only)

```
GET /alltask
```

---

#### Get Task by ID

```
GET /tasks/:id
```

---

#### Update Task

```
PATCH /tasks/:id
```

---

#### Delete Task

```
DELETE /tasks/:id
```

---

### Analytics

#### Task Analytics

```
GET /analytics/tasks
```

---

## Middleware

* `authenticate` → Verifies JWT
* `isAdmin` → Restricts access to admin users
* `validateUser` → Validates user input
* `validateTask` → Validates task input
* `validateOwner` → Ensures task ownership

---

## Scripts

```json
"scripts": {
  "dev": "tsx watch app.ts",
  "start": "node dist/app.js",
  "build": "tsc"
}
```

---

## Notes

* Make sure MongoDB is running or use MongoDB Atlas
* Ensure correct environment variables
* Admin role required for some endpoints

