import React,{useState}from 'react'

export default function FinalRegister() {
    const [otp,setotp] = useState("");
    
   

  return (
    <>
        <h2 className='font-bold'>Setup Your Account</h2>
            <p>Fill up Your Details</p>
            <input type="text" className='border-2 mx-2  my-3 p-2 w-full border rounded-[5px]'  placeholder='Enter name'/>
            <input type="password" className='border-2 mx-2  my-3 p-2 w-full border rounded-[5px]'  placeholder='Enter password'/>
            <button className="p-[3px] relative mt-3 mx-2 mb-3 " >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-slate-700 rounded-full" />
                    <div className="px-8 py-2  bg-gray-900 rounded-full  relative group transition duration-200 text-white hover:bg-white hover:text-black ">
                        Continue
                    </div>
                </button>
            <p>  <span className='text-gray-800 hover:font-medium'>Back To Home</span></p>
    </>
  )
}
