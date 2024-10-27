// ProjectContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProject = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const [projectid, setProjectId] = useState(() => {
        // Retrieve a default project ID from localStorage or initialize as empty
        return localStorage.getItem('defaultProjectId') || '';
    });
    const [project, setProject] = useState(null);

    // Retrieve project data whenever `projectid` changes
    useEffect(() => {
        if (projectid) {
            const savedProject = localStorage.getItem(projectid);
            setProject(savedProject ? JSON.parse(savedProject) : null);
        }
    }, [projectid]);

    // Update localStorage whenever the project changes
    useEffect(() => {
        if (project) {
            localStorage.setItem(project._id, JSON.stringify(project));
            localStorage.setItem('defaultProjectId', project._id); // Store project ID for default retrieval
        } else {
            localStorage.removeItem('defaultProjectId');
        }
    }, [project]);

    return (
        <ProjectContext.Provider value={{ project, setProject, setProjectId }}>
            {children}
        </ProjectContext.Provider>
    );
};
