import React, { useEffect } from 'react'
import addminStore from '../store/addmin'
import { Loader } from 'lucide-react';
import Search from './Search';

function ManageAppointment() {
  const {GetAllAppoitments,AppointmetData,loading,UpdateAppointmentStatus}=addminStore();
   const [services,setServices]=React.useState();

  useEffect(() => {
    GetAllAppoitments();
  }, []);
  useEffect(()=>{
    
    setServices(AppointmetData)
  },[AppointmetData])

  if(loading || !services) return <div className='flex justify-center items-center h-screen '><Loader  size={45} className='animate-spin'/></div>;


  function HandelAction(id,action){
    UpdateAppointmentStatus(id,action);
  }
function searchResult(result){
  setServices(result);
}
  
  return (
    <div>
      <div className="flex justify-between">
      <h2 className="font-bold md:text-2xl text-xl mb-3 ">Manage Cars Appointment</h2>
       <Search data={AppointmetData} searchResult={searchResult}/>

      </div>

{services?.length>0 &&  <div className="max-h-full overflow-y-auto  max-w-4xl w-full ">
              <table className="   w-full text-sm  md:text-md  ">
                <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
                  <tr>
                    <th className="text-start p-1 px-2.5 max-lg:hidden">Owner name</th>
                    <th className="text-start p-1 px-2.5">Car model</th>
                    <th className="text-start p-1 px-2.5">VIN</th>
      
                    <th className="text-start p-1 px-2.5">Appointment date</th>
                    <th className="text-start p-1 px-2.5 max-md:hidden">Service type</th>
                    <th className="text-start p-1 px-2.5"> Status</th>
                    <th className="text-start p-1 px-2.5"> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((val, index) => (
                    <tr className="border border-gray-500 " key={index}>
                      <td className="p-2.5 max-lg:hidden">{val.user?.name}</td>
                      <td className="p-2.5">{val.vehicle?.model}</td>
                      <td className=" p-2.5">{val.vehicle?.VIN}</td>
      
                      <td className=" p-2.5">{val.appointmentDate?.split("T")[0]}</td>
                      <td className=" p-2.5 max-md:hidden">{val?.servicetype}</td>
                      <td className={`p-2.5 ${val.status === "in-progress" && "text-yellow-500"} ${val.status === "booked" && "text-blue-500" } ${val?.status === "canceled" && "text-red-500" } ${val.status === "completed" && "text-green-500" }  `}>{val.status}</td>
                      <td className=" p-2.5">
                        <div >
                          <select name="action"
                           onChange={(e)=>HandelAction(val._id,e.target.value)}
                           className='border border-gray-500 py-1 px-2 rounded ' defaultValue={val.status}>
                            <option value="booked">booked</option>
                            <option value="in-progress">In-progress</option>
                            <option value="canceled">canceled</option>
                          </select>
                          
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
    </div>
  )
}

export default ManageAppointment