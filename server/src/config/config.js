import dotenv from "dotenv"
dotenv.config()

const config = {
    SERVER_PORT:process.env.PORT || process.env.SERVER_PORT || 3000,
    MONGO_URI:process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET:process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET,
    FRONTEND_URL:process.env.FRONTEND_URL
}

export default config