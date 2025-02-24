import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useProject } from "./ProjectContext";
import ".././App.css";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL;
import { BiArrowBack } from "react-icons/bi";
                  
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { ownerDocument } from "@mui/material";
import { useNavigate } from "react-router-dom";

const roles = ["Administrator", "Member"];
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

function EditToolbar({ setIsOpen }) {
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
  const [rows, setRows] = React.useState();
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();
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
    console.log() // delete implement
    const rowToDelete = rows.find((row) => row.id === id);
    console.log(rowToDelete.email);
    
    if (rowToDelete) {
      
      axios.post(`${BACKEND_URL}/api/projects/remove-member-v2`, {
      projectId: project._id,
      email: rowToDelete.email,
      })
      .then(() => {
      setRows(rows.filter((row) => row.id !== id));
      })
      .catch((error) => {
      console.error("Error removing member:", error);
      });
    }
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
    { field: "id", headerName: "id", width: 250, editable: true },
    { field: "name", headerName: "Name", width: 250, editable: true },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      width: 250,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 220,
      editable: false,
      type: "text",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
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
  const mobileColumns = [
    { field: "id", headerName: "id", width: 90, editable: true },
    { field: "name", headerName: "Name", width: 130, editable: true },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      width: 240,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      editable: false,
      type: "text",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      cellClassName: "actions",
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
  const [inputValue, setInputValue] = useState("");
  const [role, setRole] = useState("");
  const { project } = useProject();
  const [projectMembers, setProjectMembers] = useState([]);
  // Function to add email
  const addEmail = (email) => {
    if (email && validateEmail(email)) {
      setEmails((prevEmails) => [...prevEmails, email]);
      setInputValue(""); // Clear input after adding
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
    if (e.key === "Enter" || e.key === "," || e.key === ";") {
      e.preventDefault(); // Prevent default behavior
      addEmail(inputValue.trim());
    }
  };

  const fetchProjectMembers = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/projects/fetchProjectMembers`,
        {
          projectId: project._id,
        }
      );
      // console.log("bis Project Members:", response.data);
      setProjectMembers(response.data);
    } catch (error) {
      console.error("Error fetching project members:", error);
    }
  };

  const handleAddMembers = async () => {
    // If there's an email in the input, add it to the emails array
    if (inputValue) {
      addEmail(inputValue.trim());
      setInputValue(""); // Clear the input
    }

    // Only proceed with the API call if there's at least one email
    if (emails.length === 0) return; // Stops execution if emails array is empty

    // console.log("Data received:", emails, " ", role);

    const userObject = localStorage.getItem("user-object");
    if (!userObject) {
      console.error("User object not found in localStorage");
      return;
    }

    const user = JSON.parse(userObject);

    // Create an object for the members, including emails and role
    const data = {
      owner: user.name, // Retrieve owner name from parsed object
      projectId: project._id,
      members: {
        email: emails, // Use the correct key for emails
        role: role,
      },
    };

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/projects/add-members`,
        data
      );
      // console.log(response);
      if (response.status === 200) {
        // console.log('Members added successfully', response.data);
        setEmails([]); // Clear emails after adding
        setInputValue(""); // Clear input
        closeModal();

        // Refresh the project members list
        fetchProjectMembers();
      } else {
        console.log("Error adding members");
      }
    } catch (error) {
      console.error(
        "Error adding members:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Load project members initially
  useEffect(() => {
    if (project) {
      fetchProjectMembers();
    }
  }, [project]);

  const [matchingMember, setMatchingMember] = useState(null);

  // Ensure projectMembers and members exist

  useEffect(() => {
    // Update rows for DataGrid
    const members = projectMembers?.members;
    if (members && members.length > 0) {
      const newRows = members.map((member, index) => ({
        id: index + 1, // Use member ID or index as ID
        name: member.name,
        email: member.email,
        role: member.role,
      }));
      setRows(newRows);
    }

    // Find matching member
    const user = JSON.parse(localStorage.getItem("user-object"));
    if (members && Array.isArray(members)) {
      const foundMember = members.find(
        (member) => member.email === user?.email
      );
      setMatchingMember(foundMember || null); // Update state with found member
    } else {
      console.error(
        "projectMembers or members array is undefined or not properly initialized."
      );
    }
  }, [projectMembers]);

  const filteredColumnsMobile =
      matchingMember?.role === "Admin"
        ? mobileColumns // Keep all columns for Admin
        : mobileColumns.filter((column) => column.field !== "actions");

  const filteredColumns =
    matchingMember?.role === "Admin"
      ? columns // Keep all columns for Admin
      : columns.filter((column) => column.field !== "actions");

      

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 md:py-6 sm:py-20">
        <div className="flex items-center flex-wrap border-b">
          <p
            className="py-2 px-1 font-semibold cursor-pointer hover:underline flex items-center gap-2"
            onClick={() => navigate("/home")}
          >
           
                              <BiArrowBack className=''/>Projects
          </p>
          <p className="py-2 px-1">/</p>
          <p className="py-2 px-1 font-semibold">
            {project ? project.name : "Loading..."}
          </p>
        </div>
        <h1 className="text-xl font-medium my-4">Manage Teams Here</h1>
        <Box className="hidden md:block"
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            backgroundColor: "white",
          }}
        >
          {matchingMember && (
            <DataGrid
              rows={rows}
              columns={filteredColumns}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar:
                  matchingMember?.role === "Admin"
                    ? () => <EditToolbar setIsOpen={setIsOpen} />
                    : null,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
              sx={{
                padding: "30px",
              }}
            />
          )}
        </Box>
        <Box className="block md:hidden"
          sx={{
            height: 500,
            width: "100%",
            "& .actions": {
              color: "text.secondary",
            },
            "& .textPrimary": {
              color: "text.primary",
            },
            backgroundColor: "white",
          }}
        >
          {matchingMember && (
            <DataGrid
              rows={rows}
              columns={filteredColumnsMobile}
              editMode="row"
              rowModesModel={rowModesModel}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              processRowUpdate={processRowUpdate}
              slots={{
                toolbar:
                  matchingMember?.role === "Admin"
                    ? () => <EditToolbar setIsOpen={setIsOpen} />
                    : null,
              }}
              slotProps={{
                toolbar: { setRows, setRowModesModel },
              }}
              sx={{
                padding: "30px",
              }}
            />
          )}
        </Box>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black bg-opacity-50 px-8">
          <div className="relative bg-white rounded-lg w-full max-w-lg p-4 sm:p-10 shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              &#10005;
            </button>

            <p className="text-lg font-semibold mb-5">
              Add People to My Project
            </p>
            <label className="block text-sm">Emails</label>
            <p className="block text-xs font-thin">
              You can add multiple members at once.
            </p>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded my-2"
              placeholder="e.g harshpatil@gmail.com"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="overflow-x-auto whitespace-nowrap flex items-center mt-2 space-x-2 custom-scrollbar">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-sm flex items-center px-2 py-1 rounded mb-2"
                >
                  {email}
                  <span
                    className="ml-2 text-slate-500 cursor-pointer"
                    onClick={() => removeEmail(index)}
                  >
                    &times;
                  </span>
                </div>
              ))}
            </div>

            <label className="block text-sm">Role</label>
            <select
              className="w-full p-2 border border-gray-300 rounded my-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" disabled>
                Select the role
              </option>
              <option value="admin">Admin</option>
              <option value="member">Members</option>
            </select>

            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleAddMembers}
              >
                {emails.length === 0 ? "Add Member" : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
