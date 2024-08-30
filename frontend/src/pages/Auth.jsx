import React, { useEffect } from 'react'
import Login from '../appComponents/Login'
import SignUp from '../appComponents/SignUp'
import Banner from '../assets/banner.jpg'
import { useState } from 'react'
import Hero1 from '../appComponents/Hero1'
import Navbar from '../appComponents/Navbar'
import HeroTitle from '../appComponents/HeroTitle'

function Auth() {

    const [authType,setAuthType] = useState("Signup");

    useEffect(()=>{
        console.log("changed");
        
    },[authType])


  return (
    <div className='max-w-full flex flex-col  justify-center ' >
      <Navbar/>
        <div className='flex items-center gap-4'>
          {
            (authType==="Login")?<Login type={setAuthType}/>:<SignUp type={setAuthType}/>

          }     
        
        <img src={Banner} className='w-[800px]' alt="" />
        </div>
        <HeroTitle/>
        <Hero1/>
    </div>
  )
}

export default Auth