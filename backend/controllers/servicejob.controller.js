import Appointment from "../model/appointment.js";
import ServiceJob from "../model/serviceJob.js";





export const getMechanicServiceJobsController=async(req,res)=>{
    try {
        const mechanicId=req.user._id;
        const serviceJobs=await ServiceJob.aggregate([
            {
                $match:{
                    "mechanicId.id":mechanicId
                }
            },
           
            {
                $lookup:{
                    from:"appointments",
                    localField:"appointmentId",
                    foreignField:"_id",
                    as:"appointment"
                }
            },
             {
                 $sort:{"appointment.status":-1}
            },
            {
                $unwind:"$appointment"
            },
        
            {
                $lookup:{
                    from:"vehicles",
                    localField:"appointment.vehicleId",
                    foreignField:"_id",
                    as:"vehicle"
                }
            },
            {
                $unwind:"$vehicle"
            },
            {
                $lookup:{
                    from:"users",
                    localField:"mechanicId.id",
                    foreignField:"_id",
                    as:"mechanic"
                }
            
        },
        
        {
            $project:{
             _id:1,
             mechanic:1,
             status:1,
             "appointment._id":1,
             "appointment.appointmentDate":1,
                "appointment.timeslot":1,
                "appointment.servicetype":1,
               "status": "$appointment.status",
                "vehicle._id":1,
                "vehicle.model":1,
                "vehicle.year":1,
                "vehicle.VIN":1,
     
                mechanicId:{
                  $filter:{
                    input:"$mechanicId",
                    as:"mech",
                    cond:{ $eq:["$$mech.id",mechanicId]}
                  }
                }
                 
            }
        }
          
        

        ]);
        console.log("Service Jobs fetched for mechanic ",serviceJobs);
        return res.status(200).json({success:true,serviceJobs});
        
    } catch (error) {
        console.log("Error in getMechanicServiceJobs controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}




export const updateServiceJobController=async (req,res) => {
    try {
        console.log("this is work")
        const appointmetId=req.params.serviceJobId;
        
        const updatedServiceJob=await Appointment.findByIdAndUpdate(appointmetId,{status:"completed"},{new:true});
    
        return res.status(200).json({success:true,updatedServiceJob});
        
    } catch (error) {
    console.log("Error on updateServiceJob controller ",error.message);
    res.status(500).json({success:false,message:"Internal server error"});
    }
    
}






