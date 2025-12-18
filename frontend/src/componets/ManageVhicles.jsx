import React, { useEffect } from 'react'
import {Loader, Trash2} from 'lucide-react'
import addminStore from '../store/addmin'
function ManageVhicles() {
  const {loading,GetVehicles,AppointmetData,DeleteCar}=addminStore();

  useEffect(() => {
    GetVehicles();
  }, []);

  if(loading) return <div className='flex justify-center items-center h-screen '><Loader  size={45} className='animate-spin'/></div>;


  return (
    <div>
      <h2 className="font-bold md:text-2xl text-xl mb-3 ">Manage Vhicles</h2>

     {AppointmetData?.length>0 &&  <div className="max-h-full overflow-y-auto  max-w-4xl w-full ">
              <table className="   w-full text-sm  md:text-md  ">
                <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
                  <tr>
                    <th className="text-start p-1 px-2.5">Owner name</th>
                    <th className="text-start p-1 px-2.5">Car model</th>
                    <th className="text-start p-1 px-2.5">VIN</th>
                  
                    <th className="text-start p-1 px-2.5"> Action</th>
                  </tr>
                </thead>
                <tbody>
                  {AppointmetData.map((val, index) => (
                    <tr className="border border-gray-500 " key={index}>
                      <td className="p-2.5 ">{val.userId?.name}</td>
                      <td className="p-2.5">{val.model}</td>
                      <td className=" p-2.5">{val.VIN}</td>
      
                      <td className=" p-2.5">
                        <div className='flex items-center gap-4'>
                          <button onClick={()=>DeleteCar(val._id)} className='cursor-pointer'><Trash2 size={18} color='red'/></button>
                        
                          
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

export default ManageVhicles