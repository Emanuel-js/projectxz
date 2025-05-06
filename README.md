# 🧪 Fullstack Projectx - React + NestJS + MongoDB

## This is a full-stack monorepo boilerplate using **React (Vite)** on the frontend and **NestJS + MongoDB** on the backend.

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

   if this doesn't work, try running `npm install` in the root directory and then `npm install` in the frontend and backend directories

3. create `backend/.env` file and add the following content:

   ```PORT=3000
   NODE_ENV=development
   BASE_URL=http://localhost:3000
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:4200,http://localhost:5174

   MONGODB_URI=mongodb+srv://test:test@cluster0.cylq50p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRES_IN=7d

   API_TITLE=Phishing Simulator API
   API_DESCRIPTION=API Documentation for Phishing Simulator
   API_VERSION=1.0
   API_PATH=api

   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=emanuelawol1960@gmail.com
   EMAIL_PASS=orng rrdv gbxd jdjj
   EMAIL_FROM_NAME=Phishing Simulator
   ```

````

5. Start both frontend and backend in root directory:

```bash
npm run dev
````

6. Open your browser:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - API Documentation: http://localhost:3000/api/docs

## 👥 Default Users

- Admin User:

  - Email: admin@example.com
  - Password: admin@123
  - Role: admin

- Regular User:
  - Email: user@example.com
  - Password: user@123
  - Role: user
