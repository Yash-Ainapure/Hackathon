import React,{useState}from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BACKEND_URL = import.meta.env.VITE_API_URL;
export default function FinalRegister(props) {
  const navigate = useNavigate();
    
    const [password,setpassword] = useState("");
    const [fullname,setFullName] = useState("");
    const registerUser = ()=>{
      // console.log("inside register user");
        
      axios.post(`${BACKEND_URL}/api/auth/register`, {
          email: props.emailId,
          name:fullname,
          password:password
      })
      .then(response => {
          // console.log('User registered successfully:', response.data);
          navigate('/');
      })
      .catch(error => {
          console.error('Error registering message email:',error);
      });
    }

  return (
    <>
        <h2 className='font-bold'>Setup Your Account</h2>
            <p>Fill up Your Details</p>
            <input type="text" className='border-2 mx-2  my-3 p-2 w-full border rounded-[5px]' onChange={(event)=>{setFullName(event.target.value)}} value={fullname} placeholder='Enter name'/>
            <input type="password" className='border-2 mx-2  my-3 p-2 w-full border rounded-[5px]' onChange={(event)=>{setpassword(event.target.value)}} value={password} placeholder='Enter password'/>
            <button className="p-[3px] relative mt-3 mx-2 mb-3 " onClick={registerUser} >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-slate-700 rounded-full" />
                    <div className="px-8 py-2  bg-gray-900 rounded-full  relative group transition duration-200 text-white hover:bg-white hover:text-black ">
                        Continue
                    </div>
                </button>
            <p>  <span className='text-gray-800 hover:font-medium'>Back To Home</span></p>
    </>
  )
}
