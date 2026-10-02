import  app from "./app/app.js"
import config from "./config/config.js"
import connectDB from "./config/db.js"

const server = app

await connectDB()

server.listen(config.SERVER_PORT,()=>{
    console.log("server is running on port",config.SERVER_PORT)
})