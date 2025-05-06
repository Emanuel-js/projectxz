# Backend Boilerplate

A modern NestJS application boilerplate with MongoDB, JWT authentication, role-based access control, and Swagger documentation.

## Features

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications
- **MongoDB**: NoSQL database integration with Mongoose
- **Authentication**: Complete JWT-based authentication system
- **Authorization**: Role-based access control
- **Swagger**: API documentation
- **Validation**: Request validation using class-validator
- **Configuration**: Environment-based configuration
- **Error Handling**: Global exception handling

## Project Structure

```
backend/
├── src/
│   ├── auth/                # Authentication module
│   │   ├── decorators/      # Custom decorators
│   │   ├── dto/             # Data transfer objects
│   │   ├── guards/          # Authentication guards
│   │   ├── strategies/      # Passport strategies
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   └── auth.service.ts
│   ├── config/              # Configuration
│   │   └── env.validation.ts
│   ├── users/               # Users module
│   │   ├── dto/             # Data transfer objects
│   │   ├── schemas/         # Mongoose schemas
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   └── users.service.ts
│   ├── app.controller.ts    # Main controller
│   ├── app.module.ts        # Main module
│   ├── app.service.ts       # Main service
│   ├── main.ts              # Application entry point
│   └── seed.ts              # Database seeding script
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up MongoDB:

   - Install MongoDB locally or use MongoDB Atlas
   - Update the `.env` file with your MongoDB connection string

4. Start the development server:

   ```bash
   npm run start:dev
   ```

5. Seed the database with initial data:
   ```bash
   npm run seed
   ```

## Available Scripts

- `npm run start`: Start the server
- `npm run start:dev`: Start the server in development mode with hot reload
- `npm run build`: Build the application
- `npm run seed`: Seed the database with initial data
- `npm run test`: Run tests
- `npm run lint`: Lint the code

## API Documentation

Swagger documentation is available at `/api/docs` when the server is running.

## Authentication

The boilerplate includes a complete authentication system with:

- Registration
- Login
- JWT-based authentication
- Role-based access control

### Default Users

After running the seed script, the following users will be available:

- Admin User:

  - Email: admin@example.com
  - Password: admin123
  - Role: admin

- Regular User:
  - Email: user@example.com
  - Password: user123
  - Role: user

## Connecting to Frontend

The API is configured to work with the frontend application. The API endpoints are available at `/api/*`.

## License

MIT
