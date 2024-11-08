import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from './ProjectContext';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
const initialLists = {
   Todo: [],
   InProgress: [],
   Done: [],
};

const Board = () => {
   const navigate = useNavigate();
   const [lists, setLists] = useState(initialLists);
   const [draggedItem, setDraggedItem] = useState(null);
   const [draggedFromList, setDraggedFromList] = useState('');
   const [newTask, setNewTask] = useState('');
   const { project, setProject } = useProject();

   // Use useEffect to update the lists only when the project changes
   useEffect(() => {
      if (project && project.toDO && project.inProgress && project.completed) {
         setLists({
            Todo: project.toDO,
            InProgress: project.inProgress,
            Done: project.completed,
         });
      }
      console.log("Project:", project);
   }, [project]);

   const handleDragStart = (item, listKey) => {
      setDraggedItem(item);
      setDraggedFromList(listKey);
   };

   const updateListsOnDrop = (listKey) => {
      if (draggedItem === null) return;

      setLists((prevLists) => {
         const updatedLists = { ...prevLists };

         // Move dragged item from the source list to the target list
         updatedLists[draggedFromList] = updatedLists[draggedFromList].filter(
            (item) => item !== draggedItem
         );
         updatedLists[listKey] = [...updatedLists[listKey], draggedItem];

         // Update project data and localStorage
         updateProjectData(updatedLists);
         return updatedLists;
      });

      setDraggedItem(null);
      setDraggedFromList('');
   };

   const handleDrop = (e, listKey) => {
      e.preventDefault();
      updateListsOnDrop(listKey);
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
            return 'relative flex flex-col items-center p-4 pt-12 overflow-x-hidden bg-white border border-gray-300 rounded-lg w-1/4';
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

   const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   };

   const addNewTask = () => {
      if (!newTask.trim()) return;
      const taskObject = {
         taskid: uuidv4(), // Generate a unique ID for the task
         taskName: newTask.trim(), 
         taskDescription: "", 
         assignedTo: "", 
         reporter: localStorage.getItem('user-object') 
             ? JSON.parse(localStorage.getItem('user-object')).name 
             : "", 
         startDate: formatDate(Date.now()), // Format current date
         dueDate: "", // Keep it empty for now, can be updated later
     };

      setLists((prevLists) => {
         const updatedLists = {
            ...prevLists,
            Todo: [...prevLists.Todo, taskObject],
         };
         // Update project data and localStorage
         updateProjectData(updatedLists);
         return updatedLists;
      });

      setNewTask('');
   };

   const updateProjectData = async (updatedLists) => {
      const newProject = {
         ...project,
         toDO: updatedLists.Todo,
         inProgress: updatedLists.InProgress,
         completed: updatedLists.Done,
      };

      setProject(newProject);
      localStorage.setItem(project._id, JSON.stringify(newProject));

      // API call to update task status on the server
      try {
         await axios.post('http://localhost:3000/api/tasks/updateTaskStatus', {
            projectId: project._id,
            toDO: updatedLists.Todo,
            inProgress: updatedLists.InProgress,
            completed: updatedLists.Done,
         });
         console.log("Task status updated successfully");
      } catch (error) {
         console.error("Error updating task status:", error);
      }
   };

   return (
      <div className="flex flex-col min-h-screen p-4 space-x-4 justify-top">
         <div className='flex items-center'>
            <p
               className='py-2 px-1 font-semibold cursor-pointer hover:underline'
               onClick={() => navigate('/home')}
            >
               Projects
            </p>
            <p className='py-2 px-1'>/</p>
            <p className='py-2 px-1 font-semibold'>{project ? project.name : "Loading..."}</p>
         </div>
         <p>{JSON.stringify(project)}</p>
         <div className='flex justify-center'>
            <div className='w-1/2'>
               <input 
                  value={newTask} 
                  onChange={(e) => setNewTask(e.target.value)} 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded" 
                  placeholder="Add a new task" 
               />
               <button
                  onClick={(e) => {
                     e.preventDefault();
                     addNewTask();
                  }}
                  className="w-full p-2 mt-2 text-white bg-blue-500 rounded"
               >
                  Add Task
               </button>
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
                        {item.taskName} {/* Display taskName instead of the entire object */}
                     </div>
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
};

export default Board;
