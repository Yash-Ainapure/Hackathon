import React from 'react'

function Login(props) {

    const change=()=>{
        props.type("Signup");
    }

  return (
    <div className='shadow-lg ml-4 border border-2 w-[500px] px-4 py-2 flex justify-center items-center flex-col h-[350px]'>
        <input type="text" className=' my-2 p-2 w-[400px] border rounded-[5px]' placeholder='Enter your email'/>
        <input type="password" className='my-2 p-2 w-[400px] border rounded-[5px]' placeholder='Enter your password'/>
        <button className="mb-3 p-[3px] relative mt-3 ">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                    <div className="px-8 py-2 bg-white rounded-full  relative group transition duration-200 text-black hover:bg-transparent hover:text-white ">
                        Login
                    </div>
                </button>
        <p className='' onClick={change}>Dont have account ? Register</p>
    </div>
  )
}

export default Login