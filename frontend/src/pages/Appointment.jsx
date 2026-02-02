import React, { useEffect, useState } from 'react'
import SetNewAppointment from '../componets/SetNewAppointment'
import { ArrowRight, Delete, DeleteIcon, Flag, Loader, Plus, Trash2, X } from 'lucide-react'
import serviceStore from '../store/service';

function Appointment() {
  const { GetUserAppointment, userAppointment, loading, GetUserCars, userCars, RemoveCars, DeleteAppointment } = serviceStore();
  const [showAppointmentform, setShowAppointmentform] = useState(false);
  const [showAddCarform, setShowAddCarform] = useState(null);
  const [showUpdate, SetShowUpdate] = useState(false);

  useEffect(() => {
    if (showAddCarform && showAddCarform) {
      setShowAppointmentform(false)
    }
  }, [showAddCarform]);

  useEffect(() => {
    GetUserCars();
    GetUserAppointment();
  }, [])





  if (loading) return <div className='flex justify-center items-center h-screen '><Loader size={45} className='animate-spin' /></div>;
  return (
    <div className='max-w-6xl mx-auto px-4 mt-20 space-y-30'>
      <div>
       {userAppointment.length > 0 &&  <h2 className='font-bold mb-6 tracking-wider sm:text-2xl text-xl'>Your Appointments</h2>}

        {
          userAppointment.length > 0 &&
          userAppointment.map((item, index) => {
            return (
              <div key={item._id} className='flex gap-6 bg-gray-700 p-4 rounded w-fit my-4 max-sm:text-sm flex-wrap'>
                <p>VIN : <span className='font-semibold tracking-wider'>{item.vehicleId?.VIN}</span> </p>
                <p>Appointment Date : <span className='font-semibold tracking-wider'>{item.appointmentDate?.split("T")[0]}</span> </p>
                <p>Appointment Time : <span className='font-semibold tracking-wider'>{item.timeslot}</span> </p>
                <p>Service Type : <span className='font-semibold tracking-wider'>{item.servicetype}</span> </p>
                <div className='flex  items-center gap-3 flex-wrap'>

                  <span>status:</span><p className={`flex gap-1.5 h-fit ${item.status == "in-progress" && "bg-yellow-500/30 text-yellow-500"} ${item.status == "completed" && "bg-green-500/30 text-green-500"} ${item.status == "canceled" && "bg-red-500/30 text-red-500"}  ${item.status == "booked" && "bg-blue-500/30 text-blue-500"} rounded py-1 px-2  h-fit `}>{item.status}</p>
                </div>
                {item?.status == "booked" && <button onClick={() => {
                  console.log("updating appointment",item);
                  setShowAddCarform(item);
                  SetShowUpdate(true);
                }} className='bg-blue-500 rounded px-2 py-1 text-sm cursor-pointer'>Update</button>}

                {(item.status == "booked" || item.status == "completed") && <button onClick={() => DeleteAppointment(item._id)} className='cursor-pointer text-red-500 '><DeleteIcon /></button>}
              </div>
            )
          })
        }
      </div>

      <div>
        <h2 className='font-bold mb-6 tracking-wider sm:text-2xl text-xl'>Set New Appointment</h2>

        {userCars.length > 0 &&
          <>
            <p className='font-bold'>Your car</p>
            {
              userCars.map((item, index) => {
                return (
                  <div key={item._id} className='flex gap-6 backgroundDiv p-4 rounded w-fit my-4 max-sm:text-sm flex-wrap'>
                    <p>model : <span className='font-semibold tracking-wider'>{item.model}</span> </p>
                    <p>VIN : <span className='font-semibold tracking-wider'>{item.VIN}</span> </p>
                    <p>year : <span className='font-semibold tracking-wider'>{item.year}</span> </p>
                    <div className='flex'>
                    <button onClick={() => {
                      setShowAddCarform(item);
                      SetShowUpdate(false);
                    }} className='flex gap-1.5 bg-blue-500 rounded py-1 px-2 cursor-pointer h-fit'>Book <ArrowRight /></button>

                    <button onClick={() => RemoveCars(item._id)} ><Trash2 color='red' className='cursor-pointer ml-6' /></button>
                  </div>
                  </div>
                )
              })
            }
          </>
        }
        {showAddCarform && <div onClick={() => setShowAddCarform(null)} className='fixed inset-0 flex justify-center items-center bg-black/50'>
          <div className='bg-gray-700 mx-3 max-w-4xl relative w-full  pb-12 px-6 rounded-md max-h-3/4 overflow-y-auto overlowremove '
            onClick={(e) => e.stopPropagation()}>

            <X className='sticky ml-auto  top-0 cursor-pointer my-3 bg-gray-700 shadow-lg shadow-black' onClick={() => setShowAddCarform(null)} />
            <SetNewAppointment formdata={showAddCarform} setShowAppointmentform={setShowAddCarform} update={showUpdate} />

          </div>
        </div>}
        <button onClick={() => setShowAppointmentform(!showAppointmentform)} className='flex justify-center items-center gap-2 bg-green-400 py-1 px-2 rounded font-semibold cursor-pointer mt-20'>Add New Car <Plus /></button>
        {showAppointmentform && <SetNewAppointment setShowAppointmentform={setShowAppointmentform} />}

      </div>
    </div>
  )
}

export default Appointment