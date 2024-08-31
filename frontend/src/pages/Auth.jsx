import React, { useEffect } from 'react'
import Login from '../appComponents/Login'
import SignUp from '../appComponents/SignUp'


import Banner from '../assets/banner.jpg'


import { useState } from 'react'
import Hero1 from '../appComponents/Hero1'
import Hero3 from '../appComponents/Hero3'
import Navbar from '../appComponents/Navbar'
import Hero2 from '../appComponents/Hero2'
import HeroTitle from '../appComponents/HeroTitle'
import Footer from '../appComponents/Footer'

function Auth() {

  const [authType, setAuthType] = useState("Login");

  useEffect(() => {
    console.log("changed");

  }, [authType])


  return (
    <div className='flex flex-col justify-center max-w-full ' >
      <div className='px-4 py-4 pl-20 border'>
        <img src="" alt="" />
        <h1 className='text-3xl font-bold '>CoLab</h1>
      </div>
      <div className='flex items-center justify-around gap-4 ' id='get-started'>
        {
          (authType === "Login") ? <Login type={setAuthType} /> : <SignUp type={setAuthType} />

        }

        <img src={Banner} className='w-[800px]' alt="" />
      </div>
      <HeroTitle />
      <Hero1 />
      <Hero3 />
      <Hero2 />
      <Footer />
    </div>
  )
}

export default Auth