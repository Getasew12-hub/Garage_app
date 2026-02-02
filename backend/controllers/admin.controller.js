import ServiceJob from "../model/serviceJob.js";
import Vehicle from "../model/vehicle.js";
import User from "../model/user.js";
import Appointment from "../model/appointment.js";
export const getDashboardController=async (req,res) => {
    try {
        const totalVicles=await Vehicle.estimatedDocumentCount();
        const toataCustomer=await User.countDocuments({role:"customer"});
        const totalAppontment=await Appointment.estimatedDocumentCount();
        const totalPendingAppontment=await Appointment.countDocuments({status:"pending"});
        const totalCompletedAppontment=await Appointment.countDocuments({status:"completed"});

        const recentAppontment=await Appointment.find().sort({createdAt:-1}).limit(5).populate("vehicleId");
     
    const today = new Date();
    
       const sevenDaysBefore = new Date(today);
       sevenDaysBefore.setDate(today.getDate() - 7);

    const  Today=today.toISOString().split('T')[0];
    const Endday=sevenDaysBefore.toISOString().split('T')[0]
        const alldays= sevendays(sevenDaysBefore,today);
   
      const tommorow=new Date();
      tommorow.setDate(today.getDate()+1);
       
            const total_Appontment=await Appointment.aggregate([
             {
                $match:{
                    createdAt:{$lt:new Date(tommorow),$gte:new Date(Endday)}
                }
             },
             {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}},
                    totalAppontment:{$sum:1},
                }
             },
             {
                $project:{
                    _id:0,
                    createdAt:"$_id",
                    totalAppontment:1
                }
             }
            ])

            const total_service=await ServiceJob.aggregate([
             {
                $match:{
                    createdAt:{$lt:new Date(tommorow),$gte:new Date(Endday)}
                }
             },
             {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}},
                    total_service:{$sum:1},
                }
             },
             {
                $project:{
                    _id:0,
                    createdAt:"$_id",
                    total_service:1
                }
             }
            ])

  
        const filterdata=alldays.map((day)=>{
          const totalAppontment = total_Appontment.find(item=>item.createdAt===day);
          const totalservice = total_service.find(item=>item.createdAt===day);

          return {day:day,total_Appontment:totalAppontment?.totalAppontment||0,total_service:totalservice?.total_service||0};

        })
       const operationOverview=await Promise.all(filterdata);
     

        return res.status(200).json({success:true,totalVicles,toataCustomer,totalAppontment,totalPendingAppontment,totalCompletedAppontment,recentAppontment,operationOverview});

        
    } catch (error) {
        console.log("Error on getDashboard controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}



export const getServiceJobsController=async(req,res)=>{
    
      
    try {
        const serviceJobs=await ServiceJob.aggregate([
            {
                $lookup:{
                    from:"appointments",
                    localField:"appointmentId",
                    foreignField:"_id",
                    as:"appointment"
                }
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
            }
        ])
     
        return res.status(200).json({success:true,serviceJobs});
    } catch (error) {
        console.log("Error in getServiceJobs controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }

}

export const addServiceJobController=async(req,res)=>{
    try {
        const {seletDate,val}=req.body;
     
            const newServiceJob=await ServiceJob.create({appointmentId:val._id,appointmentDate:val.appointmentDate,mechanicId:seletDate,vehicleId:val.vehicleId});

        
            await Appointment.findByIdAndUpdate(val._id,{status:"in-progress"});
       
        
        return res.status(200).json({success:true,newServiceJob});
         
    } catch (error) {
        console.log("Error in addServiceJob controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
export const updateServiceMechanicsController=async (req,res) => {
        try {
        const {seletDate,val}=req.body;
     
            

            const updateServiceJob=await ServiceJob.findByIdAndUpdate(val._id,{mechanicId:seletDate},{new:true});

        
       
        
        return res.status(200).json({success:true,updateServiceJob});
         
    } catch (error) {
        console.log("Error in addServiceJob controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
export const deleteServiceJobController=async (req,res) => {
    try {
        const serviceJobId=req.params.serviceJobId;
        await ServiceJob.findByIdAndDelete(serviceJobId);
        return res.status(200).json({success:true,message:"Service job deleted successfully"});
        
    } catch (error) {
        console.log("Error on deleteServiceJob controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}

export const getMechanicsController=async (req,res) => {
    try {
        const mechanics=await User.find({role:"mechanic"});
        return res.status(200).json({success:true,mechanics});
        
    } catch (error) {
        console.log("Error on getMechanics controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}


export const getAppointmentsController=async (req,res) => {
    try {
        const appointments=await Appointment.aggregate([
            {
                $lookup:{
                    from:"vehicles",
                    localField:"vehicleId",
                    foreignField:"_id",
                    as:"vehicle"
                }
            },{
                $unwind:"$vehicle"

            },{
                $lookup:{
                    from:"users",
                    localField:"vehicle.userId",
                    foreignField:"_id",
                    as:"user"
                }
            },
            {
                $unwind:"$user"
            }
        ])
        return res.status(200).json({success:true,appointments});
        
    } catch (error) {
        console.log("Error on getAppointments controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
export const getAppointemetCarsController=async (req,res) => {
    try {
        const appointments=await Appointment.aggregate([

            {
                $match:{status:"booked"}
            },
            {
                $sort:{createdAt:-1}
            }
            ,{
                $lookup:{
                    from:"vehicles",
                    localField:"vehicleId",
                    foreignField:"_id",
                    as:"vehicle"
                },
                
            },{
                $unwind:"$vehicle"
            },
            {
            $lookup:{
                from:"users",
                localField:"vehicle.userId",
                foreignField:"_id",
                as:"user"
            }
            },
            {
                $unwind:"$user"
            }
        ])
        return res.status(200).json({success:true,appointments});
        
    } catch (error) {
        console.log("Error on getAppointments controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
export const getVehiclesController=async (req,res) => {
    try {
        const vehicles=await Vehicle.find({}).populate("userId");
        return res.status(200).json({success:true,vehicles});
        
    } catch (error) {
        console.log("Error on getVehicles controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}

export const getUsersContorller=async (req,res) => {
    try {
        const {_id}=req.user;
        const users=await User.find({_id:{$ne:_id}}).sort({createdAt:-1});
        return res.status(200).json({success:true,users});
    } catch (error) {
        console.log("Error on getUsers controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
}

export const changeUserRoleController=async (req,res) => {
    try {
        const userId=req.params.userId;
        const updateData=req.body;
        const updatedUser=await User.findByIdAndUpdate(userId,updateData,{new:true});
        return res.status(200).json({success:true,updatedUser});
    } catch (error) {
        console.log("Error on changeUserRole controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
    
}


export const updateSeriveStatusController=async (req,res) => {
    try {
         
        const serviceJobId=req.params.serviceJobId;
        const updateData=req.body;
            console.log(updateData);
            console.log(serviceJobId);
            const get=await ServiceJob.findById(serviceJobId).populate("appointmentId","_id");
           
        await ServiceJob.findByIdAndUpdate(serviceJobId,updateData,{new:true});
        await Appointment.findByIdAndUpdate(get.appointmentId._id,updateData,{new:true});
        return res.status(200).json({success:true});
    } catch (error) {
        console.log("Error on updateSeriveStatus controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}


export const deleteCarController=async (req,res) => {
    try {
        const id=req.params.id;
        const checkCarstatus=await Appointment.find({vehicleId:id,$or:[{status:"completed"},{status:"canceled"}] });

        if(checkCarstatus.length>0)   return res.status(400).json({success:false,message:"You can't delete this car"});


         
        await Vehicle.findByIdAndDelete(id);
        await Appointment.deleteMany({_id:id});
        await ServiceJob.deleteMany({vehicleId:id});
        return res.status(200).json({success:true});
       

      
    } catch (error) {
        console.log("Error on deleteCar controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}

export const deleteUserController=async (req,res) => {
    try {
        const userId=req.params.userId;
        const getUserAppointments=await Appointment.find({userId,$and:[{status:{$ne:"completed"}},{status:{$ne:"canceled"}}] });

        if(getUserAppointments.length>0)   return res.status(400).json({success:false,message:"You can't delete this user"});

        await User.findByIdAndDelete(userId);
        
        await Vehicle.deleteMany({userId});
        const appointmentId=await Appointment.findOne({userId});
        await Appointment.deleteMany({userId});
        
        await ServiceJob.deleteMany({appointmentId});
        return res.status(200).json({success:true});
    } catch (error) {
        console.log("Error on deleteCar controller ",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
        
    }
    
}




function sevendays(start,end){
    const dates=[];
   while(start<=end){
    dates.push(start.toISOString().split("T")[0]);
    start.setDate(start.getDate()+1);
   }
   return dates;
}