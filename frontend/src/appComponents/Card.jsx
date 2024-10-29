import React from 'react'
import Banner from '../assets/banner.jpg'
import { useNavigate } from 'react-router-dom';
import { useProject } from './ProjectContext';

export default function Card(props) {
    const navigate1 = useNavigate();
    const project = props.project;
    const { setProject, setProjectId } = useProject();
    console.log("project details", project);

    function truncateString(str) {
        const maxLength = 100;
        if (str.length > maxLength) {
            return str.substring(0, maxLength) + '...'; // For three dots
            // return str.substring(0, maxLength) + '....'; // For four dots
        } else {
            return str;
        }
    }

    const goToProject = () => {
        setProjectId(project._id);
        setProject(project); // Store project in context
        navigate1('/dashboard/board');
    }

    const totalTasks = props.todoCount + props.sprogressCount + props.sdoneCount;
    const completedWidth = `${(props.doneCount / totalTasks) * 100}%`;
    const remainingWidth = `${((props.todoCount + props.progressCount) / totalTasks) * 100}%`;

    return (
        <div
            id={props.key}
            onClick={goToProject}
            className="flex flex-col border border-slate-300 p-8 m-4 w-[425px] rounded-md transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-slate-600 cursor-pointer"
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
                    <p className="mr-5 bg-gray-300 text-gray-800 border border-gray-900 rounded-lg px-2 font-extrabold font-mono text-sm">
                        Todo
                    </p>
                    <p>x{props.todoCount}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="mr-5 bg-purple-300 text-purple-800 border border-purple-900 rounded-lg px-2 font-extrabold font-mono text-sm">
                        In-Progress
                    </p>
                    <p>x{props.progressCount}</p>
                </div>
                <div className="flex justify-between items-center">
                    <p className="mr-5 bg-green-300 text-green-800 border border-green-900 rounded-lg px-2 font-extrabold font-mono text-sm">
                        Done
                    </p>
                    <p>x{props.doneCount}</p>
                </div>
            </div>
            <div className="flex pt-4">
                <div className="bg-blue-600 h-[10px] rounded-lg" style={{ width: completedWidth }}></div>
                <div className="bg-blue-100 h-[10px] rounded-r-lg" style={{ width: remainingWidth }}></div>
            </div>
            <div className="flex justify-end">
                <button className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:scale-105">
                    <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-5 w-5 mr-2"
                    >
                        <path
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        ></path>
                    </svg>
                    Delete
                </button>
            </div>

            {/* Card Menu */}
            <style>
                {`
                    .card {
                        background-color: rgba(0, 40, 50, 1);
                        background-image: linear-gradient(
                        139deg,
                        rgba(36, 40, 50, 1) 0%,
                        rgba(36, 40, 50, 1) 0%,
                        rgba(37, 28, 40, 1) 100%
                        );
                        width: 50%;
                        border-radius: 10px;
                        padding: 15px 0;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                    }

                    .card .separator {
                        border-top: 1.5px solid #42434a;
                    }

                    .card .list {
                        list-style-type: none;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        padding: 0 10px;
                    }

                    .card .list .element {
                        display: flex;
                        align-items: center;
                        color: #7e8590;
                        gap: 10px;
                        transition: all 0.3s ease-out;
                        padding: 4px 7px;
                        border-radius: 6px;
                        cursor: pointer;
                    }

                    .card .list .element svg {
                        width: 19px;
                        height: 19px;
                        transition: all 0.3s ease-out;
                    }

                    .card .list .element .label {
                        font-weight: 500;
                    }

                    .card .list .element:hover {
                        background-color: #5353ff;
                        color: #ffffff;
                        transform: translate(1px, -1px);
                    }

                    .card .list .delete:hover {
                        background-color: #8e2a2a;
                    }

                    .card .list .element:active {
                        transform: scale(0.99);
                    }

                    .card .list:not(:last-child) .element:hover svg {
                        stroke: #ffffff;
                    }

                    .card .list:last-child svg {
                        stroke: #bd89ff;
                    }

                    .card .list:last-child .element {
                        color: #bd89ff;
                    }

                    .card .list:last-child .element:hover {
                        background-color: rgba(56, 45, 71, 0.836);
                    }
                `}
            </style>
            <div className="card">
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

        </div>
    );

}
