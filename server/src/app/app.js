import express from "express"
import authRouter from "../routes/auth.route.js"
import cookieParser from "cookie-parser"
import productRouter from "../routes/product.route.js"
import connectDB from "../config/db.js"

const app = express()

app.use(cookieParser())
app.use(express.json())

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