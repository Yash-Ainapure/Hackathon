// ProjectContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { json } from 'react-router-dom';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projectid,setProjectId] = useState('');
    const [project, setProject] = useState(() => {
        // Get the project from localStorage if it exists
        const savedProject = localStorage.getItem(projectid);
        console.log("asasdasffdvcv",projectid);
        return savedProject ? JSON.parse(savedProject) : null;
    });
    


    // Update localStorage whenever the project changes
    useEffect(() => {
        if (project) {
            localStorage.setItem(project._id,JSON.stringify(project))
            // localStorage.setItem('project', JSON.stringify(project));
        } else {
            localStorage.removeItem('project'); // Remove if project is null
        }
    }, [project]);

    return (
        <ProjectContext.Provider value={{ project, setProject , setProjectId}}>
            {children}
        </ProjectContext.Provider>
    );
};
