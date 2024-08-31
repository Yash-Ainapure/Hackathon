import React from 'react'
import Banner from '../assets/banner.jpg'
import { useNavigate } from 'react-router-dom';


export default function Card(props) {

    const navigate1 = useNavigate();

   
    
    
    function truncateString(str) {
        const maxLength = 100;
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...'; // For three dots
            // return str.substring(0, maxLength) + '....'; // For four dots
        } else {
            return str;
        }
    }

    const goToProject=()=>{
        let obj = {
            name:props.name,
            owner:props.ownerName,
            summary:props.summary,
            toDOCount:props.todoCount,
            progressCount:props.progressCount,
            completedCount:props.doneCount,
        }
        console.log(obj);
        
        navigate1('/dashboard',{ state: {}}); 
    }

    const totalTasks = props.todoCount + props.progressCount + props.doneCount;
  const completedWidth = `${(props.doneCount / totalTasks) * 100}%`;
  const remainingWidth = `${((props.todoCount + props.progressCount) / totalTasks) * 100}%`;

    return ( 
        <div id={props.key} onClick={goToProject} className='flex flex-col border border-slate-300 p-8 m-4 w-[425px]  rounded-md transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-slate-600'>
        <div className='flex gap-3 items-center rounded-md'>
            <img src={Banner} className='w-14 h-14 rounded-md'></img>
            <div>
                <p className='font-medium text-xl'>{props.name}</p>
                <p className='font-light text-sm'>{props.ownerName}</p>
            </div>
        </div>

        <p className='text-left my-2 text-sm '>{truncateString(props.summary)}</p>
        
        <p className='font-medium'>Project Progress</p>
        <div className='flex  my-2 justify-around'>
            <div className='flex justify-between items-center'><p className='mr-5 bg-gray-300 text-gray-800 border border-gray-900 rounded-lg px-2 font-extrabold font-mono text-sm'>Todo</p> <p>x{props.todoCount}</p></div>
            <div className='flex justify-between items-center'><p className='mr-5  bg-purple-300 text-purple-800 border border-purple-900  rounded-lg px-2 font-extrabold font-mono text-sm'>In-Progress</p><p>x{props.progressCount}</p></div>
            <div className='flex justify-between items-center'><p className='mr-5  bg-green-300 text-green-800  border border-green-900 rounded-lg px-2 font-extrabold font-mono text-sm'>Done</p><p>x{props.doneCount}</p></div>
        </div>
        <div className='flex pt-4'>
        <div className='bg-blue-600 h-[10px] rounded-lg' style={{ width: completedWidth }}></div>
        <div className='bg-blue-100 h-[10px] rounded-r-lg' style={{ width: remainingWidth }}></div>
        </div>
    </div>
  )
}
