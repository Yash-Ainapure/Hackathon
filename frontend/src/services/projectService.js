export const getProjectsForUser = async (userId) => {
    try {
        const userProjectsResponse = await fetch(`http://localhost:3000/api/projects/${userId}`);
        if (!userProjectsResponse.ok) {
            throw new Error('Failed to fetch project IDs');
        }
        const projectIds = await userProjectsResponse.json();

        if (projectIds.length === 0) {
            return []; 
        }

        const projectsPromises = projectIds.map(projectId =>
            fetch(`http://localhost:3000/api/projects/fetchProjects/${projectId}`).then(res => {
                if (!res.ok) {
                    throw new Error(`Project with ID ${projectId} not found`);
                }
                return res.json();
            })
        );

        const projects = await Promise.all(projectsPromises);

        return projects;
    } catch (error) {
        console.error("Error fetching projects for user:", error);
        throw error; 
    }
};
