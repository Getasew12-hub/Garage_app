import User from "../model/user.js";
import jwt from "jsonwebtoken";
export const protectRoute=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized access,no userid found in cookies"
            });
        }

         const decoded=jwt.verify(token,process.env.JWT_SECRET);
         const userdata=await User.findById(decoded.userId).select("-password");
            if(!userdata){
                return res.status(401).json({
                    success:false,
                    message:"Unauthorized access,user not found"
                });
            }
            req.user=userdata;
            next();
    } catch (error) {
        console.error("Error in protected route middleware",error.message);
        return res.status(500).json({
            success:false,
            message:"Internal server error in protected route middleware"
        });
    }

}


export const adminProtectRoute=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
       
        if(!token){
            return res.status(401).json({message:"Unauthorized access,no userid found in cookies"});
        }

            const decoded=jwt.verify(token,process.env.JWT_SECRET);
           
            const userdata=await User.findById(decoded.userId).select("-password");
          
            if(!userdata || userdata.role !=="admin"){
                return res.status(401).json({message:"Unauthorized access,user not found or not admin"});
            }
            req.user=userdata;
            next();
    } catch (error) {
        console.error("Error in admin protected route middleware",error.message);
        return res.status(500).json({message:"Internal server error in admin protected route middleware"});
    }
}

export const mechanicProtectRoute=async(req,res,next)=>{
    try {
        const {token}=req.cookies;
        if(!token){
            return res.status(401).json({message:"Unauthorized access,no userid found in cookies"});
        }
            const decoded=jwt.verify(token,ENV_CONFIG.TOKEN_KEY);
            const userdata=await user.findById(decoded.userid).select("-password");

            if(!userdata || userdata.role !=="mechanic"){
                return res.status(401).json({message:"Unauthorized access,user not found or not mechanic"});
            }
            req.user=userdata;
            next();
    } catch (error) {
        console.error("Error in mechanic protected route middleware",error.message);
        return res.status(500).json({message:"Internal server error in mechanic protected route middleware"});
    }   
}


