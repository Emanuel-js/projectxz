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
  - Password: admin123
  - Role: admin

- Regular User:
  - Email: user@example.com
  - Password: user123
  - Role: user

## 📜 Available Scripts

- `npm run dev`: Start both frontend and backend in development mode
- `npm run seed`: Seed the database with initial data
- `npm run install:all`: Install dependencies for root, frontend, and backend
- `npm run proxy`: Start the proxy server to avoid CORS issues

## 🔄 Dealing with CORS Issues

If you encounter CORS (Cross-Origin Resource Sharing) issues when connecting the frontend to the backend, you have two options:

### Option 1: Use the proxy server

1. Start the backend and frontend:

   ```bash
   npm run dev
   ```

2. In a separate terminal, start the proxy server:

   ```bash
   npm run proxy
   ```

3. Access the application through the proxy server:
   - Direct test page: http://localhost:8080
   - React application: http://localhost:5173

The proxy server handles the CORS headers and forwards requests to the backend API.

### Option 2: Use the simple Express server

For a simpler approach without TypeScript errors or CORS issues:

1. Run the simple server:

   ```bash
   node simple-server.js
   ```

2. Access the test page:
   - Test page: http://localhost:3000/test
   - API endpoint: http://localhost:3000/api
   - DB status: http://localhost:3000/api/db-status

This simple server provides:

- A basic API endpoint
- MongoDB connection status
- A test page to verify everything is working
- No CORS issues (same-origin requests)
- No TypeScript compilation errors
