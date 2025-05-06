# Docker Setup for ProjectXZ

This document provides instructions for setting up and running the ProjectXZ application using Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup Instructions

### 1. Configure Environment Variables

Before running the application, you need to configure the email settings in the `.env.docker` file:

```bash
# Copy the example .env.docker file
cp .env.docker.example .env.docker

# Edit the .env.docker file with your email settings
nano .env.docker
```

Update the following variables in the `.env.docker` file:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM_NAME=Phishing Simulator
```

**Note:** If you're using Gmail, you'll need to generate an App Password. See [Google's documentation](https://support.google.com/accounts/answer/185833) for instructions.

### 2. Build and Start the Application

Run the following command to build and start all services:

```bash
docker-compose --env-file .env.docker up -d
```

This will:
- Start a MongoDB container
- Build and start the backend NestJS application
- Build and start the frontend React application
- Set up the necessary network connections between services

### 3. Access the Application

Once all containers are running, you can access:

- Frontend: http://localhost
- Backend API: http://localhost/api
- API Documentation: http://localhost/api/docs

### 4. View Container Logs

To view logs from the containers:

```bash
# View logs from all containers
docker-compose logs

# View logs from a specific container (e.g., backend)
docker-compose logs backend

# Follow logs in real-time
docker-compose logs -f
```

### 5. Stop the Application

To stop all containers:

```bash
docker-compose down
```

To stop and remove all containers, networks, and volumes:

```bash
docker-compose down -v
```

## Container Structure

The application consists of three main containers:

1. **MongoDB** (`mongodb`):
   - Database for the application
   - Port: 27017 (exposed to host)
   - Data persisted in a Docker volume

2. **Backend** (`backend`):
   - NestJS application
   - Port: 3000 (exposed to host)
   - Connects to MongoDB
   - Handles API requests and email sending

3. **Frontend** (`frontend`):
   - React application served by Nginx
   - Port: 80 (exposed to host)
   - Communicates with the backend API

## Troubleshooting

### Email Sending Issues

If emails are not being sent:

1. Check the backend logs:
   ```bash
   docker-compose logs backend
   ```

2. Verify your email credentials in the `.env.docker` file

3. If using Gmail, ensure you've created an App Password and allowed less secure apps

### Connection Issues

If the frontend cannot connect to the backend:

1. Check that all containers are running:
   ```bash
   docker-compose ps
   ```

2. Verify the CORS settings in the backend environment variables

3. Check the Nginx configuration in the frontend container
