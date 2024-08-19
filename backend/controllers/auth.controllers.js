import User from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import generateTokenAndSetCookie from "../utils/generateToken.js"

export const signup = async(req,res)=>{
    try {
        const {fullName,username,password,confirmpassword,gender} = req.body
   if(password!==confirmpassword){
    return res.status(400).json({error:"password not matched"})
   }

   const user = await User.findOne({username})
if(user){
    return res.status(400).json({error:"username already exits"})
}
//HASH PASSWORD
// https://avatar.iran.liara.run/public/boy?username=[scott]
const salt = await bcryptjs.genSalt(10)
const hashPassword = await bcryptjs.hash(password,salt)
const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        
const newUser = new User({
    fullName:fullName,username:username,password:hashPassword,gender:gender,profilePic:gender=="male"?boyProfilePic:girlProfilePic
})
if(newUser){
    // Generate jwt token
   await newUser.save()
   generateTokenAndSetCookie(newUser._id,res)

res.status(201).json({_id:newUser._id,fullName:newUser.fullName,username:newUser.username,password:newUser.password,gender:newUser.gender,profiePic:newUser.profilePic})

}else{
    res.status(401).json({message:"Invalid user data"})
}

    } catch (error) {
        console.log("error in signup :",error)
        res.status(500).json({message:"error in signup"}) 
    }
}


export const login = async(req,res)=>{

    try {
        const {username,password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcryptjs.compare(password,user?.password || "") 
        if(!user||!isPasswordCorrect){
           return res.status(400).json({error:"Invalid user or password i login"})
        }

        generateTokenAndSetCookie(user._id,res)
          console.log("login in",username)
        res.status(200).json({_id:user._id,fullName:user.fullName,username:user.username,profilePic:user.profilePic})
    } catch (error) {
        console.log("error in login :",error)
        res.status(500).json({message:"error in login"})
    }
}

export const logout = async(req,res)=>{
    console.log("logout")
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("error in logout :",error)
        res.status(500).json({message:"error in logout"})
        
    }
}



export const signin =async (req,res)=>{
    console.log("signin")
    try {
        
    } catch (error) {
        
    }
}



