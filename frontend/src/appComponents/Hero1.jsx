import React from 'react'
import banner from '../assets/banner.jpg'
// export default function Hero1() {
//   return (
//     <div className='px-64 px-30 flex justify-center'>
//         <h1 className='text-4xl font-medium'>Discover the features that make CoLab so easy to use</h1>

//     </div>
//   )
// }


"use client";

// import Image from "next/image";
import { Tabs } from "../components/ui/tabs";

export default function Hero1() {
  const tabs = [
    {
      title: "Projects",
      value: "projects",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 flex flex-col justify-center">
          <p className='text-4xl font-bold'>Projects Tab</p>
          <div className='flex items-center'>
            <div className='text-md p-4 mt-4 w-2/5 font-bold'>
              <li className='my-4'>Scrum boards: Scrum boards help agile teams break large, complex projects into manageable pieces of work so focused teams ship faster.</li>
              <li className='my-4'>Kanban boards: Agile and DevOps teams can use flexible kanban boards to visualize workflows, limit work-in-progress, and maximize efficiency as a team. Templates make it easy to get started quickly and customize as you go.</li>
              <li className='my-4'>Choose your own adventure: Jira Software is flexible enough to mold to your team’s own unique way of working, whether it is Scrum, Kanban, or something in between.</li>
            </div>
           <div className='w-4/5'>
           <DummyContent />
           </div>
          </div>
        </div>
      ),
    },
    {
      title: "Dashboard",
      value: "dashboard",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 flex flex-col justify-center">
          <p className='text-4xl font-bold'>Dashboard Tab</p>
          <div className='flex items-center'>
            <div className='text-md p-4 mt-4 w-2/5 font-bold'>
              <li className='my-4'>Scrum boards: Scrum boards help agile teams break large, complex projects into manageable pieces of work so focused teams ship faster.</li>
              <li className='my-4'>Kanban boards: Agile and DevOps teams can use flexible kanban boards to visualize workflows, limit work-in-progress, and maximize efficiency as a team. Templates make it easy to get started quickly and customize as you go.</li>
              <li className='my-4'>Choose your own adventure: Jira Software is flexible enough to mold to your team’s own unique way of working, whether it is Scrum, Kanban, or something in between.</li>
            </div>
           <div className='w-4/5'>
           <DummyContent />
           </div>
          </div>
        </div>
      ),
    },
    {
      title: "Meet",
      value: "meet",
      content: (
        <div
        className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 flex flex-col justify-center">
        <p className='text-4xl font-bold'>Meet Tab</p>
        <div className='flex items-center'>
          <div className='text-md p-4 mt-4 w-2/5 font-bold'>
            <li className='my-4'>Scrum boards: Scrum boards help agile teams break large, complex projects into manageable pieces of work so focused teams ship faster.</li>
            <li className='my-4'>Kanban boards: Agile and DevOps teams can use flexible kanban boards to visualize workflows, limit work-in-progress, and maximize efficiency as a team. Templates make it easy to get started quickly and customize as you go.</li>
            <li className='my-4'>Choose your own adventure: Jira Software is flexible enough to mold to your team’s own unique way of working, whether it is Scrum, Kanban, or something in between.</li>
          </div>
         <div className='w-4/5'>
         <DummyContent />
         </div>
        </div>
      </div>
      ),
    },
    {
      title: "Editor",
      value: "editor",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-white bg-gradient-to-br from-purple-700 to-violet-900 flex flex-col justify-center">
          <p className='text-4xl font-bold'>Editor Tab</p>
          <div className='flex items-center'>
            <div className='text-md p-4 mt-4 w-2/5 font-bold'>
              <li className='my-4'>Scrum boards: Scrum boards help agile teams break large, complex projects into manageable pieces of work so focused teams ship faster.</li>
              <li className='my-4'>Kanban boards: Agile and DevOps teams can use flexible kanban boards to visualize workflows, limit work-in-progress, and maximize efficiency as a team. Templates make it easy to get started quickly and customize as you go.</li>
              <li className='my-4'>Choose your own adventure: Jira Software is flexible enough to mold to your team’s own unique way of working, whether it is Scrum, Kanban, or something in between.</li>
            </div>
           <div className='w-4/5'>
           <DummyContent />
           </div>
          </div>
        </div>
      ),
    },
    
  ];

  return (
    (<div
      className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-20">
      <Tabs tabs={tabs} />


    </div>)
  );
}

const DummyContent = () => {
  return (
    (<img
      src={banner}
      alt="dummy image"
      width="600"
      height="500"
      className="object-cover object-left-top h-[60%] md:h-[90%]  right-0 rounded-xl mx-auto" />)
  );
};
