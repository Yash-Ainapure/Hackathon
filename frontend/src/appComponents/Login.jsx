import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserObj } from '../state/action';
import { useSelector } from "react-redux";
const BACKEND_URL = import.meta.env.VITE_API_URL;
function Login(props) {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const change = () => {
    props.type("Signup");
  }
  const login = () => {
    axios.post(`${BACKEND_URL}/api/auth/login`, {
      email: email,
      password: password,
    })
      .then(response => {
        // console.log('Loged In', response.data);
        localStorage.setItem('auth-token', response.data.token);
        // console.log('Added token into storage after login', localStorage.getItem('auth-token'));

        // console.log(response.data.user);
        dispatch(setUserObj(response.data.user));
        // console.log("User :",response.data.user._id);
        const userid = response.data.user._id;
        localStorage.setItem('userid', userid)
        localStorage.setItem('user-object', JSON.stringify(response.data.user));
        alert('User has been logged in successfully!!')
        navigate('/Home', { state: {} });
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  return (
    <div className='shadow-lg ml-4 border-2 w-[500px] px-4 py-2 flex justify-center items-center flex-col h-[350px]'>
      <input type="text" className=' my-2 p-2 w-[400px] border rounded-[5px]' value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder='Enter your email' />
      <input type="password" className='my-2 p-2 w-[400px] border rounded-[5px]' value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder='Enter your password' />
      <button className="mb-3 p-[3px] relative mt-3  ">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div onClick={login} className="relative px-8 py-2 text-black transition duration-200 bg-white rounded-full hover:scale-125 group hover:bg-transparent hover:text-white hover:font-bold">
          Login
        </div>
      </button>
      <p className='' onClick={change}>Dont have account ? <span className='font-bold cursor-pointer hover:text-purple-600'>Register</span></p>
    </div>
  )
}

export default Login