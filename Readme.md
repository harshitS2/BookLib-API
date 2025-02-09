# Book Management API

A comprehensive Book Management API built with **Node.js**, **Express**, and **MongoDB**. This API provides authentication and authorization, allowing users to manage their profiles and perform CRUD operations on books.

## Features

- **User Authentication & Authorization** (JWT-based)
- **Role-based Access Control** (`admin`, `editor`, `user`)
- CRUD operations for **Books**
- Middleware for protecting routes
- MongoDB integration for data storage

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **dotenv** for environment configuration
- **bcrypt** for password hashing

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/harshitS2/BookLib-API.git
   cd BookLib-API
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=5001
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-jwt-secret
   NODE_ENV=development
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

   The server will run at `http://localhost:5001`

## API Endpoints and Example Responses

### Authentication Routes (`/auth`)

#### **1. Sign Up (POST `/auth/signup`)**

**Request Body:**

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully"
}
```

#### **2. Login (POST `/auth/login`)**

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response (200):**

```json
{
  "message": "Logged in successfully",
  "user": "John Doe"
}
```

#### **3. Update Profile (PUT `/auth/update-profile`)**

**Request Body:**

```json
{
  "name": "Johnathan Doe",
  "email": "john.doe@example.com"
}
```

**Response (200):**

```json
{
  "message": "User updated successfully",
  "user": {
    "name": "Johnathan Doe",
    "username": "johndoe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

---

### Book Routes (`/lib`)

#### **1. Add Book (POST `/lib/upload`)**

**Request Body:**

```json
{
  "title": "The Mysterious Island",
  "author": "Jules Verne",
  "genre": "Adventure",
  "description": "A story of survival and discovery on a mysterious island."
}
```

**Response (201):**

```json
{
  "message": "Book added successfully"
}
```

#### **2. Get All Books (GET `/lib/books`)**

**Response (200):**

```json
[
  {
    "_id": "63e41bce1c93e32d8c4a59a2",
    "title": "The Mysterious Island",
    "author": "Jules Verne",
    "genre": "Adventure",
    "description": "A story of survival and discovery on a mysterious island.",
    "published_date": "1874-01-01T00:00:00.000Z",
    "created_by": "63e41bce1c93e32d8c4a59a1"
  }
]
```

#### **3. Get Book by ID (GET `/lib/books/:id`)**

**Response (200):**

```json
{
  "_id": "63e41bce1c93e32d8c4a59a2",
  "title": "The Mysterious Island",
  "author": "Jules Verne",
  "genre": "Adventure",
  "description": "A story of survival and discovery on a mysterious island.",
  "published_date": "1874-01-01T00:00:00.000Z",
  "created_by": "63e41bce1c93e32d8c4a59a1"
}
```

#### **4. Update Book (PUT `/lib/update-book/:id`)**

**Request Body:**

```json
{
  "title": "The Mysterious Island - Updated Edition",
  "author": "Jules Verne"
}
```

**Response (200):**

```json
{
  "_id": "63e41bce1c93e32d8c4a59a2",
  "title": "The Mysterious Island - Updated Edition",
  "author": "Jules Verne",
  "genre": "Adventure",
  "description": "A story of survival and discovery on a mysterious island.",
  "published_date": "1874-01-01T00:00:00.000Z",
  "created_by": "63e41bce1c93e32d8c4a59a1"
}
```

#### **5. Delete Book (DELETE `/lib/delete-book/:id`)**

**Response (200):**

```json
{
  "_id": "67a86e69b24bbb974f0eb5fc",
  "title": "The Midnight Key",
  "author": "Uknown",
  "genre": "Mystery / Thriller",
  "description": "In the heart of an old city, an abandoned mansion hides a sinister past. When a cryptic key is discovered, strange events begin to unfold—visions of the past, whispers in the dark, and a series of unexplained disappearances. Determined to uncover the truth, a young detective must piece together the puzzle before the key unlocks something far more terrifying than she ever imagined.",
  "cover_image_url": "dummy.jpg",
  "published_date": "2025-02-09T08:59:21.398Z",
  "created_by": "67a862f9f090ae9e7cce9b93",
  "createdAt": "2025-02-09T08:59:21.409Z",
  "updatedAt": "2025-02-09T08:59:21.409Z",
  "__v": 0
}
```

---

## How to Use the API

1. **Sign Up:** Create a new account using `/auth/signup`.
2. **Login:** Obtain a JWT token by logging in at `/auth/login`.
3. **Access Protected Routes:** Include the token in your request cookies to access protected routes.

---

## License

This project is licensed under the MIT License.
