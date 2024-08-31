import React from 'react'
// import Banner from '../assets/banner.jpg';
import SearchIcon from '@mui/icons-material/Search';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
function Navbar() {
  return (
    <div className="flex items-center justify-between w-full p-2 px-24 border-b">
      
          <div className="flex gap-4 items-center">
            <h1 className='text-xl font-semibold'>CoLab</h1>
          <select name="" id="" className="font-semibold bg-transparent text-sky-800">
              <option value="">Your Work</option>
              <option value="">Assigned</option>
              <option value="">Recent</option>
            </select>
            <select name="" id="" className="font-semibold bg-transparent text-sky-800">
              <option value="">Projects</option>
              <option value="">Project 1</option>
              <option value="">Project 2</option>
            </select>
            <button className="px-4 py-2 font-semibold text-white rounded bg-sky-600">Create</button>
          </div>
          <div className="flex gap-4">
            <div className="flex p-[1px] pl-2 bg-white border rounded-md shadow items-center">
              <SearchIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
              <input className="pl-2" placeholder="Search" type="text" ></input>
            </div>
            <div className="pr-2">
              <img className="w-12 h-12 rounded-full" src="https://assets.aceternity.com/manu.png" />
            </div>
            <CircleNotificationsIcon style={{ fontSize: '45px' }} />
          </div>
        </div>
  )
}

export default Navbar