import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute = async(req,res,next)=>{
    try {

        let token =  req.cookies.jwt
        
        if(!token){
            return res.status(401).json({error:"Unauthoried no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({error:"Not decoded - invalid token"})
        }
        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        req.user = user

        next()
    } catch (error) {
        console.log("error in middleware",error)
        res.status(500).json({error:"Internal server error in protectRoute"})
    }
}


export default protectRoute