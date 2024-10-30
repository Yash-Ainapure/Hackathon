import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useProject } from './ProjectContext';

// const generateId = () => {
//   return Math.floor(10000000 + Math.random() * 90000000);
// };

// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'firstName', headerName: 'First name', width: 130, editable: true },
//   { field: 'lastName', headerName: 'Last name', width: 130, editable: true },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 90,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     editable: true,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
// ];





const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'taskName', headerName: 'Task Name', width: 200, editable: true },
  { field: 'status', headerName: 'Status', width: 150, editable: true },
  { field: 'assignee', headerName: 'Assignee', width: 150, editable: true },
  { field: 'summary', headerName: 'Summary', width: 250, editable: true },
  {
    field: 'dueDate',
    headerName: 'Due Date',
    width: 150,
    editable: true,
    type: 'date',
    valueGetter: (params) => (params.value instanceof Date ? params.value : new Date(params.value)), // Ensure it's a Date object
    valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '', // Safely format the date
  },
];

// Function to generate an 8-digit ID
const generateId = () => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

// Function to generate a random date in the future
const generateFutureDate = () => {
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 30)); // Adds a random number of days (up to 30)
  return futureDate;
};

// List of demo assignees
const assignees = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

// List of demo summaries
const summaries = [
  'Backend API setup for project',
  'Integrate front-end with backend',
  'Resolve critical bugs in the codebase',
  'Set up payment gateway integration',
  'Apply new styling to components',
  'Complete the design for the website'
];

// Transform initialLists into rows with generated IDs
const initialLists = {
  Todo: ['Create backend API', 'frontend integration', 'Bugs solving'],
  InProgress: ['Payment Gateway Integration', 'Styling'],
  Done: ['Web Designing'],
};

// Create rows data from initialLists
const rows = Object.entries(initialLists).reduce((acc, [status, tasks]) => {
  const tasksWithIds = tasks.map(taskName => ({
    id: generateId(),
    taskName,
    status,
    assignee: assignees[Math.floor(Math.random() * assignees.length)], // Randomly assign an assignee
    summary: summaries[Math.floor(Math.random() * summaries.length)], // Randomly assign a summary
    dueDate: generateFutureDate(), // Generate a random future due date as a Date object
  }));
  return acc.concat(tasksWithIds);
}, []);

const paginationModel = { page: 0, pageSize: 5 };


// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const paginationModel = { page: 0, pageSize: 5 };


const TaskList = () => {
const { project, setProject } = useProject();

  return (
    <div className='flex flex-col min-h-screen px-20 justify-top'>
      <div>
      <div className='flex items-center'>
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
        <Paper sx={{ height: 400, width: '100%' }}>
          <DataGrid
            processRowUpdate={(updatedRow, originalRow) => {

              console.log(originalRow);
              console.log(updatedRow);
            }}
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
  )
}

export default TaskList