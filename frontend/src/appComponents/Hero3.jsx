import React from 'react'
import TypingAnimation from "../components/magicui/typing-animation";


export default function Hero3() {
  return (
    <div className='flex flex-col justify-center items-center p-24 mt-[150px]  bg-gradient-to-br from-purple-800 to-blue-900'>
       <TypingAnimation
      className="text-4xl font-bold text-white dark:text-white"
      text="Move Faster Build Better"
    />
      <a className='px-5 py-3 mt-10 font-bold text-gray-900 rounded-md bg-amber-400' href='#get-started'>Get it free</a>
    </div>
  )
}
