import { useState, useEffect }from 'react';
import { useLocation } from 'react-router-dom';
import { useProject } from './ProjectContext';
var initialLists = {
   Todo: ['Create backend API', 'frontend integration', 'Bugs solving'],
   InProgress: ['Payment Gateway Integration', 'Styling'],
   Done: ['Web Designing'],
};

const Board = () => {
   const [lists, setLists] = useState(initialLists);
   const [draggedItem, setDraggedItem] = useState(null);
   const [draggedFromList, setDraggedFromList] = useState('');
   const [newTask, setNewTask] = useState('');
   const { project } = useProject();

   // Use useEffect to update the lists only when the project changes
   useEffect(() => {
      if (project && project.toDO && project.inProgress && project.completed) {
         setLists({
            Todo: project.toDO,
            InProgress: project.inProgress,
            Done: project.completed,
         });
         let newProject = project;
         newProject.toDO = lists.Todo;
         newProject.inProgress = lists.InProgress;
         newProject.completed = lists.Done;
         localStorage.setItem(project._id, JSON.stringify(newProject));
      }
   }, [project]); // Dependency array ensures it runs only when `project` changes

   console.log(project);
   console.log("Todo:", project?.toDO, "InProgress:", project?.inProgress, "Done:", project?.completed);

   const handleDragStart = (item, listKey) => {
      setDraggedItem(item);
      setDraggedFromList(listKey);
   };

   const handleDrop = (e, listKey) => {
      e.preventDefault();
      if (draggedItem !== null) {
         const newLists = { ...lists };
         newLists[draggedFromList] = newLists[draggedFromList].filter(
            (item) => item !== draggedItem
         );
         newLists[listKey] = [...newLists[listKey], draggedItem];
         setLists(newLists);
         console.log(newLists);
         setDraggedItem(null);
         setDraggedFromList('');
      }
   };

   const handleDragOver = (e) => {
      e.preventDefault();
   };

   const getListClasses = (key) => {
      switch (key) {
         case 'Todo':
            return 'relative flex flex-col items-center p-4 pt-12 overflow-x-hidden bg-white border border-gray-300 rounded-lg w-1/4 min-h-60 text-cyan-600 font-semibold text-sm';
         case 'InProgress':
            return 'relative flex flex-col items-center p-4 pt-12 overflow-x-hidden bg-white border border-gray-300 rounded-lg w-1/4 text-purple-600 font-semibold text-sm';
         case 'Done':
            return 'relative flex flex-col items-center p-4 pt-12 overflow-x-hidden bg-white border border-gray-300 rounded-lg w-1/4 text-green-600 font-semibold text-sm';
         default:
            return 'relative flex flex-col items-center p-4 pt-12 overflow-x-hidden bg-white border border-gray-300 rounded-lg w-1/4 ';
      }
   };

   const getItemClasses = (key) => {
      switch (key) {
         case 'Todo':
            return 'p-2 m-1 bg-cyan-100 border border-cyan-300 cursor-move w-[100%] rounded';
         case 'InProgress':
            return 'p-2 m-1 bg-purple-100 border border-purple-300 cursor-move w-[100%] rounded';
         case 'Done':
            return 'p-2 m-1 bg-green-100 border border-green-300 cursor-move w-[100%] rounded';
         default:
            return 'p-2 m-1 bg-neutral-100 border border-gray-300 cursor-move w-[100%] rounded';
      }
   };

   // const location = useLocation();
   // const project = location.state?.project;
 
   return (
      <div className="flex flex-col min-h-screen p-4 space-x-4 justify-top">
         <div>
            <div className='p-2 font-semibold'>Projects/HackEra</div>
            <p>{JSON.stringify(project)}</p>
         </div>
         <div className='flex justify-center'>
            <div className='w-1/2'>
               <input value={newTask} onChange={(e)=>setNewTask(e.target.value)} type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Add a new task" />
               <button onClick={(e)=>{
                  e.preventDefault();
                  setLists({...lists, Todo: [...lists.Todo, newTask]});
                  setNewTask('');
               }} className="w-full p-2 mt-2 text-white bg-blue-500 rounded">Add Task</button>
            </div>
         </div>
         <div className='flex justify-center gap-5 mt-10'>
            {Object.keys(lists).map((key) => (
               <div
                  key={key}
                  id={key}
                  className={getListClasses(key)}
                  onDrop={(e) => handleDrop(e, key)}
                  onDragOver={handleDragOver}
               >
                  <h2 className="absolute mb-2 text-lg font-semibold top-2 left-4">{key}</h2>
                  {lists[key].map((item, index) => (
                     <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(item, key)}
                        className={getItemClasses(key)}
                     >
                        {item}
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Board;
