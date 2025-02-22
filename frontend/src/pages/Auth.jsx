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
import HyperText from "../components/magicui/hyper-text";

function Auth() {

  const [authType, setAuthType] = useState("Login");

  useEffect(() => {
    // console.log("changed");

  }, [authType])


  return (
    <div className='flex flex-col justify-center max-w-screen ' >
      <div className='px-4 py-1 pt-2 border flex justify-center items-center flex-col'>
        <img src="" alt="" />
        {/* <h1 className='text-3xl font-bold '>CoLab</h1> */}
        <HyperText
          className="text-4xl font-bold text-black dark:text-white"
          text="Colab"
        />

      </div>
      <div className='flex w-full flex-col md:flex-row items-center justify-center md:justify-around gap-4 ' id='get-started'>
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