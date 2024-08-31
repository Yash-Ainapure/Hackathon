import FinalRegister from '../appComponents/FinalRegister'
import OtpVerify from '../appComponents/OtpVerify'
import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
export default function RegisterVerify(props) {

    const [isVerified,setVerified] = useState(false)
    const location = useLocation();
    const emailId = location.state?.emailId; // Access the data here
    const generatedOtp = location.state?.generatedOtp;

  return (

    <div className='grid place-items-center h-screen overflow-hidden'>
        <div className='w-1/4 h-[80%] border border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center'>
            <div className='py-4 text-2xl flex flex-col items-center justify-center'><h1 className='font-bold '>CoLab</h1>
            <p className='text-sm font-mono mb-7'>Empower remote teamwork.</p>
            <p className='text-base'>Email: <span className='font-semibold'>{emailId}</span></p>
            </div>
        {isVerified?<FinalRegister emailId={emailId} />: <OtpVerify check={setVerified} generatedOtp={generatedOtp} />} 
          
         </div>
    </div>
  )
}
