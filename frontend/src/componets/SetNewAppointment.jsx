import React, { useEffect } from 'react'
import axios from '../middleware/axios';
import serviceStore from '../store/service';
import {Loader} from 'lucide-react';
import toast from 'react-hot-toast';

function SetNewAppointment({formdata=null,setShowAppointmentform,update=false}) {
    console.log("form data lloook",formdata);
    const {formLoading,SetAppointment,TimeSlot,UpdateAppointment}=serviceStore();
    const [slots,setSlots]=React.useState([]);
    const [appointment,setAppointment]=React.useState({
        
        appointmentDate: formdata?.appointmentDate|| "",
        timeslot:formdata?.timeslot || "",
        servicetype:formdata?.servicetype || "oil change",
        fullTimeSlot:formdata?.fullTimeSlot || "",
        model:formdata?.model || formdata?.vehicleId?.model || "",
        year:formdata?.year ||formdata?.vehicleId?.year || "",
        VIN:formdata?.VIN || formdata?.vehicleId?.VIN || "",
    });

    useEffect(()=>{
        async function getSlots() {
            
            if(appointment.appointmentDate && appointment.servicetype){
               
                
                  const response=  await TimeSlot(appointment.appointmentDate,appointment.servicetype);
                    
                    setSlots(response.availableSlots.slice(0,4));
                    if(!appointment.timeslot){
                    setAppointment({...appointment,timeslot:response.availableSlots[0]?.displayTime,fullTimeSlot:response.availableSlots[0]?.startTime});
            }
              
            }
        }

        getSlots();
        
    },[appointment.appointmentDate,appointment.servicetype]);
    function handleInput(e){
        if(e.target.name=="timeslot"){
            const fulltime=slots?.find((slot)=>slot.displayTime==e.target.value);
            setAppointment({...appointment,[e.target.name]:e.target.value,fullTimeSlot:fulltime.startTime});
        }else{
            setAppointment({...appointment,[e.target.name]:e.target.value});
        }

    }
    

    async function handleForm(e){
        e.preventDefault();
     if(update){
        toast.success(formdata?._id);
      
      const response=await  UpdateAppointment(formdata?._id,appointment);
        response==="true" &&  setShowAppointmentform(false);
    
     }else{
      const response=await  SetAppointment(formdata?._id, appointment);
     
     response==="true" &&  setShowAppointmentform(false);
     }
    }

  return (
    <div>

        <fieldset className='border border-gray-400 rounded p-4'>
      
      <legend className='sm:text-xl text-md font-bold text-center '>{update?"Update Appointment":"New Appointment"}</legend>

        <form onSubmit={handleForm} className='space-y-5'>
            <div className='flex justify-between gap-3 max-sm:flex-col'>
           
            <div className='appointmentdiv'>
                <label htmlFor="appointmentDate" >Appointment Date</label>
                <input type="date" min={new Date().toISOString().split('T')[0]} form='yyy-mm-dd'  id="appointmentDate" name='appointmentDate' onChange={handleInput} className='appointmentinput' value={appointment.appointmentDate && new Date(appointment.appointmentDate).toISOString().split("T")[0]} onClick={(e)=> e.target.showPicker()}/>
            </div>
               <div className='appointmentdiv'>
                <label htmlFor="servicetype">Service Type</label>
               

                <select name="servicetype" id="servicetype" onChange={handleInput} className='appointmentinput' value={appointment.servicetype}>
                    <option value="oil change">Oil change</option>
                    <option value="tire rotation">Tire rotation</option>
                    <option value="breack inspection">Breack inspection</option>
                    <option value="engine diagnostics">Engine diagnostics</option>
                    
                
                </select>
            </div>
            </div>

          <div className='flex justify-between gap-3 max-sm:flex-col'>
            
            <div className='appointmentdiv'>
                <label htmlFor="timeslot">Time Slot</label>
                <select name="timeslot" id="timeslot" onChange={handleInput} className='appointmentinput'  value={appointment.timeslot}>
                    {slots.map((slot,index)=><option key={index} value={slot.displayTime}>{slot.displayTime}</option>)}
                </select>
            </div>
         
          
            <div className='appointmentdiv'>
                <label htmlFor="model">Model</label>
                <input type="text" id="model" name='model' onChange={handleInput} className='appointmentinput' value={appointment.model} readOnly={update || formdata?.model }/>
            </div>
            <div className='appointmentdiv'>
                <label htmlFor="year">Year</label>
                <input type="text" id="year" name='year' onChange={handleInput} className='appointmentinput' value={appointment.year} readOnly={update || formdata?.year }/>
            </div>
       </div>

            <div className='appointmentdiv'>
                <label htmlFor="VIN">VIN</label>
                <input type="text" id="VIN" name='VIN' onChange={handleInput} className='appointmentinput' value={appointment.VIN} readOnly={update || formdata?.VIN}/>
            </div>
            <button disabled={formLoading} type='submit' className={`${formLoading ? "cursor-not-allowed bg-green-400/50 " : "bg-green-400 "} py-2 px-3 rounded text-sm w-full cursor-pointer font-bold flex justify-center items-center`}>{formLoading ? <Loader size={18}/> :(update ? "Update" : "Booking")} </button>
        </form>

        </fieldset>
    </div>
  )
}

export default SetNewAppointment