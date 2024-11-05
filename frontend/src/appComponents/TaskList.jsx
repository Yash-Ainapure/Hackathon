import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useProject } from './ProjectContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskList = () => {
  const { project, setProject } = useProject();
  const navigate = useNavigate();
  const [projectTasks, setProjectTasks] = useState([]);

  useEffect(() => {
    if (project) {
      // Combine tasks into a single array when the project changes
      const allTasks = [
        ...project.toDO,
        ...project.inProgress,
        ...project.completed,
      ];
      setProjectTasks(allTasks);
    }
  }, [project]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'taskName', headerName: 'Task Name', width: 200, editable: true },
    { field: 'status', headerName: 'Status', width: 150, editable: true },
    { field: 'assignedTo', headerName: 'Assignee', width: 150, editable: true },
    { field: 'reporter', headerName: 'Reporter', width: 150, editable: true },
    { field: 'taskDescription', headerName: 'Summary', width: 250, editable: true },
    {
      field: 'endDate',
      headerName: 'Due Date',
      width: 150,
      editable: true,
      type: 'date',
      valueGetter: (params) => (params.value instanceof Date ? params.value : new Date(params.value)),
      valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '',
    },
  ];

  // Create rows for DataGrid from project tasks
  const rows = projectTasks.map((task, index) => ({
    id: index + 1, // Use index for unique ID
    taskName: task.taskName,
    status:
      project.toDO.includes(task) ? 'To Do' :
      project.inProgress.includes(task) ? 'In Progress' :
      project.completed.includes(task) ? 'Completed' :
      'Unknown', // Fallback status
    assignedTo: task.assignedTo || '',
    reporter: task.reporter,
    taskDescription: task.taskDescription,
    endDate: task.endDate || '',
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  // Update project tasks on row update
  const processRowUpdate = async (updatedRow) => {
    const updatedTasks = projectTasks.map((task, index) => {
      // Use index from the DataGrid (1-based) to find the correct task
      if (index === updatedRow.id - 1) {
        return {
          ...task,
          taskName: updatedRow.taskName,
          assignedTo: updatedRow.assignedTo,
          taskDescription: updatedRow.taskDescription,
          endDate: updatedRow.endDate,
        };
      }
      return task;
    });

    setProjectTasks(updatedTasks);

    // Update the project context
    const updatedProject = {
      ...project,
      toDO: updatedTasks.filter(task => task.status === 'To Do'),
      inProgress: updatedTasks.filter(task => task.status === 'In Progress'),
      completed: updatedTasks.filter(task => task.status === 'Completed'),
    };
    
    setProject(updatedProject);

    // Update the server with the new project data
    try {
      await axios.post('http://localhost:3000/api/tasks/updateTaskStatus', {
        projectId: project._id,
        toDO: updatedProject.toDO,
        inProgress: updatedProject.inProgress,
        completed: updatedProject.completed,
      });
      console.log("Task status updated successfully");
    } catch (error) {
      console.error("Error updating task status:", error);
    }

    return updatedRow; // Return the updated row to ensure DataGrid reflects the changes
  };

  return (
    <div className='flex flex-col min-h-screen px-20 justify-top'>
      <div>
        <div className='py-5 flex items-center'>
          <p
            className='py-2 px-1 font-semibold cursor-pointer hover:underline'
            onClick={() => navigate('/home')}
          >
            Projects
          </p>
          <p className='py-2 px-1'>/</p>
          <p className='py-2 px-1 font-semibold'>{project ? project.name : "Loading..."}</p>
        </div>
        <div className='p-2 text-xl font-semibold text-slate-900'>List</div>
      </div>
      <div className='w-[90%]'>
        <Paper sx={{ height: '100%', width: '100%' }}>
          <DataGrid
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => console.error(error)} 
            className='bg-white'
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default TaskList;
