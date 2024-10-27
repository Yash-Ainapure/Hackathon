import React,{useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { useProject } from './ProjectContext';
import '.././App.css'
import axios from 'axios';

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Administrator', 'Member'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const initialRows = [
  {
    id: randomId(),
    name: "Harshvardhan Patil",
    email: "harsh2504patil@gmail.com",
    role: randomRole(),
  },
  {
    id: randomId(),
    name: "Aryan Patil",
    email: "aryanrpatil@gmail.com",
    role: randomRole(),
  },
  {
    id: randomId(),
    name: "Pawan Malgavi",
    email: "pawanmalgavi@gmail.com",
    role: randomRole(),
  },
 
];

function EditToolbar({setIsOpen}) {
  // const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    setIsOpen(true);
  };



  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add People
      </Button>
    </GridToolbarContainer>
  );
}

export default function Teams() {

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
    handleSaveClick();
  };

  

  const columns = [
    { field: 'name', headerName: 'Name', width: 250, editable: true },
    {
      field: 'email',
      headerName: 'Email',
      type: 'text',
      width: 250,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 220,
      editable: false,
      type: 'text',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

       


        return [
          
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const [isOpen, setIsOpen] = useState(false); // Control modal state

  const closeModal = () => {
    setIsOpen(false); // Close the modal when the close button is clicked
  };


  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [role, setRole] = useState('');
  const { project } = useProject();
  // Function to add email
  const addEmail = (email) => {
    if (email && validateEmail(email)) {
      setEmails([...emails, email]);
      setInputValue(''); // Clear input after adding
    }
  };

  // Function to remove email
  const removeEmail = (indexToRemove) => {
    setEmails(emails.filter((_, index) => index !== indexToRemove));
  };

  // Validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Handle key press (Enter, Comma, or Semicolon)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',' || e.key === ';') {
      e.preventDefault(); // Prevent default behavior
      addEmail(inputValue.trim());
    }
  };


  const handleAddMembers = async () => {
    // Prepare data to send
    console.log("data received:",emails," ",role);
    const data = {
      projectId: project._id, // Replace with actual projectId prop
      members: {
        email: emails,
        role: role,
      },
    
    };

    try {
      // Send data to the backend
      const response = await axios.post('http://localhost:3000/api/projects/add-members', data);

      if (response.status === 200) {
        console.log('Members added successfully', response.data);
        // Close the modal or reset the form, as needed
        setEmails([]);
        closeModal();
      } else {
        console.log('Error adding members');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <div className='px-32 py-20'>
        <h1 className='text-xl font-medium my-4'>Manage Teams Here</h1>
        <p>{JSON.stringify(project)}</p>
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary',
            },
            '& .textPrimary': {
              color: 'text.primary',
            },
            backgroundColor: "white",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: () => <EditToolbar setIsOpen={setIsOpen} />,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            sx={{
              padding: "30px",
            }}
          />
        </Box>
      </div>
  
  
       {isOpen && ( <div
          className='fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50'
        >
          <div className='relative bg-white rounded-lg w-full max-w-lg p-10 shadow-lg'>
           
      
            
            {/* Close Button */}
            <button
              className='absolute top-3 right-3 text-gray-500 hover:text-gray-800'
              onClick={closeModal}
            >
              &#10005; {/* Close Icon */}
            </button>

            <p className='text-lg font-semibold mb-5'>Add People to My Project</p>
            <label className='block text-sm mb-2'>Emails</label>
                  <input
                    type='text'
                    className='w-full p-2 border border-gray-300 rounded my-2'
                    placeholder='e.g harshpatil@gmail.com'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown} // Trigger on key press
                  />
                  <div
                  className='overflow-x-auto whitespace-nowrap flex items-center mt-2 space-x-2 custom-scrollbar'
                >
                  {emails.map((email, index) => (
                    <div
                      key={index}
                      className='bg-gray-200 text-sm flex items-center px-2 py-1 rounded mb-2'
                    >
                      {email}
                      <span
                        className='ml-2 text-slate-500 cursor-pointer'
                        onClick={() => removeEmail(index)} // Remove email on click
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>

                  {/* <div className='mt-2'>
                    <strong>Emails array:</strong> {JSON.stringify(emails)}
                  </div> */}
           <label className='block text-sm mb-2'>Role</label>
            <select
              className='w-full p-2 border border-gray-300 rounded my-2'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value='' disabled>Select the role</option>
              <option value='admin'>Admin</option>
              <option value='member'>Members</option>
            </select>

            <div className='flex justify-end mt-6'>
              <button
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
                onClick={handleAddMembers} // Add members on click
              >
                Add
              </button>
            </div>
          
          </div>
        </div>
 )}
    </div>
  );
  
}