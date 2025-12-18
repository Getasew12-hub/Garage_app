import { ArrowRight, BellElectric } from 'lucide-react'
import React from 'react'
import {useNavigate} from "react-router-dom"


function OurServices() {
  const navigate=useNavigate()

  return (
    <div className='py-16 space-y-6'>
        <h2 className='font-bold text-3xl '>Our Services</h2>

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-8 text-white font-bold tracking-wider'>
            <div className='backgroundDiv surviceTestomon '>
                <img src="/tire.svg" alt="tire" className='h-10' />
              Tire Services</div>
            <div className='backgroundDiv surviceTestomon'>
                <img src="/engine.svg" alt="" className='h-10'/>
                Engine Diagnostics</div>
            <div className='backgroundDiv surviceTestomon'>
                <img src="/repair2.svg" alt="" className='h-10' />
                Brake Repair</div>
            <div className='backgroundDiv surviceTestomon'>
                <img src="/maintenance2.svg" alt="" className='h-10' />
                Routine Maintenance</div>
            <div className='backgroundDiv surviceTestomon'>
                <img src="/performance.svg" alt=""  className='h-10'/>
                Performance Tuning</div>
        </div>

        <button onClick={()=> navigate("/service")} className='border border-blue-400 rounded-md p-2.5 flex justify-center items-center mx-auto cursor-pointer hover:bg-blue-400'>View All Services <ArrowRight/></button>
    </div>
  )
}

export default OurServices