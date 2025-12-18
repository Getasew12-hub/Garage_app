import React from 'react'
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';

import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import AirIcon from '@mui/icons-material/Air';
import ConveyorBeltIcon from '@mui/icons-material/ConveyorBelt';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AppointmentSuggesiton from '../componets/AppointmentSuggesiton';

function Service() {
  const navigate=useNavigate()
  return (
    <div className='max-w-6xl mx-auto px-4 my-30 space-y-10'>
        <h1 className='font-bold text-3xl '>Our Featured Services</h1>
        <p>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.</p>

             
   <div className='grid grid-cols-2 sm:grid-cols-3  gap-4 sm:gap-8 text-white font-bold tracking-wider'>
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

            <div className='backgroundDiv surviceTestomon'>
               <EmojiTransportationIcon className='text-6xl! text-blue-400'/>
                Transmission Services</div>

            <div className='backgroundDiv surviceTestomon'>
                 <AirIcon className='text-6xl! text-blue-400'/>
                Air Conditioning / A/C Repair Services</div>
            <div className='backgroundDiv surviceTestomon'>
                 <ConveyorBeltIcon className='text-6xl! text-blue-400'/>
                 Belts And Hoses
                </div>
            <div className='backgroundDiv surviceTestomon'>
                 <LocalGasStationIcon className='text-6xl! text-blue-400'/>
                Oil Change / Lube, Oil and Filters
                </div>

            <div className='backgroundDiv surviceTestomon'>
                <FormatColorFillIcon className='text-6xl! text-blue-400'/>
             Denting & Painting
</div>



        </div>

    <AppointmentSuggesiton/>
    </div>
  )
}

export default Service