import ServiceJob from "../model/serviceJob.js";





export const getMechanicServiceJobsController=async(req,res)=>{
    try {
        const mechanicId=req.user._id;
        const serviceJobs=await ServiceJob.find({mechanicId}).populate("vehicleId");
        return res.status(200).json({success:true,serviceJobs});
        
    } catch (error) {
        console.log("Error in getMechanicServiceJobs controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}




export const updateServiceJobController=async (req,res) => {
    try {
        const serviceJobId=req.params.serviceJobId;
        const updateData=req.body;
        const updatedServiceJob=await ServiceJob.findByIdAndUpdate(serviceJobId,updateData,{new:true});
        return res.status(200).json({success:true,updatedServiceJob});
        
    } catch (error) {
    console.log("Error on updateServiceJob controller ",error.message);
    res.status(500).json({success:false,message:"Internal server error"});
    }
    
}




