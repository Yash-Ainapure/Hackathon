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
    <div className='max-w-full flex flex-col  justify-center ' >
      <div className='border py-4 px-4 pl-20'>
        <img src="" alt="" />
        <h1 className='text-3xl font-bold '>CO <span className='text-purple-900 font-extrabold '>Lab</span></h1>
      </div>
      <div className='flex items-center gap-4 justify-around ' id='get-started'>
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