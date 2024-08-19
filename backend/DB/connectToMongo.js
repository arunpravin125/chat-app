import mongoose from "mongoose";

 export const connectToMongoDB = async ()=>{
    try {
        const connection =await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoDB connected.......:)`)
    } catch (error) {
        console.log("error in mongoDB connection",error)
    }
}