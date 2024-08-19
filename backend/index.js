import express from "express"
import cors from "cors"

import dotenv from "dotenv"
import router from "./routes/auth.routes.js"

import { connectToMongoDB } from "./DB/connectToMongo.js"
import messageRouter from "./routes/message.routes.js"
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use("/api/auth",router)
app.use("/api/messages",messageRouter)
app.use("/api/users",userRouter)

const usePORT = process.env.PORT || 4100

app.listen(usePORT,()=>{
    connectToMongoDB()
    console.log(`Server starting......${usePORT}`)
})