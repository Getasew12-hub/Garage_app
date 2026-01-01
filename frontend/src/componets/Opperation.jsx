import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function Opperation({recentAppontment,operationOverview=[]}) {

 const data = [
  { name: 'Jan', Repairs: 120, revenue: 450 },
  { name: 'Feb', Repairs: 180, revenue: 400 },
  { name: 'Mar', Repairs: 250, revenue: 520 },
  { name: 'Mar', Repairs: 250, revenue: 520 },
  { name: 'Mar', Repairs: 250, revenue: 520 },
  { name: 'Apr', Repairs: 220, revenue: 480 },
  { name: 'Apr', Repairs: 220, revenue: 480 },
  { name: 'Apr', Repairs: 220, revenue: 480 },
  // ... more months
];
console.log(operationOverview);
  return (
    <div className='mt-20 space-y-25 '>

        <div className='flex-1'>

        <h2 className='font-bold md:text-2xl text-xl mb-3'>Daily Operation overview</h2>
        <div>
   <LineChart
      style={{ width: '100%', maxWidth:"100%", height: '100%', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={operationOverview}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey="day" stroke='white'/>
         <YAxis yAxisId={"left"} dataKey="total_Appontment" stroke='white'/>
         <YAxis  yAxisId={"right"} orientation='right' dataKey="total_service" stroke='white'/>
         <Tooltip/>
      <Legend />
      <Line type="monotone" dataKey="total_service" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="total_Appontment" stroke="#82ca9d" />
    </LineChart>
    </div>
        </div>

    {recentAppontment &&   <div>
            <h2 className='font-bold md:text-2xl text-xl mb-3'>Recent Appointments</h2>
            <div>
                <table className="   w-full text-sm max-w-2xl  ">
            <thead className="sticky top-0 bg-gray-700 border border-gray-500 shadow-sm z-10   ">
              <tr  >
                <th className='text-start p-1 px-2.5'>car model</th>
                <th className='text-start p-1 px-2.5'>Appointment Date</th>
                <th className='text-start p-1 px-2.5'>servicetype</th>
                
                <th className='text-start p-1 px-2.5'>status</th>
              </tr>
            </thead>
            <tbody>
              {recentAppontment.map((val,index) => (
                <tr className="border border-gray-500 " key={index}>
                  <td className='p-2.5'>
                    
                    {val?.vehicleId?.model}
                     
                  </td>
                  <td className='p-2.5'>{val?.appointmentDate.split("T")[0]}</td>
                  <td className=" p-2.5">{val.servicetype}</td>
               
                  <td>
                   {val.status}
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>

        </div>}
        
       
    </div>
  )
}

export default Opperation