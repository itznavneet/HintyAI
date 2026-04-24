# NoteNest

NoteNest is a full-stack event reminder app built with React, Vite, Express, and MongoDB. Users can register, log in, create personal events, view upcoming or past items, and delete events they no longer need.

## Features

- User registration and login with JWT-based authentication
- Personal event dashboard
- Create events with date, time, type, and optional remark
- View event history with past/upcoming styling
- Delete events securely
- MongoDB persistence with Mongoose

## Tech Stack

- Frontend: React 19, Vite, React Router, Axios, React Toastify
- Backend: Node.js, Express 5, MongoDB, Mongoose
- Authentication: JWT, bcryptjs

## Project Structure

```text
NoteNest/
|-- client/   # React frontend
|-- server/   # Express API and MongoDB models
`-- README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd NoteNest
```

### 2. Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

## Environment Variables

Create a `.env` file inside `server/`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
PORT=5000
```

## Running the App

Open two terminals.

### Terminal 1: start the backend

```bash
cd server
node server.js
```

### Terminal 2: start the frontend

```bash
cd client
npm run dev
```

Frontend default URL:

```text
http://localhost:5173
```

Backend default URL:

```text
http://localhost:5000
```

## API Endpoints

### Auth

- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - log in and receive a token

### Events

- `POST /api/events/add` - create an event
- `GET /api/events/my-events` - fetch logged-in user's events
- `DELETE /api/events/delete/:id` - delete an event by ID

All event routes require this header:

```text
Authorization: Bearer <token>
```

## Notes for Local Development

- The frontend currently uses a hardcoded `BASE_URL` in [client/src/config.js](/d:/Sigma%20Web/Full-stack-project/NoteNest/client/src/config.js:1) that points to the deployed backend first.
- If you want to use the local backend while developing, update that file to `http://localhost:5000` or switch it to an environment-based config.

## Available Scripts

### Client

- `npm run dev` - start Vite dev server
- `npm run build` - build production frontend
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

### Server

- `node server.js` - start the API server

## Deployment

This project appears to be deployed with:

- Frontend: Render
- Backend: Render

Configured URLs found in the codebase:

- Frontend: `https://notenest-frontend-utsu.onrender.com`
- Backend: `https://notenest-blpo.onrender.com`

## Future Improvements

- Add edit/update event support
- Add validation on the backend
- Add tests for API and UI flows
- Move frontend API URL to environment variables
- Add server `dev` script with `nodemon`

## License

This project is available for personal and educational use.
