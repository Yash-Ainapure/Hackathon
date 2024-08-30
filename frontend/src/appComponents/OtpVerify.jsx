import React,{useState}from 'react'

export default function OtpVerify(props) {
    const [otp,setotp] = useState("");
    
    const checkOtp = ()=>{
        console.log(otp);
        return props.check(true)
    }


  return (
    <>
        <h2 className='font-bold'>Verify your email</h2>
            <p>Enter the 6-digit code we sent to your email</p>
            <input type="text" onChange={(event)=>{setotp(event.target.value)}} value={otp} className='border-2 mx-2  my-3 p-2 w-full border rounded-[5px]'  placeholder='Enter code'/>
            <button className="p-[3px] relative mt-3 mx-2 mb-3 " onClick={checkOtp}>
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-slate-700 rounded-full" />
                    <div className="px-8 py-2  bg-gray-900 rounded-full  relative group transition duration-200 text-white hover:bg-white hover:text-black ">
                        Verify
                    </div>
                </button>
            <p>Didn't receive the code? <span className='text-gray-800 hover:font-medium'>Resend</span>
            </p>
    </>
  )
}
