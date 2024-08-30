import React from 'react'

function Login(props) {

    const change=()=>{
        props.type("Signup");
    }

  return (
    <div className=' w-[500px] p-5 flex justify-center items-center flex-col h-[532px]'>
        <input type="text" className=' my-2 p-2 w-[350px] border rounded-[5px]' placeholder='Enter your email'/>
        <input type="password" className='my-2 p-2 w-[350px] border rounded-[5px]' placeholder='Enter your password'/>
        <button className='p-3 px-2 border w-[100px] rounded-[50px] bg-green-500 font-bold text-white'>Login</button>
        <p className='' onClick={change}>Dont have account ? Register</p>
    </div>
  )
}

export default Login