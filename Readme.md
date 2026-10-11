# E-Commerce App

A full-stack e-commerce application built using React, Node.js, Express, MongoDB, and JWT authentication.

## Features

* User registration and login
* JWT access and refresh token authentication
* Protected API routes
* Product CRUD operations
* Product details page
* User profile (`/me`)
* Responsive UI using Tailwind CSS

## Tech Stack

**Frontend**

* React
* Vite
* React Router
* Tailwind CSS
* React Hook Form
* Axios

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt

## Setup

### Backend

```bash
cd server
npm install
```

Copy `server/.env.example` to `server/.env` for local development and set your
own JWT secrets and MongoDB connection string.

For production, add `MONGO_URI`, `ACCESS_TOKEN_SECRET`,
`REFRESH_TOKEN_SECRET`, and `FRONTEND_URL` in the backend Vercel project's
Environment Variables. Set `FRONTEND_URL` to the exact deployed frontend origin
(for example, `https://your-store.vercel.app`, without a trailing slash).
Use a MongoDB Atlas connection string for `MONGO_URI`; `localhost` is only
accessible from the same machine and will not work from Vercel. In Atlas, allow
network access from your deployed backend (for example, configure an appropriate
IP access list entry) and ensure the database user has the required permissions.
After deployment, `https://your-backend.vercel.app/api/health` should return
`{"status":"ok","database":"connected"}` before registration or other API calls
can succeed.

Run the server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

### Deploy the backend to Vercel

Create a Vercel project for the `server` directory (set **Root Directory** to
`server`). Add `MONGO_URI`, `ACCESS_TOKEN_SECRET`, and `REFRESH_TOKEN_SECRET` as
Vercel environment variables for the environments you deploy, along with
`FRONTEND_URL` set to the deployed frontend origin. Vercel uses the handler in
`server/api/index.js`; visiting the deployment URL should return an `API is
running` health response, and API routes are available under `/api`.

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Copy `client/.env.example` to `client/.env.local` for local development. The
frontend uses Vite's `/api` proxy to reach the local backend. For the frontend
Vercel project, set **Root Directory** to `client` and add `VITE_API_URL` as a
build environment variable with the deployed backend URL (for example,
`https://your-backend.vercel.app/api`). Do not set it to `/api` or the
frontend's own URL. If the URL has no `/api` path, the client adds it
automatically. Redeploy the frontend after changing this variable. Set the
backend's `FRONTEND_URL` to the frontend's exact deployed origin so
credentialed API requests and refresh-token cookies work.

## API Endpoints

### Authentication

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | `/api/auth/register`      | Register user        |
| POST   | `/api/auth/login`         | Login user           |
| POST   | `/api/auth/refresh-token` | Get new access token |
| POST   | `/api/auth/logout`        | Logout user          |
| GET    | `/api/auth/me`            | Get current user     |

### Products

| Method | Endpoint            | Description        |
| ------ | ------------------- | ------------------ |
| GET    | `/api/products`     | Get all products   |
| GET    | `/api/products/:id` | Get single product |
| POST   | `/api/products`     | Create product     |
| PUT    | `/api/products/:id` | Update product     |
| DELETE | `/api/products/:id` | Delete product     |

`POST`, `PUT`, and `DELETE` product endpoints require authentication.

## Product Fields

```json
{
  "title": "Product title",
  "description": "Product description",
  "price": 999,
  "imageUrl": "https://example.com/image.jpg"
}
```

## Authentication

The application uses JWT access tokens and refresh tokens. The access token is sent using the `Authorization: Bearer <token>` header, while the refresh token is stored in an HTTP-only cookie.

## Project Structure

```text
project/
├── client/
├── server/
└── README.md
```

## License

This project is created for learning and development purposes.
