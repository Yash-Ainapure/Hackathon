import React from 'react'
// import Login from './Login';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp(props) {

    const [emailValue, setEmailValue] = useState('');
    const [message, setMessage] = useState('');
    
    const navigate = useNavigate();
    // const sendOTP = async () => {
    //     try {
    //         console.log("inside");
            
    //         const response = await axios.post('http://localhost:3000/', { emailValue });
    //         setMessage(response.data.message);
    //         console.log(message);
            
    //     } catch (error) {
    //         setMessage('Failed to send OTP. Please try again.');
    //     }
    // };




    

    const change = () => {
        console.log("s");
        props.type("Login");

    }

    const sendEmail = () => {
        console.log("inside send mail");
        
        axios.post('http://localhost:3000/api/sendMail', {
            email: emailValue,
            purpose: 'register',
            data: {}
        })
        .then(response => {
            console.log('Email sent successfully:', response.data);
            console.log(props.type)
            navigate('/register', { state: { emailId:emailValue,generatedOtp: response.data.otp.otp }});
        })
        .catch(error => {
            console.error('Error sending email:',error);
        });
    }

    return (
        <div className='ml-4 shadow-lg border-2 w-[500px] px-4 py-2 flex justify-center items-center flex-col h-[350px] rounded-lg'>
            <div className='border-b  py-4 border-gray-400 flex items-center flex-col'>
                <div className='flex justify-center flex-col items-end'>
                    <div className='flex items-center'>
                        {/* <label htmlFor="">Email</label>  */}
                        <input type="email" value={emailValue} onChange={(event) => { setEmailValue(event.target.value) }} className='border-2 mx-2 p-2 w-[400px] rounded-[5px]' placeholder='Enter your email' />
                    </div>
                    {/* <p className='mr-4' onClick={change}><span className=' hover:text-purple-600 cursor-pointer'>Already have account ?</span></p> */}
                </div>
                {/* <button className='p-3 px-5 mt-2 border w-[100px] rounded-[30px] bg-[#6a27bb] text-white'>Sign Up</button> */}
                <button className="mb-3 p-[3px] relative mt-3 " onClick={sendEmail} >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    <div className="px-8 py-2 bg-white rounded-full  relative group transition duration-200 text-black hover:bg-transparent hover:text-white ">
                        Sign Up
                    </div>
                </button>
            </div>
            <p className='mt-4' onClick={change}>Already have account ? <span className='font-bold cursor-pointer hover:text-purple-600'>Login Here</span></p>

            {/* <div className='mt-4'>
                <button className="p-[3px] relative mt-3 mx-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-slate-700 rounded-full" />
                    <div className="px-8 py-2 bg-gray-900 rounded-full  relative group transition duration-200 text-white hover:bg-white hover:text-black ">
                        Google
                    </div>
                </button>
                <button className="p-[3px] relative mt-3 mx-2">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-slate-700 rounded-full" />
                    <div className="px-8 py-2 bg-gray-900 rounded-full  relative group transition duration-200 text-white hover:bg-white hover:text-black ">
                        Github
                    </div>
                </button>
            </div> */}
        </div>
    )
}

export default SignUp