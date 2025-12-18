import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
function generateToken(res,userId){
    
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"});
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:process.env.NODE_ENV==="production"?"none":"strict",
        maxAge:30*24*60*60*1000,
    });
}   
        


export const signupController=async(req,res)=>{

    try {
        const {name,email,password,phone,address}=req.body;
        if(!name || !email || !password || !phone){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        if(!/^\S+@\S+\.\S+$/.test(email)){
            return res.status(400).json({message:"Please provide a valid email"});
        }
        if(phone.toString().length<10){
            return res.status(400).json({message:"Please provide a valid phone number"});
        }
        //check user exist
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }
        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //create user
        
     const newuser=await User.create({
        name,
        email,
        password:hashedPassword,
        phone,
        address,
        });
        await generateToken(res,newuser._id);

        return res.status(200).json({sucess:true,message:"sucess",newuser});


        
    } catch (error) {
        console.log("Error in signup controller ",error.message);
        return res.status(500).json({sucess:false,message:"Internal server error"});
    }
}
        
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        //check user exist
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"User does not exist"});
        }   
        //compare password
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password"});
        }
        await generateToken(res,existingUser._id);
        return res.status(200).json({sucess:true,message:"Login successful",existingUser});
        
    } catch (error) {
        console.log("Error in login controller ",error);
        return res.status(500).json({sucess:false,message:"Internal server error"});
    }
}

export const logoutController=async(req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
        });
        return res.status(200).json({sucess:true,message:"Logout successful"});
    } catch (error) {
        console.log("Error in logout controller ",error);
        return res.status(500).json({sucess:false,message:"Internal server error"});
    }
}


export const checkAuthController=async(req,res)=>{
    try {
        const user=req.user;
        return res.status(200).json({sucess:true,user});
    } catch (error) {
        console.log("Error in check auth controller ",error);
        return res.status(500).json({message:"Internal server error"});
    }
}
