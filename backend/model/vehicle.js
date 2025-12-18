import mongoose from "mongoose";

const vehicleSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    model:{
        type:String,
        required:true,  
    },
    year:{
        type:Number,
        required:true,
    },
    VIN:{
        type:String,
        required:true,
        unique:true,
    },
},{timestamps:true
});

const Vehicle=mongoose.model("Vehicle",vehicleSchema);

export default Vehicle;

    