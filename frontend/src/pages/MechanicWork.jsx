import React from 'react'
import serviceStore from '../store/service'
import { useEffect } from 'react';
import { ArrowRightIcon, Loader } from 'lucide-react';

function MechanicWork() {
  const {GetMechanicsWork,loading,userAppointment}=serviceStore();
  const [showMechanics,setShowMechanics]=React.useState([]);
  useEffect(() => {
    GetMechanicsWork();
  }, []);

if (loading) return <div className='flex justify-center items-center h-screen '><Loader size={45} className='animate-spin'/></div>;
console.log("mechanic work page rendered ",userAppointment);
  return (
    <div className='max-w-6xl mx-auto px-4 my-20 space-y-10 '>
      <h1 className='font-bold text-2xl md:text-3xl '>Your Jobs</h1>

      {userAppointment.length===0 && <p className='text-center mt-10'>No Jobs Assigned Yet</p>}

  {userAppointment?.length>0 &&  <div className="max-h-full  overflow-auto  w-full overflowScroll ">
              <table className="   w-full text-sm  md:text-md  ">
                <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
                  <tr>
                    <th className="text-start p-1 px-2.5 text-nowrap">Car Model</th>
                    <th className="text-start p-1 px-2.5">VIN</th>
                    <th className="text-start p-1 px-2.5 text-nowrap">Service Type</th>
      
                    <th className="text-start p-1 px-2.5 text-nowrap ">Appointment date</th>
                    <th className="text-start p-1 px-2.5 ">Time</th>
                    <th className="text-start p-1 px-2.5"> Status</th>
                    <th className="text-start p-1 px-2.5"> Disctiption</th>
                    <th className="text-start p-1 px-2.5"> Mechanics</th>
                    <th className="text-start p-1 px-2.5"> Action</th>

                  </tr>
                </thead>
                <tbody>
                  {userAppointment.map((val, index) => (
                    <tr className="border border-gray-500 " key={index}>
                      <td className="p-2.5">{val.vehicle?.model}</td>
                      <td className=" p-2.5">{val.vehicle?.VIN}</td>
                      <td className=" p-2.5 ">{val?.appointment.servicetype}</td>
                      <td className=" p-2.5">{val.appointment.appointmentDate?.split("T")[0]}</td>
                      <td className="p-2.5 text-nowrap">{val.appointment?.timeslot}</td>
      
                      <td className={`p-2.5 ${val.status === "in-progress" && "text-yellow-500"} ${val.status === "booked" && "text-blue-500" } ${val?.status === "cancled" && "text-red-500" } ${val.status === "completed" && "text-green-500" }  `}>{val.status}</td>
                      <td className=" p-2.5 max-w-[200px] ">{val.mechanicId[0]?.dis}</td>
                      <td className=" p-2.5">
                        <div >
                         <button className='flex justify-center items-center gap-1 text-sm cursor-pointer' onClick={()=>setShowMechanics(val?.mechanic)}>Mechanics <ArrowRightIcon size={15}/></button>
                          
                        </div>
                      </td>
                      <td className=" p-2.5">
                        <div >
                          {val.status!=="completed" && <button
                           onClick={()=>serviceStore.getState().UpdateServiceJobStatus(val._id,"completed")}
                           className='bg-green-500 text-white py-1 px-3 rounded  '>Mark as Completed</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}

          {showMechanics.length>0 && <div className=' fixed inset-0 z-40 bg-black/25 flex justify-center items-start pt-20 ' onClick={()=>setShowMechanics([])}>

          <div className='backgroundDiv p-6 rounded' onClick={(e)=>e.stopPropagation()}>
              <h2 className='font-bold text-2xl md:text-3xl '>Mechanics</h2>
            
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 '>
                {showMechanics.map((mechanic,index)=>(
                  <div className='bg-gray-700 p-4' key={index}>
                    <h2 className='font-bold text-lg'>{mechanic.name}</h2>
                    
                    <p className='text-sm'>{mechanic.phone}</p>
                  </div>
                ))}
              </div>
              </div>
            </div>}

    </div>
  )
}

export default MechanicWork