import mongoose from "mongoose"
import config from "../config/config.js"

let connectionPromise

const getMongoUri = () => {
    const uri = config.MONGO_URI?.trim()

    if (!uri) {
        throw new Error("MONGO_URI is not configured.")
    }

    let parsedUri
    try {
        parsedUri = new URL(uri)
    } catch {
        throw new Error("MONGO_URI must be a valid MongoDB connection URL.")
    }

    if (!["mongodb:", "mongodb+srv:"].includes(parsedUri.protocol)) {
        throw new Error("MONGO_URI must use mongodb:// or mongodb+srv://.")
    }

    const hostname = parsedUri.hostname.replace(/^\[|\]$/g, "").toLowerCase()
    const isLocalHost =
        hostname === "localhost" ||
        hostname.endsWith(".localhost") ||
        hostname === "::1" ||
        hostname === "0.0.0.0" ||
        /^127\./.test(hostname)

    if (process.env.NODE_ENV === "production" && isLocalHost) {
        throw new Error("MONGO_URI cannot use localhost in production; use a reachable MongoDB Atlas URI.")
    }

    return uri
}

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(getMongoUri(), {
            serverSelectionTimeoutMS: 8000,
        })
            .then(() => {
                console.log("db is connected")
                connectionPromise = undefined
            })
            .catch((error) => {
                connectionPromise = undefined
                throw error
            })
    }

    await connectionPromise
}

export default connectDB