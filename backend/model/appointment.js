import mongoose from "mongoose";

const appointmentSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    vehicleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Vehicle",
        required:true,
    },
    appointmentDate:{
        type:Date,
        required:true,
    },
    timeslot:{
        type:String,
        required:true,
    },
    fullTimeSlot:{
        type:Date,
        required:true,
    },
    servicetype:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"booked",
        enum:["booked","in-progress","cancelled","completed"],
    },
},{timestamps:true
});
const Appointment=mongoose.model("Appointment",appointmentSchema);

export default Appointment;
