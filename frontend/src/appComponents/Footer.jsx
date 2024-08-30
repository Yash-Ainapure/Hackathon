import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col items-center bg-[#181b1b]'>
    <div className='flex w-3/5 py-20 mx-5 border-b border-gray-300 text-white'>
      <div className='w-2/5'>
        <p className='font-bold text-xl'>CoLab</p>
        <p>Empower remote teamwork, streamline success together.</p>
      </div>
      <div className='flex flex-col w-1/5'>
        <h1 className='text-xl font-bold '>Routes</h1>
        
          <p className='text-sm'>About us</p>
          <p className='text-sm'>Features</p>
          <p className='text-sm'>Projects</p>
          <p className='text-sm'>Dashboard</p>
          <p className='text-sm'>Sign Up</p>
          
      </div>
      <div className='flex flex-col w-1/5 '>
        <h1 className='text-xl font-bold '>Others</h1>
        
          <p>Testimonials</p>
          <p>Feedback</p>          
          
      </div>
      <div className='flex flex-col w-1/5 '>
        <h1 className='text-xl font-bold '>Get In Touch</h1>
        
          <p>Testimonials</p>
          <p>Feedback</p>          
          
      </div>
      </div>
      <div className='flex justify-center items-center bg-[#181b1b] text-white w-full h-20'>
        <p>© 2024 CoLab. All rights reserved</p>
        </div> 
    </div>
  )
}
