import React from 'react'
// import Login from './Login';
import { useState } from 'react'
function SignUp(props) {

    const [emailValue, setEmailValue] = useState('');
    const [message, setMessage] = useState('');
    

    const sendOTP = async () => {
        try {
            const response = await axios.post('http://localhost:3000/sendMail', { emailValue });
            setMessage(response.data.message);
            console.log(message);
            
        } catch (error) {
            setMessage('Failed to send OTP. Please try again.');
        }
    };




    

    const change = () => {
        console.log("s");
        props.type("Login");

    }

    const sendEmail = () => {
        axios({
            method: 'post',
            url: '/u',
            data: {
                firstName: 'Fred',
                lastName: 'Flintstone'
            }
        });
    }

    return (
        <div className='ml-4 shadow-lg border border-2 w-[500px] px-4 py-2 flex justify-center items-center flex-col h-[350px] rounded-lg'>
            <div className='border-b  py-4 border-gray-400 flex items-center flex-col'>
                <div className='flex justify-center flex-col items-end'>
                    <div className='flex items-center'>
                        {/* <label htmlFor="">Email</label>  */}
                        <input type="email" value={emailValue} onChange={(event) => { setEmailValue(event.target.value) }} className='border-2 mx-2 p-2 w-[400px] border rounded-[5px]' placeholder='Enter your email' />
                    </div>
                    <p className='mr-4' onClick={change}>Already have account ?</p>
                </div>
                {/* <button className='p-3 px-5 mt-2 border w-[100px] rounded-[30px] bg-[#6a27bb] text-white'>Sign Up</button> */}
                <button className="mb-3 p-[3px] relative mt-3 " onClick={sendEmail} >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    <div className="px-8 py-2 bg-white rounded-full  relative group transition duration-200 text-black hover:bg-transparent hover:text-white ">
                        Sign Up
                    </div>
                </button>
            </div>
            <div className='mt-4'>
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
            </div>
        </div>
    )
}

export default SignUp