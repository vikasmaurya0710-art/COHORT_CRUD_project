import mongoose from "mongoose"
import config from "../config/config.js"

let connectionPromise

const connectDB = async()=>{
    if (mongoose.connection.readyState === 1) {
        return
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(config.MONGO_URI)
            .then(() => {
                console.log("db is connected")
            })
            .catch((error) => {
                connectionPromise = undefined
                throw error
            })
    }

    await connectionPromise
}

export default connectDB