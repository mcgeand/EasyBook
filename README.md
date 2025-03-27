# EasyBook

EasyBook is a modern booking application built with React, Node.js, and PostgreSQL.

## Project Structure

The project is organized as a monorepo with the following structure:

- `frontend/`: React frontend built with TypeScript, Vite, and Tailwind CSS
- `backend/`: Node.js API built with Express, TypeScript, and Prisma ORM
- `docker-compose.yml`: Docker Compose configuration for local development

## Features

- User authentication and management
- Service definition and management
- Booking creation and management
- Modern UI with responsive design
- RESTful API with TypeScript
- PostgreSQL database with Prisma ORM

## Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## Getting Started

### Setting up with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/mcgeand/EasyBook.git
   cd EasyBook
   ```

2. Create environment files:
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

3. Start the application with Docker Compose:
   ```bash
   docker-compose up
   ```

4. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001
   - Prisma Studio (database UI): http://localhost:5555 (run `docker-compose exec backend npx prisma studio`)

### Development with Cursor

1. Open the project in Cursor IDE
2. Install dependencies for both the frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Run the development servers:
   - Frontend: `cd frontend && npm run dev`
   - Backend: `cd backend && npm run dev`

## Database Management

- Generate Prisma client: `cd backend && npx prisma generate`
- Create a migration: `cd backend && npx prisma migrate dev --name <migration-name>`
- Reset the database: `cd backend && npx prisma migrate reset`
- Open Prisma Studio: `cd backend && npx prisma studio`

## API Documentation

The API is available at `http://localhost:5001/api` with the following endpoints:

- Health Check:
  - `GET /api/health`: Check if the API is running

- Users:
  - `GET /api/users`: Get all users
  - `GET /api/users/:id`: Get user by ID
  - `POST /api/users`: Create a new user
  - `PUT /api/users/:id`: Update a user
  - `DELETE /api/users/:id`: Delete a user
  - `POST /api/users/login`: User login

- Services:
  - `GET /api/services`: Get all services
  - `GET /api/services/:id`: Get service by ID
  - `POST /api/services`: Create a new service
  - `PUT /api/services/:id`: Update a service
  - `DELETE /api/services/:id`: Delete a service

- Bookings:
  - `GET /api/bookings`: Get all bookings
  - `GET /api/bookings/:id`: Get booking by ID
  - `GET /api/bookings/user/:userId`: Get bookings by user ID
  - `POST /api/bookings`: Create a new booking
  - `PUT /api/bookings/:id`: Update a booking
  - `DELETE /api/bookings/:id`: Delete a booking

## Development Workflow

1. Create feature branches from the `dev` branch
2. Make changes and commit to your feature branch
3. Create a pull request to merge your feature branch into `dev`
4. After review, merge to `dev`
5. Periodically, `dev` is merged into `main` for releases

## License

This project is licensed under the MIT License. 