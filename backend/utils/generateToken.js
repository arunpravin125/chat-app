import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId,res)=>{
const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
    expiresIn :"15d"
})
res.cookie("jwt",token,{
    maxAge:15*24*60*60*1000,// maximum age a cookie live
    httpOnly:true,//xss attacts 
    sameSite:"strict", //csrf ....
    secure:process.env.NODE_ENV !== "development"
})
}

export default generateTokenAndSetCookie