import Appointment from "../model/appointment.js";
import Vehicle from "../model/vehicle.js";


export const getUservehiclesController=async(req,res)=>{
    try {
        const userId=req.user._id;
        const vehicles=await Vehicle.find({userId}).sort({createdAt:-1});
         
        return res.status(200).json({success:true,vehicles});
    } catch (error) {
        console.log("Error in getUservehicles controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}
export const addVehicleController=async(req,res)=>{
    try {
        const userId=req.user._id;
        const {VIN,model,year}=req.body;
        if(!VIN || !model || !year){
            return res.status(400).json({success:false,message:"Please provide all required fields"});
        }
        const existingVehicle=await Vehicle.findOne({VIN});
        if(existingVehicle){
            return res.status(400).json({success:false,message:"Vehicle already exist"});
        }
        const newVehicle=await Vehicle.create({
            userId,
            VIN,
            model,
            year,
        });
        
        return res.status(200).json({success:true,newVehicle});
        
    } catch (error) {
        console.log("Error in addVehicle controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}
export const updateVehicleController=async(req,res)=>{
    try {
        const userId=req.user._id;
        const vehicleId=req.params.vehicleId;
        const {VIN,model,year}=req.body;
        
        if(!VIN || !model || !year){
            return res.status(404).json({success:false,message:"No value is change"})
        }
        const vehicle=await Vehicle.findById(vehicleId);
        if(!vehicle){
            return res.status(404).json({success:false,message:"Vehicle not found"});
        }
        
        vehicle.VIN=VIN;
        vehicle.model=model;
        vehicle.year=year;
        await vehicle.save();
        return res.status(200).json({success:true,vehicle});
        
    } catch (error) {
        console.log("Error in updateVehicle controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const deleteVehicleController=async(req,res)=>{
    try {
        console.log("delete vehicle controller called");
        const userId=req.user._id;
        const vehicleId=req.params.vehicleId;
          const checkAppointment=await Appointment.find({vehicleId,status:{$ne:"completed"}})

          if(checkAppointment.length>0) return res.status(404).json({success:false,message:"You can not delete the car"});
        await Vehicle.findByIdAndDelete(vehicleId);

        return res.status(200).json({success:true,message:"Vehicle deleted successfully"});
        
    } catch (error) {
        console.log("Error In delete vhehicles ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

         
       
        

