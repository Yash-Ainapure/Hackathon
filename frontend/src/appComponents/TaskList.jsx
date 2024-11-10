import { useEffect, useState } from 'react';
import { DataGrid, GridEditSingleSelectCell } from '@mui/x-data-grid';
import { Avatar, MenuItem, Select, Typography, Box }  from '@mui/material';
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
    {
        field: 'assignedTo',
        headerName: 'Assignee',
        width: 250,
        editable: true,
        renderCell: (params) => {
            const selectedOption = assigneeOptions.find(option => option.value === params.value);
            return (
                <Box className="flex items-center justify-start h-full">
                    {selectedOption ? (
                        <>
                            <Avatar
                                src={selectedOption.image}
                                alt={selectedOption.label}
                                sx={{ width: 24, height: 24, marginRight: 1 }}
                            />
                            <Typography variant="body2">{selectedOption.label}</Typography>
                        </>
                    ) : (
                      <>
                        <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} />
                        <Typography variant="body2" color="textSecondary">Unassigned</Typography>
                        </>
                    )}
                </Box>
            );
        },
        renderEditCell: (params) => (
            <Select
                value={params.value || ""}
                onChange={(event) => params.api.setEditCellValue({ id: params.id, field: params.field, value: event.target.value })}
                fullWidth
                renderValue={(selected) => {
                    const selectedOption = assigneeOptions.find(option => option.value === selected);
                    return selectedOption ? (
                        <Box display="flex" alignItems="center">
                            <Avatar
                                src={selectedOption.image}
                                alt={selectedOption.label}
                                sx={{ width: 24, height: 24, marginRight: 1 }}
                            />
                            <Typography variant="body2">{selectedOption.label}</Typography>
                        </Box>
                    ) : (
                        <Typography variant="body2" color="textSecondary">Unassigned</Typography>
                    );
                }}
            >
                {assigneeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        <Avatar
                            src={option.image}
                            alt={option.label}
                            sx={{ width: 24, height: 24, marginRight: 1 }}
                        />
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        ),
    },
    { field: 'reporter', headerName: 'Reporter', width: 250, editable: false,
      renderCell: (params) => {
          const reporter = params.value; // Assuming reporter is a name or object
          return (
              <Box className="flex items-center justify-start h-full">
                  <Avatar
                      src="https://example.com/reporter-avatar.jpg" // Add the actual avatar URL for the reporter
                      alt={reporter}
                      sx={{ width: 24, height: 24, marginRight: 1 }}
                  />
                  <Typography variant="body2">{reporter || 'No Reporter'}</Typography>
              </Box>
          );
      }
    },
    { field: 'taskDescription', headerName: 'Summary', width: 400, editable: true },
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
  const rows = projectTasks.map((task, index) => (
    // console.log("due date", new Date(task.dueDate).toISOString().split('T')[0]),
    {
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
    dueDate: new Date(task.dueDate) || '',
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


const [assigneeOptions, setAssigneeOptions] = useState([
  { value: '', label: 'Unassigned', image: '' },
  { value: 'John Doe', label: 'John Doe', image: 'https://example.com/john.jpg' },
  { value: 'Jane Smith', label: 'Jane Smith', image: 'https://example.com/jane.jpg' },
  { value: 'Alice Johnson', label: 'Alice Johnson', image: 'https://example.com/alice.jpg' },
  { value: 'Bob Brown', label: 'Bob Brown', image: 'https://example.com/bob.jpg' },
]);
const [projectMembers, setProjectMembers] = useState([]);

const fetchOnlineMembers = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/projects/fetchProjectMembers', {
      projectId: project._id,
    });
    // console.log("Project Members:", response.data);
    setProjectMembers(response.data);
  } catch (error) {
    console.error("Error fetching project members:", error);
  }
};

useEffect(() => {
  if (project) {
     fetchOnlineMembers();
  }
}, [project]);
const user = JSON.parse(localStorage.getItem('user-object'));

useEffect(() => {
  // Convert projectMembers to the format expected by the DataGrid
  // console.log("Project members updated:",projectMembers.members)
  const members = projectMembers.members
  // console.log("member:",members)
  if (members && members.length > 0) {

    const newAssigneeOptions = [
      { value: '', label: 'Unassigned', image: '' }, // Static "Unassigned" option
      ...members.map((member, index) => ({
        id: index + 1,
        value: member.name,
        label: member.name,
        image: 'https://example.com/reporter-avatar.jpg', // Add image URL if available in member object
      })),
    ];
    // console.log("New newAssigneeOptions:", newAssigneeOptions);
    setAssigneeOptions(newAssigneeOptions); // Update rows state
  }
}, [projectMembers]);


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
      <div className='w-[100%]'>
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
