// ProjectContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState(() => {
        // Get the project from localStorage if it exists
        const savedProject = localStorage.getItem('project');
        return savedProject ? JSON.parse(savedProject) : null;
    });

    // Update localStorage whenever the project changes
    useEffect(() => {
        if (project) {
            localStorage.setItem('project', JSON.stringify(project));
        } else {
            localStorage.removeItem('project'); // Remove if project is null
        }
    }, [project]);

    return (
        <ProjectContext.Provider value={{ project, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
