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
console.log("Outer Updated Project Object:",project);

  }, [project]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'taskName', headerName: 'Task Name', width: 200, editable: true },
    { field: 'status', headerName: 'Status', width: 150, editable: true },
    { field: 'assignedTo', headerName: 'Assignee', width: 150, editable: true },
    { field: 'reporter', headerName: 'Reporter', width: 150, editable: false },
    { field: 'taskDescription', headerName: 'Summary', width: 250, editable: true },
    {
      field: 'dueDate',
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
    taskid: task.taskid,
    taskName: task.taskName,
    status:
      project.toDO.includes(task) ? 'To Do' :
      project.inProgress.includes(task) ? 'In Progress' :
      project.completed.includes(task) ? 'Completed' :
      'Unknown', // Fallback status
    assignedTo: task.assignedTo || '',
    reporter: task.reporter,
    taskDescription: task.taskDescription,
    dueDate: task.dueDate || '',
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  // Update project tasks on row update
  const processRowUpdate = async (updatedRow, originalRow) => {
    // Clone `projectTasks` to avoid direct mutation
    const updatedTasks = [...projectTasks];
    
    // Find the index of the task being updated
    const taskIndex = updatedTasks.findIndex(task => task.taskid === originalRow.taskid);

    console.log("index=", taskIndex, "originalRow=", originalRow, "updatedRow=", updatedRow);

    if (taskIndex !== -1) {
        // Update the task with the new data from `updatedRow`
        updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            taskName: updatedRow.taskName,
            status: updatedRow.status,
            assignedTo: updatedRow.assignedTo,
            reporter: updatedRow.reporter,
            taskDescription: updatedRow.taskDescription,
            dueDate: updatedRow.dueDate,
        };

        // Update `projectTasks` state
        setProjectTasks(updatedTasks);
        console.log("Updated Project Tasks:", updatedTasks);
        console.log("Before Updated Project Object:", project);
        console.log("task which is updated",updatedTasks[taskIndex].taskid );

        // Now reconstruct the project object by categorizing tasks into their respective arrays
        const updatedProject = {
            ...project,
            toDO: updatedTasks.filter(task => project.toDO.map(t => t.taskid).includes(task.taskid)),
            inProgress: updatedTasks.filter(task => project.inProgress.map(t => t.taskid).includes
            (task.taskid)),
            completed: updatedTasks.filter(task => project.completed.map(t => t.taskid).includes(task.taskid)),
    
        };

        console.log("Updated Project Object:", updatedProject);

        // Set the updated project in the context to trigger localStorage update
        await setProject(updatedProject);
        localStorage.setItem(project._id, JSON.stringify(updatedProject));
        console.log("Updated Project Object:", updatedProject);
      // API call to update task status on the server
          try {
            await axios.post('http://localhost:3000/api/tasks/updateTaskStatus', {
                projectId: project._id,
                toDO: updatedProject.toDO,
                inProgress: updatedProject.inProgress,
                completed: updatedProject.completed,
            });
            console.log("Task DATA updated successfully");
          } catch (error) {
            console.error("Error updating task data:", error);
          }
    } else {
        console.log('Task not found');
    }

    return updatedRow; // Return the updated row as required by DataGrid
};


  return (
    <div className='flex flex-col px-20 justify-top '>
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
      {/* <p>{JSON.stringify(project)}</p>   */}
      

        <div className='p-2 text-xl font-semibold text-slate-900'>List</div>
        
      </div>
      <div className='w-[90%]'>
        <Paper sx={{ height: '100%', width: '100%' }}>
        <DataGrid
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={(error) => console.error(error)}
            className="bg-white"
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
