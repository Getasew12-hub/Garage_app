import React from 'react'
import Discription from '../componets/Discription'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

function About() {
  return (
    <div className='max-w-6xl mx-auto px-4 mt-20'>
        <div className='flex justify-between items-center flex-col lg:flex-row'>
            <div className='space-y-10'>
            <h1 className='font-bold text-2xl md:text-3xl'>We are highly skilled mechanics for your car repair</h1>
            <p className='tracking-wider'>Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing.</p>
            </div>


            <img src="/tires.png" alt="" />
        </div>

        <Discription/>


        <div className='flex justify-between items-center gap-5 mt-20 max-sm:flex-wrap'>
            <div className='surviceTestomon backgroundDiv lg:flex-row! lg:text-start! '>
                <SettingsSuggestIcon className='text-8xl! text-blue-400'/>
                <div className='space-y-6'>
                <p className='font-bold text-2xl'>Our Mission </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, consectetur! Quidem nostrum dolor, labore iusto dignissimos pariatur iste doloribus? Quis impedit error porro eligendi doloremque ratione aperiam esse quos voluptate!</p>
                </div>
            </div>
            <div className='surviceTestomon backgroundDiv lg:flex-row!  lg:text-start!'>
                <ContentPasteSearchIcon className='text-8xl! text-blue-400'/>

                <div className='space-y-6'>
                <p  className='font-bold text-2xl'>Our Vision </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, consectetur! Quidem nostrum dolor, labore iusto dignissimos pariatur iste doloribus? Quis impedit error porro eligendi doloremque ratione aperiam esse quos voluptate!</p>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default About