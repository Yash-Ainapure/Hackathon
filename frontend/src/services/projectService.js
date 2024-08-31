export const getProjectsForUser = async (userId) => {
    try {
      const userProjectsResponse = await fetch(`http://localhost:3000/api/projects/${userId}`);
      if (!userProjectsResponse.ok) {
        throw new Error("Failed to fetch project IDs");
      }
  
      const projectIds = await userProjectsResponse.json();
  
      if (!Array.isArray(projectIds) || projectIds.length === 0) {
        console.warn("No projects found for user:", userId);
        return [];
      }
  
      const projects = [];
  
      for (const projectId of projectIds) {
        try {
          const res = await fetch(`http://localhost:3000/api/projects/fetchProjects/${projectId}`);
  
          // Check content type
          const contentType = res.headers.get("content-type");
          if (contentType && contentType.indexOf("application/json") === -1) {
            console.error(`Expected JSON but got ${contentType}`);
            console.error(await res.text());
            continue;  // Skip if not JSON
          }
  
          if (!res.ok) {
            console.error(`Project with ID ${projectId} not found, status: ${res.status}`);
            continue;  // Skip this iteration if project not found
          }
  
          try {
            const project = await res.json();
            projects.push(project);  // Append the fetched project to the projects array
          } catch (jsonError) {
            console.error(`Error parsing JSON for project ${projectId}:`, jsonError);
            continue;  // Skip this iteration if JSON parsing fails
          }
        } catch (err) {
          console.error(`Error fetching project ${projectId}:`, err);
          continue;  // Skip this iteration if fetch fails
        }
      }
  
      console.log("Fetched projects:", projects);
  
      return projects;
    } catch (error) {
      console.error("Error fetching projects for user:", error);
      throw error;
    }
  };
  