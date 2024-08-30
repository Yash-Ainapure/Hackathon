import React from 'react'
// import Login from './Login';
function SignUp(props) {

   

    const change=()=>{
        console.log("s");
        props.type("Login");       
        
    }

  return (
    <div className=' w-[500px] p-5 flex justify-center items-center flex-col h-[532px]'>
        <div className='flex justify-center flex-col items-end'>
            <div className='flex items-center'>
                {/* <label htmlFor="">Email</label>  */}
                <input type="email" className='mx-2 p-2 w-[350px] border rounded-[5px]' placeholder='Enter your email'/>
            </div>
            <p className='mr-4' onClick={change}>Already have account ?</p>
        </div>        
        <button className='p-3 px-5 mt-2 border w-[100px] rounded-[30px] bg-[#6a27bb] text-white'>Sign Up</button>
        <hr className=''/>
        <div>
            <button className='m-2 p-3 px-5 text-white border bg-green-700 rounded-[50px]'>Google</button>
            <button className='m-2 p-3 px-5 text-white border bg-green-700 rounded-[50px]' >Github</button>
        </div>
    </div>
  )
}

export default SignUp