import mongoose from "mongoose";

const userShema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"customer",
        enum:["admin","customer","mechanic"],
       
    },
    address:{
        type:String,
        default:"",
    },
},{timestamps:true
});

const User=mongoose.model("User",userShema);

export default User;



    

