// default me bina {} ka import karte hai 
import User from  "../models/user.model.js";
import bcrypt from "bcrypt";
import {z} from "zod"
import{ generateTokenAndSaveInCookie}from "../jwt/token.js"
const userSchema = z.object({
        email : z.email({message:"Invalid email address"}),
        username: z.string().min(5,{message:"username should be of 5 characters"}),
        password : z.string().min(8,{message:"password should be of 8 characters"}),
})
export const signup = async(req,res)=>{
   try {
    const {email,username,password} = req.body ;
    if(!email|| !username||!password){
        return res.status(502).json({errors: "All fields are required"})
    }
    const validation = userSchema.safeParse({email,username,password});
    if(!validation.success){
      // return res.status(403).json({errors: validation.error.errors});
      const errorMessage = validation.error.issues.map((err)=>err.message);
      return res.status(505).json({errors: errorMessage})
    }
    const user = await User.findOne({email});
    if(user){
      
      return  res.status(400).json({message: "user registered already"})
    }
    const hashPassword = await bcrypt.hash(password,10);
    const newUser = new User({email,password :hashPassword,username});
    await newUser.save();
     const token = await generateTokenAndSaveInCookie(newUser._id,res);
   res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email
      },
      token   // <--- Send token here
    });
    
   } catch (error) {
   console.log(error);
    res.status(501).json({message:"error during creating user"})
   }
    
}
export const login  = async (req,res)=>{
   try {
    const {email,password} = req.body ;
    if(!email || !password){
         return res.status(502).json({message: "All fields are required"})
    }
    const user = await User.findOne({email}).select("+password")
    if(!user || !(await bcrypt.compare(password,user.password))){
      return  res.status(507).json({message: "Invalid email or password"});
    }
     const token = await generateTokenAndSaveInCookie(user._id,res);
    res.status(207).json({message:"User logged in successfully",user,token})
   } catch (error) {
     console.log(error);
    res.status(501).json({message:"error during logging the user"})
   }
}
   

export const logout = (req,res)=>{
   try {
    res.clearCookie("jwt",{
      path:"/",
    });
     res.status(200).json({message:"User logged out successfully"})
   } catch (error) {
    console.log(error);
    res.status(501).json({message:"error during logging out the user"})
   }
    
}