import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
export default function Footer() {
  return (
    <div className='mt-10 flex flex-col items-center bg-[#181b1b]'>
    <div className='flex w-3/5 py-20 mx-5 border-b border-gray-300 text-white'>
      <div className='w-2/5'>
        <p className='font-bold text-xl'>CoLab</p>
        <p className='w-4/5'>Empower remote teamwork, 
          streamline success together.</p>
      </div>
      <div className='flex flex-col w-1/5'>
        <h1 className='text-xl font-bold '>Routes</h1>
        
          <p className='text-sm my-1'>About us</p>
          <p className='text-sm my-1'>Features</p>
          <p className='text-sm my-1'>Projects</p>
          <p className='text-sm my-1'>Dashboard</p>
          <p className='text-sm my-1'>Sign Up</p>
          
      </div>
      <div className='flex flex-col w-1/5 '>
        <h1 className='text-xl font-bold '>Others</h1>
        
          <p className='text-sm my-1'>Testimonials</p>
          <p className='text-sm my-1'>Feedback</p>          
          
      </div>
      <div className='flex flex-col w-1/5 '>
        <h1 className='text-xl font-bold '>Get In Touch</h1>
        <div className='flex justify-around w-4/5 my-2'>
        <GitHubIcon/>
          <WhatsAppIcon/>
          <InstagramIcon/>
        </div>
      
      </div>
      </div>
      <div className=' flex justify-center items-center bg-[#181b1b] text-white w-full h-20'>
        <p>© 2024 CoLab. All rights reserved</p>
        </div> 
    </div>
  )
}
