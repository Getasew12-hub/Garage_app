import mongoose from "mongoose";

const serviceJobSchema=mongoose.Schema({
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Appointment",
        required:true,
    },
    mechanicId:[{

      id:{type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    dis:{
        type:String,
        default:""
    }
    }
],

   
},{timestamps:true
});

const ServiceJob=mongoose.model("ServiceJob",serviceJobSchema);

export default ServiceJob;