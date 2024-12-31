import React, { useState } from 'react'
import Banner from '../assets/banner.jpg'
import { useNavigate } from 'react-router-dom';
import { useProject } from './ProjectContext';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
function CardMenu() {
    return (
        <div className="cardmenu ">
            <ul className="list">
                <li className="element">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#7e8590"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-pencil"
                    >
                        <path
                            d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                        ></path>
                        <path d="m15 5 4 4"></path>
                    </svg>
                    <p className="label">Rename</p>
                </li>
                <li className="element">
                    <svg
                        className="lucide lucide-user-round-plus"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M2 21a8 8 0 0 1 13.292-6"></path>
                        <circle r="5" cy="8" cx="10"></circle>
                        <path d="M19 16v6"></path>
                        <path d="M22 19h-6"></path>
                    </svg>
                    <p className="label">Add Member</p>
                </li>
            </ul>
            <div className="separator"></div>
            <ul className="list">
                <li className="element">
                    <svg
                        className="lucide lucide-settings"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
                        ></path>
                        <circle r="3" cy="12" cx="12"></circle>
                    </svg>
                    <p className="label">Settings</p>
                </li>
                <li className="element delete">
                    <svg
                        className="lucide lucide-trash-2"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line y2="17" y1="11" x2="10" x1="10"></line>
                        <line y2="17" y1="11" x2="14" x1="14"></line>
                    </svg>
                    <p className="label">Delete</p>
                </li>
            </ul>
            <div className="separator"></div>
            <ul className="list">
                <li className="element">
                    <svg
                        className="lucide lucide-users-round"
                        stroke-linejoin="round"
                        stroke-linecap="round"
                        stroke-width="2"
                        stroke="#7e8590"
                        fill="none"
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M18 21a8 8 0 0 0-16 0"></path>
                        <circle r="5" cy="8" cx="10"></circle>
                        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                    </svg>
                    <p className="label">Team Access</p>
                </li>
            </ul>
        </div>
    )
}

export default function Card(props) {
    const navigate1 = useNavigate();
    const project = props.project;
    const { setProject, setProjectId } = useProject();
    console.log("project details", project);
    const [menuVisible, setMenuVisible] = useState(false);
    function truncateString(str) {
        const maxLength = 100;
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...'; // For three dots
            // return str.substring(0, maxLength) + '....'; // For four dots
        } else {
            return str;
        }
    }
    const user = JSON.parse(localStorage.getItem('user-object'));
    const goToProject = async () => {
        await setProjectId(project._id);
        await setProject(project); // Wait until project is set in context
        navigate1('/dashboard/board'); // Now navigate
    };

    const todoCount = props.todoCount;
    const progressCount = props.progressCount;
    const doneCount = props.doneCount;

    const totalTasks = todoCount + progressCount + doneCount;
    const completedWidth = totalTasks > 0 ? `${(doneCount / totalTasks) * 100}%` : "0%";
    const percentage = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;
    const remainingWidth = totalTasks > 0 ? `${((todoCount + progressCount) / totalTasks) * 100}%` : "100%";
    const deleteProject = async (projectId) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/projects/delete-project`, {
                data: { projectId: projectId }, // Add project ID or any required data
            });
            console.log('Project deleted:', response.data);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm(`Are you sure you want to delete this project (${project.name})? This action cannot be undone.`);
        if (confirmed) {
            console.log("Delete project in progress", project._id, project.name);

            try {
                await deleteProject(project._id); // Wait for deletion to complete
                console.log("Project deleted successfully.");
                props.fetch(); // Fetch new data only if deletion was successful
            } catch (error) {
                console.error("Error deleting project:", error);
                // Optionally, you could inform the user about the error here
                alert("Failed to delete the project. Please try again.");
            }
        }
    };
    return (
        <div
            id={props.key}
            onClick={goToProject}
            className="flex flex-col border bg-white border-slate-300 p-8 m-4 w-[425px] rounded-md hover:border-slate-600 cursor-pointer relative group"
        >
            <div className="flex gap-3 items-center rounded-md">
                <img src={Banner} className="w-14 h-14 rounded-md" alt="Project Banner" />
                <div>
                    <p className="font-medium text-xl">{props.name}</p>
                    <p className="font-light text-sm">{props.ownerName}</p>
                </div>
            </div>
            <p className="text-left my-2 text-sm">{truncateString(props.summary)}</p>
            <p className="font-medium">Project Progress</p>
            <div className="flex my-2 justify-around">
                <div className="flex justify-between items-center">
                    <p className="mr-2 bg-gray-300 text-gray-800 border border-gray-900 rounded-lg px-2 font-extrabold font-mono text-sm">Todo</p>
                    <p>x{props.todoCount}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="mr-2 bg-purple-300 text-purple-800 border border-purple-900 rounded-lg px-2 font-extrabold font-mono text-sm">In-Progress</p>
                    <p>x{props.progressCount}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="mr-2 bg-green-300 text-green-800 border border-green-900 rounded-lg px-2 font-extrabold font-mono text-sm">Done</p>
                    <p>x{props.doneCount}</p>
                </div>
            </div>
            <div className="flex py-2">
                {totalTasks === 0 ? (
                    <div className='w-full'>
                        <span className="text-gray-500 text-xs ">No tasks available</span>
                        <div className="bg-gray-200 h-[10px] rounded-lg"></div>
                    </div>
                ) : (
                    <div className='w-full'>
                        <span className="text-gray-500 text-xs ">{percentage}% completed</span>
                        <div className='flex overflow-hidden rounded-lg'>
                            <div className="bg-blue-600 h-[10px] rounded-r-lg" style={{ width: completedWidth }}></div>
                            <div className="bg-blue-100 h-[10px]" style={{ width: remainingWidth }}></div>
                        </div>
                    </div>
                )}
            </div>

            {/* Three Dots Icon */}
            {user.name === props.ownerName && (
                <div className="absolute top-3 right-3 p-1 w-8 h-8 rounded-full border hover:border-red-800 text-[#545454] hover:text-white hover:bg-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ">
                    <button
                        className="focus:outline-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                    >
                        <MdDelete size={20} />
                    </button>
                </div>
            )}
        </div>
    );

}
