# 🎬 Movie Watchlist Backend (Node + Express + MongoDB)

This is the backend for the Movie Watchlist app built using Node.js, Express, and MongoDB with JWT-based user authentication.

## 🔧 Tech Stack

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **dotenv**

## 📁 File Structure

```bash
server/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   ├── authController.js     # Register & Login logic
│   └── movieController.js    # CRUD operations for movies
├── middleware/
│   └── authMiddleware.js     # JWT token verification
├── models/
│   ├── User.js               # User schema
│   └── Movie.js              # Movie schema
├── routes/
│   ├── authRoutes.js         # Routes for auth
│   └── movieRoutes.js        # Routes for movie CRUD
├── .env                      # Environment variables
├── server.js                 # Main File
└── package.json
```

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Create `.env` File

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Start the Server

```bash
npm run dev
```

> The server will run on `http://localhost:5000`

## 📡 API Endpoints

### 🔐 Auth

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login user

### 🎬 Movies

(All movie routes are protected – token required)

- `GET /api/movies` – Get all movies for logged-in user
- `POST /api/movies` – Add new movie
- `PUT /api/movies/:id` – Edit a movie
- `DELETE /api/movies/:id` – Delete a movie
- `PATCH /api/movies/:id/watch` – Mark movie as watched

## ✅ Notes

- Uses JWT for authentication
- MongoDB for storing user & movie data
- Separate logic for auth and movies via controllers

## 🧑‍💻 Author

Developed by **Pramod Kumar**  
[LinkedIn](https://www.linkedin.com/in/pramodkumarteluri/) | [GitHub](https://github.com/pramodkumarteluri)