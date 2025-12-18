import Appointment from "../model/appointment.js";
import Vehicle from "../model/vehicle.js";
import ServiceJob from "../model/serviceJob.js";
import User from "../model/user.js";


const WORK_START_HOUR = 2;   // 9:00 AM
const WORK_END_HOUR = 12;    // 5:00 PM (17:00)

// Example: A function to get service duration from a database or configuration
function getServiceDurationMinutes(serviceType) {
    switch (serviceType) {
        case 'oil change':
            return 30;
        case 'tire rotation':
            return 60; 
        case 'breack inspection':
            return 60; 
        case 'engine diagnostics':
            return 180; 
        default:
            return 60; 
    }
}




function generatePotentialSlots(date, duration) {
    const slots = [];

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    let currentTime = new Date(
        year,
        month,
        day,
        
        WORK_START_HOUR,
        0, // start at the top of the hour (e.g., 9:00)
        0
    );
   
    const endOfDay = new Date(
        year,
        month,
        day,
        WORK_END_HOUR,
        0,
        0
    );
   




    // Loop through the day
    while (currentTime.getTime() < endOfDay.getTime()) {
        const slotEnd = new Date(currentTime.getTime() + duration * 60000); // Add service duration

        // Check if the service finishes before the end of the workday
        if (slotEnd.getTime() <= endOfDay.getTime()) {
            slots.push({
                startTime: new Date(currentTime),
                endTime: slotEnd,
                // Format the time for display (e.g., '9:00 AM')
                displayTime: currentTime.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }),
                isAvailable: true // Assume available initially
            });
        }
        
        // Advance to the next slot interval
        const breakInMs = 10 * 60000; 
        currentTime = new Date(slotEnd.getTime() + breakInMs);
    }

    return slots;
}





// Example ServiceJob Model structure for clarity
// { appointmentDate: Date, durationMinutes: Number, mechanicId: ObjectId }

async function getBookedJobs(date) {
    const startOfSelectedDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const startOfNextDay = new Date(startOfSelectedDay);
    startOfNextDay.setDate(startOfSelectedDay.getDate() + 1);

    // Query all jobs for the selected day
    const bookedJobs = await Appointment.find({
        appointmentDate: {
            $gte: startOfSelectedDay,
            $lt: startOfNextDay
        }
    })
    .lean(); // Use .lean() for faster, plain JavaScript objects

    return bookedJobs;
}



function filterSlotsByBookings(potentialSlots, bookedJobs) {
   
    const TOTAL_MECHANICS = 2; 

    return potentialSlots.map(slot => {
        let overlappingJobsCount = 0;

        bookedJobs.forEach((job) => {
            // Calculate job end time
             const jobDurationMinutes = getServiceDurationMinutes(job.serviceType)
            const jobStartTime = job.fullTimeSlot.getTime();
            const jobEndTime = jobStartTime + jobDurationMinutes * 60000;
         
          
            // Check for overlap: Slot starts before job ends AND Slot ends after job starts
            if (slot.startTime.getTime() < jobEndTime && slot.endTime.getTime() > jobStartTime) {
                overlappingJobsCount++;
            }
        });

        // The slot is available ONLY if the number of overlapping jobs 
        // is LESS THAN the total number of mechanics.
        if (overlappingJobsCount >= TOTAL_MECHANICS) {
            slot.isAvailable = false;
        }

        return slot;
    });
}





export const getUserAppointmentsController=async(req,res)=>{
     try{
        const userId=req.user._id;
        const appointments=await Appointment.find({userId}).populate("vehicleId").sort({createdAt:-1});
        return res.status(200).json({success:true,appointments});
     }
     catch(error){
        console.log("Error in getUserAppointments controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});

        
     }
}

export const addAppointmentController=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {vehicleId,appointmentDate,timeslot,servicetype,model,year,VIN,fullTimeSlot}=req.body;
      
        if(!appointmentDate || !timeslot || !servicetype ){
            return res.status(400).json({success:false,message:"Please provide all required fields"});
        }
    
        
       if(vehicleId){
           const newAppointment=await Appointment.create({userId,vehicleId,appointmentDate,timeslot,servicetype,fullTimeSlot});
           return res.status(200).json({success:true,newAppointment});
       }else{

        if (!appointmentDate || !timeslot || !servicetype ) {
    return res.status(400).json({ success: false, message: "Please provide all required fields" });
     }

     const existingVehicle = await Vehicle.findOne({ VIN });
     if (existingVehicle) {
         return res.status(400).json({ success: false, message: "Vehicle already exist" });
     }
           const newVehicle=await Vehicle.create({userId,model,year,VIN});
           const newAppointment=await Appointment.create({userId,vehicleId:newVehicle._id,appointmentDate,timeslot,servicetype,fullTimeSlot});

           return res.status(200).json({success:true,newAppointment:newVehicle});
       }
       
    }
    catch(error){
        console.log("Error in addAppointment controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const deleteAppointmentController=async(req,res)=>{
    try{
        const userId=req.user._id;
        const appointmentId=req.params.appointmentId;
        await Appointment.findByIdAndDelete(appointmentId);
        return res.status(200).json({success:true,message:"Appointment deleted successfully"});
    }
    catch(error){
        console.log("Error in deleteAppointment controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const updateAppointmentController=async(req,res)=>{
    try{
        const userId=req.user._id;
        const appointmentId=req.params.appointmentId;
        const updateData=req.body;
        console.log(updateData);
        const updatedAppointment=await Appointment.findByIdAndUpdate(appointmentId,updateData,{new:true});
        return res.status(200).json({success:true,updatedAppointment});

    }
    catch(error){
        console.log("Error in updateAppointment controller ",error.message);
        return res.status(500).json({success:false,message:"Internal server error"});
    }
}

export const suggestAppointmentController=async(req,res)=>{
  
    const { date: dateString, serviceType } = req.body;
    const selectedDate = new Date(dateString);

    const serviceDuration = getServiceDurationMinutes(serviceType);
  

    try {
        // 1. Generate all possible slots
        let slots = generatePotentialSlots(selectedDate,serviceDuration);
       
        // 2. Fetch all booked jobs for that day
        const bookedJobs = await getBookedJobs(selectedDate);
        console.log("booked jobs are this",bookedJobs);
        // 3. Filter the slots based on bookings and mechanic capacity
        slots = filterSlotsByBookings(slots, bookedJobs);

        // 4. Send the result back to the client
        const availableSlots = slots.filter(slot => slot.isAvailable);

        return res.json({ availableSlots });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching slots" });
    }
}
