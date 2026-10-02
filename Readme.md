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

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
```

Run the server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:3000
```

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
