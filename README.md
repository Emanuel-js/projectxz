# 🧪 Fullstack Projectx - React + NestJS + MongoDB

This is a full-stack monorepo boilerplate using **React (Vite)** on the frontend and **NestJS + MongoDB** on the backend, built with modern best practices and developer experience in mind.

---

## 📦 Tech Stack

### Frontend

- React (with Vite)
- Tailwind CSS
- Zustand (state management)
- React Query (data fetching & caching)
- TypeScript
- React Router for navigation
- Axios for API requests
- Authentication system with protected routes

### Backend

- NestJS (TypeScript)
- MongoDB with Mongoose ODM
- JWT Authentication with Role-Based Access
- Swagger API Documentation
- Global Error Handling & Middleware
- Security (CORS, Validation)
- Environment-based configuration

---

## 📁 Project Structure

```
projectxz/
├── frontend/           # React frontend application
├── backend/            # NestJS backend application
├── package.json        # Root package.json for running both apps
└── README.md           # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm run install:all
   ```

3. Set up MongoDB:

   - Install MongoDB locally or use MongoDB Atlas
   - Update the `backend/.env` file with your MongoDB connection string

4. Seed the database with initial data:

   ```bash
   npm run seed
   ```

5. Start both frontend and backend:

   ```bash
   npm run dev
   ```

6. Open your browser:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - API Documentation: http://localhost:3000/api/docs

## 👥 Default Users

After running the seed script, the following users will be available:

- Admin User:

  - Email: admin@example.com
  - Password: admin@123
  - Role: admin

- Regular User:
  - Email: user@example.com
  - Password: user@123
  - Role: user
