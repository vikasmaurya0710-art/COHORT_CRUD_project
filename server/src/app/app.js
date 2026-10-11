import express from "express"
import authRouter from "../routes/auth.route.js"
import cookieParser from "cookie-parser"
import productRouter from "../routes/product.route.js"
import connectDB from "../config/db.js"
import config from "../config/config.js"

const app = express()
const allowedOrigins = (
    config.FRONTEND_URL ||
    (process.env.NODE_ENV === "production" ? "" : "http://localhost:5173")
).split(",").map((origin) => origin.trim()).filter(Boolean)

app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
    const origin = req.headers.origin

    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin)
        res.setHeader("Access-Control-Allow-Credentials", "true")
        res.setHeader("Vary", "Origin")
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")
    }

    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }

    next()
})

app.get("/", (_req, res) => {
    res.status(200).json({ status: "ok", message: "API is running" })
})

app.use("/api", async (_req, _res, next) => {
    try {
        await connectDB()
        next()
    } catch (error) {
        next(error)
    }
})

app.use("/api/auth",authRouter)

app.use("/api/products",productRouter)


export default app