import { create } from "zustand";
import axios from "../middleware/axios";
import { toast } from "react-hot-toast";

function validateData(data) {
    const dataArray=Object.values(data);
    for (const item of dataArray) {
        if (!item) {
            return false;
        }
    }
    return true;
}
const serviceStore = create((set, get) => ({
   loading:false,
   formLoading:false,
   userAppointment:[],
   userCars:[],
   GetUserAppointment:async () => {
    set({ loading: true });
    try {
   const response=await axios.get("/appointment/getUserAppointments");
     console.log("this is user appointment now and from",response.data.appointments);
        set({ userAppointment: response.data.appointments });
    } catch (error) {
        console.error("Login error:", error);
       
        
    } finally {
        set({ loading: false });
    }   
   },
   GetUserCars:async() => {
      set({ loading: true });
      try {
        const response=await axios.get("/vehicle/getUservehicles");

        set({ userCars: response.data.vehicles });
      } catch (error) {
        console.error("Login error:", error);
        set({ userCars: [] });
        
      } finally{
        set({ loading: false });
      }
   },
   GetMechanicsWork:async() => {
      set({ loading: true });
      try {
         const response=await axios.get("/service-job/getMechanicServiceJobs");
         set({ userAppointment: response.data.serviceJobs });
         
      } catch (error) {
         console.error("Login error:", error);
         set({ userAppointment: [] });
         
      }finally{
        set({ loading: false });
      }
   },
   SetAppointment:async (vehicleId,val) => {
   
         if(!validateData(val)){
            return toast.error("Please provide all required fields");
            
         }
         set({formLoading:true});

         try {
            const {appointmentDate,timeslot,servicetype,model,year,VIN,fullTimeSlot}=val;
            const response=await axios.post("/appointment/addAppointment",{vehicleId,appointmentDate,timeslot,servicetype,model,year,VIN,fullTimeSlot});
         
            if(vehicleId==null || vehicleId==undefined || vehicleId=="undefined" || vehicleId=="null"){
               console.log("adding new car and appointment",response.data.newAppointment);
                set({userCars:[response.data.newAppointment,...get().userCars],userAppointment:[{...response?.data?.newAppointment},...get().userAppointment]})
            }else{
               
               const updateval={...response?.data?.newAppointment,vehicleId:{VIN}}
                set({userAppointment:[updateval,...get().userAppointment]})
            }
            toast.success("Appointment added successfully");
            return "true"
         } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed");
            return "false"
            
         }finally{
            set({formLoading:false});
         }
    
   },
  UpdateAppointment:async (vehicleId,val) => {
     if(!vehicleId) return toast.error("unable to update appointment");
      console.log("updating appointment in store",val);
     set({formLoading:true});
     try {
      const response=await axios.put(`/appointment/updateAppointment/${vehicleId}`,{val});
      const updatedAppointment=response.data.updatedAppointment;
      console.log("the updated appointment is this",updatedAppointment);
      set({userAppointment:get().userAppointment.map((appointment)=> appointment._id===vehicleId ? {...appointment,servicetype:updatedAppointment.servicetype,appointmentDate:updatedAppointment.appointmentDate,timeslot:updatedAppointment.timeslot} : appointment)});
      toast.success("Appointment updated successfully");
      return "true";
     } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Update failed");
      return "false";
      
     }finally{
      set({formLoading:false});
     }
   
  },

   TimeSlot:async (date,serviceType) => {
    try {
          const response=await axios.post(`/appointment/getSlots`,{date,serviceType});
    return response.data 
    } catch (error) {
       console.log(error); 
    }
 
   },

   RemoveCars:async(vehicleId) => {
      try {
         const response=await axios.delete(`/vehicle/deleteVehicle/${vehicleId}`);
         set({userCars:get().userCars.filter((vehicle) => vehicle._id !== vehicleId)});
      } catch (error) {
         console.log(error); 
         toast.error(error.response?.data?.message || " failed to delete vehicle");
      }
   },
   CompleteMechanicJob:async(serviceJobId) => {
      try {
         const response=await axios.put(`/service-job/updateServiceJob/${serviceJobId}`);
       
         set({userAppointment:get().userAppointment.map((job) => job.appointment._id === serviceJobId ? {...job,status:"completed"} : job)});
         toast.success("Service job marked as completed");
      } catch (error) {
         console.log(error); 
         toast.error(error.response?.data?.message || " failed to update service job");
      }
   },

   DeleteAppointment:async (id) => {
      try {
         const response=await axios.delete(`/appointment/deleteAppointment/${id}`);
         set({userAppointment:get().userAppointment.filter((val)=> val._id!==id)});
         toast.success("Sucessfully Deleted")
      } catch (error) {
         
         toast.error(error.response?.data.message || "Faild to delete")
         
      }
      
   }


  
}));


export default serviceStore