import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate=useNavigate()
  return (
    <div className='h-screen overflow-hidden shadowiner'>
        <img src="/banner-website.jpg " alt="banner car image" className='hidden md:block h-full w-full object-cover'/>
        <img src="/banner-mobile.png" alt="banner car image" className=' md:hidden h-full w-full object-cover' />

        <div className='absolute top-1/2 md:left-20 left-6 lg:left-1/6 -translate-y-1/2 text-white z-30'>
           <h1 className='font-bold  md:text-4xl sm:text-3xl text-2xl mb-6 tracking-wider'>YOUR TRUSTED <br /> AUTO SERVICE EXPERTS</h1> 
           <p className='font-medium tracking-wider '>Book your appointment online, get transparent pricing, <br /> and drive with confidence.</p>

           <div className='flex gap-4 mt-6 flex-wrap'>
            <button onClick={()=>navigate("/appointment")} className='bg-blue-400 font-semibold text-white py-2 px-4 rounded-lg cursor-pointer '>Book Your Service</button>
            <button onClick={()=>navigate("/service")} className=' text-white font-semibold py-2 px-4 rounded-lg border border-white cursor-pointer hover:bg-blue-400 hover:border-blue-400'>View All Services</button>           
           </div>
        </div>
    </div>
  )
}

export default Header