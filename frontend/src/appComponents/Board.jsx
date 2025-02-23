import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject } from './ProjectContext';
import axios from 'axios';
import addTaskIcon from '../assets/addTask.svg';
import { v4 as uuidv4 } from 'uuid';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';


const BACKEND_URL = import.meta.env.VITE_API_URL;
const initialLists = {
   Todo: [],
   InProgress: [],
   Done: [],
};

const ItemTypes = {
   TASK: 'task',
};

const Board = () => {
   const navigate = useNavigate();
   const [lists, setLists] = useState(initialLists);
   const [newTask, setNewTask] = useState('');
   const { project, setProject } = useProject();

   useEffect(() => {
      if (project && project.toDO && project.inProgress && project.completed) {
         setLists({
            Todo: project.toDO,
            InProgress: project.inProgress,
            Done: project.completed,
         });
      }
   }, [project]);

   const updateListsOnDrop = (item, listKey) => {
      setLists((prevLists) => {
         const updatedLists = { ...prevLists };

         updatedLists[item.fromList] = updatedLists[item.fromList].filter(
            (task) => task.taskid !== item.task.taskid
         );
         updatedLists[listKey] = [...updatedLists[listKey], item.task];

         updateProjectData(updatedLists);
         return updatedLists;
      });
   };

   const getListClasses = (key) => {
      const baseClasses =
         "relative flex flex-col md:items-start items-center p-4 pt-12 overflow-x-hidden overflow-y-scroll scrollbar-hide bg-white border border-gray-300 rounded-lg w-[90%] font-semibold text-sm";

      switch (key) {
         case "Todo":
            return `${baseClasses} text-cyan-600`;
         case "InProgress":
            return `${baseClasses} text-purple-600`;
         case "Done":
            return `${baseClasses} text-green-600`;
         default:
            return baseClasses;
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
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
   };

   const addNewTask = () => {
      if (!newTask.trim()) return;
      const taskObject = {
         taskid: uuidv4(),
         taskName: newTask.trim(),
         taskDescription: "",
         assignedTo: "",
         reporter: localStorage.getItem('user-object')
            ? JSON.parse(localStorage.getItem('user-object')).name
            : "",
         startDate: formatDate(Date.now()),
         dueDate: "",
      };

      setLists((prevLists) => {
         const updatedLists = {
            ...prevLists,
            Todo: [...prevLists.Todo, taskObject],
         };
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

      const updateStateAndStorage = () => {
         setProject(newProject);
         localStorage.setItem(project._id, JSON.stringify(newProject));
      };

      try {
         await axios.post(`${BACKEND_URL}/api/tasks/updateTaskStatus`, {
            projectId: project._id,
            toDO: updatedLists.Todo,
            inProgress: updatedLists.InProgress,
            completed: updatedLists.Done,
         });
         console.log("Task status updated successfully");
         updateStateAndStorage();
      } catch (error) {
         console.error("Error updating task status:", error);
      }
   };

   const Task = ({ task, listKey }) => {
      const [{ isDragging }, drag] = useDrag(() => ({
         type: ItemTypes.TASK,
         item: { task, fromList: listKey },
         collect: (monitor) => ({
            isDragging: monitor.isDragging(),
         }),
      }));

      return (
         <div
            ref={drag}
            className={`${getItemClasses(listKey)} ${isDragging ? 'opacity-50' : ''}`}
         >
            {task.taskName}
         </div>
      );
   };

   const List = ({ listKey, children }) => {
      const [, drop] = useDrop(() => ({
         accept: ItemTypes.TASK,
         drop: (item) => updateListsOnDrop(item, listKey),
      }));

      return (
         <div ref={drop} className={getListClasses(listKey)}>
            <h2 className="absolute mb-2 text-lg font-semibold top-2 left-4 flex justify-between w-[90%]">
               <span>{listKey}</span> <span>x {children.length}</span>
            </h2>
            {children.length === 0 ? (
               <div className="text-gray-400">
                  {listKey === "Todo" && "No tasks in Todo"}
                  {listKey === "InProgress" && "No tasks in Progress"}
                  {listKey === "Done" && "No tasks in Done"}
               </div>
            ) : (
               children
            )}
         </div>
      );
   };

   return (
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
         <div className="flex flex-col min-h-screen p-4 justify-top">
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
            <div className='flex justify-center mt-10'>
               <div className='flex md:w-[40vw]'>
                  <input
                     value={newTask}
                     onChange={(e) => setNewTask(e.target.value)}
                     type="text"
                     className="md:w-full w-full p-2 mx-1 border border-gray-300 rounded"
                     placeholder="What needs to be done?"
                  />
                  <button
                     onClick={(e) => {
                        e.preventDefault();
                        addNewTask();
                     }}
                     className="w-11 flex justify-center items-center p-2 mx-1 text-white hover:bg-blue-600 bg-blue-500 rounded"
                  >
                     <img src={addTaskIcon} alt="addTaskIcon" className='h-5 w-5' />
                  </button>
               </div>
            </div>

            <div className='flex justify-start md:items-start items-center flex-col md:flex-row gap-5 mt-8 md:mt-10 h-[75vh] md:overflow-x-auto'>
               {Object.keys(lists).map((key) => (
                  <List key={key} listKey={key}>
                     {lists[key].map((item, index) => (
                        <Task key={index} task={item} listKey={key} />
                     ))}
                  </List>
               ))}
            </div>
         </div>
      </DndProvider>
   );
};

export default Board;