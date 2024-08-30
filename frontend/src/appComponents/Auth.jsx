import React, { useEffect } from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Banner from '../assets/banner.jpg'
import { useState } from 'react'

function Auth() {

    const [authType,setAuthType] = useState("Signup");

    useEffect(()=>{
        console.log("changed");
        
    },[authType])


  return (
    <div className='max-w-full flex items-center justify-center h-screen' >
        <div className='flex items-center gap-4'>
          {
            (authType==="Login")?<Login type={setAuthType}/>:<SignUp type={setAuthType}/>

          }     
        
        <img src={Banner} className='w-[800px]' alt="" />
        </div>
    </div>
  )
}

export default Auth