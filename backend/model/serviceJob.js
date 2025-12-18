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
    status:{
        type:String,
        default:"in-progress",
        enum:["in-progress","completed","cancelled"],
    },
     appointmentDate:{
        type:Date,
        required:true,
    }
},{timestamps:true
});

const ServiceJob=mongoose.model("ServiceJob",serviceJobSchema);

export default ServiceJob;