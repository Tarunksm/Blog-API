# Blog API

A RESTful Blog API built with Node.js, Express, TypeScript, PostgreSQL and Prisma.

The API provides authentication, authorization and complete CRUD operations for blog posts, along with pagination, filtering, searching and sorting.

## Demo

[Watch the Demo Video](youtu.be/W-mWbrlKef8)

## Features

- User registration and login
- JWT authentication
- Protected routes
- Password hashing with bcrypt
- Create, read, update and delete blog posts
- User authorization
- Pagination
- Search and filtering
- Sorting
- Request validation with Zod
- PostgreSQL database
- Prisma ORM
- Centralized error handling
- RESTful API architecture
- Deployed backend API

## Tech Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma
- JWT
- bcrypt
- Zod
- Git & GitHub

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |

### Posts

| Method | Endpoint | Description |
|---|---|---|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get a single post |
| POST | `/posts` | Create a post |
| PATCH | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

Protected endpoints require a JWT:

```text
Authorization: Bearer <token>
```

## Query Features

The posts endpoint supports pagination, searching, filtering and sorting.

Example:

```text
GET /posts?page=1&limit=10
```

Search:

```text
GET /posts?search=javascript
```

Sorting:

```text
GET /posts?sort=createdAt
```

These features allow the API to handle larger collections of posts efficiently.

## Authentication Flow

```text
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in PostgreSQL
   ↓
Login
   ↓
JWT generated
   ↓
JWT sent with protected requests
   ↓
Authentication middleware verifies token
   ↓
Controller handles request
```

## Authorization

Authentication middleware verifies the user's JWT and identifies the logged-in user.

For protected post operations, authorization ensures that a user can only modify or delete posts they are allowed to manage.

## Project Structure

```text
src/
├── controllers/
├── middleware/
├── routes/
├── validators/
├── lib/
└── server.ts
```

## Database

The application uses PostgreSQL with Prisma ORM.

Prisma is responsible for:

- Database schema
- User and post relationships
- Database queries
- Type-safe database access

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=
JWT_SECRET=
```

## Local Setup

Clone the repository:

```bash
git clone <repository-url>
cd <project-folder>
```

Install dependencies:

```bash
npm install
```

Configure your environment variables in `.env`.

Generate the Prisma client:

```bash
npx prisma generate
```

Synchronize the database:

```bash
npx prisma db push
```

Start the development server:

```bash
npm run dev
```

## What I Learned

- Building REST APIs with Express and TypeScript
- JWT authentication
- Authentication middleware
- Authorization and ownership checks
- Password hashing with bcrypt
- PostgreSQL database design
- Prisma ORM and relations
- CRUD operations
- Request validation with Zod
- Pagination and query parameters
- Search, filtering and sorting
- Centralized error handling
- Deploying backend APIs

## Author

**Tarun**

- GitHub: https://github.com/Tarunksm
- LinkedIn: https://www.linkedin.com/in/tarunksm07
