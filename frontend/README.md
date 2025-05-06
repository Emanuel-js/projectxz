# Frontend Boilerplate

A modern React application boilerplate with TypeScript, React Router, Zustand, React Query, and Tailwind CSS.

## Features

- **TypeScript**: Type-safe code
- **React Router**: Client-side routing
- **Zustand**: State management
- **React Query**: Data fetching and caching
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Authentication**: Complete auth flow with protected routes
- **Layout System**: Multiple layouts for different sections
- **Error Handling**: Error boundary and API error handling
- **Loading States**: Loading indicators and spinners

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── hooks/           # Custom hooks
│   ├── layouts/         # Layout components
│   ├── lib/             # Library configurations
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # Zustand stores
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build for production
- `npm run preview`: Preview the production build
- `npm run lint`: Lint the code

## Authentication

The boilerplate includes a complete authentication system with:

- Login
- Registration
- Protected routes
- Token management
- Persistent auth state

## API Integration

API calls are organized in the `services` directory and use Axios for HTTP requests. React Query is used for data fetching, caching, and synchronization.

## State Management

Zustand is used for global state management. The main store is in `src/store/authStore.tsx`.

## Styling

Tailwind CSS is used for styling. The configuration is in `tailwind.config.js`.

## Deployment

To build for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## ESLint Configuration

This project uses ESLint for code linting. The configuration is in `eslint.config.js`.

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```
