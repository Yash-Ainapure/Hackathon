import React, { useState } from "react";
// import Banner from '../assets/banner.jpg';
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
import { useSelector } from "react-redux";
//Modal State
function Navbar() {


  const user = useSelector(state => state.setUserObjReducer.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // const [inputValue, setInputValue] = useState("");
  // const [suggestions, setSuggestions] = useState([]);


  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      name: projectName,
      description: description,
      startDate: startDate,
      owner:user._id,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/project/createproject', projectData);
      console.log('Project saved successfully:', response.data);
      // Handle successful response here (e.g., display a success message, reset the form)
    } catch (error) {
      console.error('Error saving project:', error);
      // Handle error here (e.g., display an error message)
    }
  };




  //AutoCOmplete text View
  // const data = [
  //   "Project Alpha",
  //   "Project Beta",
  //   "Project Gamma",
  //   "Project Delta",
  //   "Project Epsilon",
  //   "Project Zeta",
  //   "Project Eta",
  //   "Project Theta",
  //   "Project Iota",
  //   "Project Kappa",
  // ];

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setInputValue(value);

  //   if (value.length > 0) {
  //     const filteredSuggestions = data.filter((item) =>
  //       item.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setSuggestions(filteredSuggestions);
  //   } else {
  //     setSuggestions([]);
  //   }
  // };

  // const handleSelect = (suggestion) => {
  //   setInputValue(suggestion);
  //   setSuggestions([]);
  // };
  return (
    <div>
      <div className="flex items-center justify-between w-full p-2 px-24 border-b">
        <div className="flex gap-4 items-center">
          <h1 className="text-xl font-semibold">CoLab</h1>
          <select
            name=""
            id=""
            className="font-semibold bg-transparent text-sky-800"
          >
            <option value="">Your Work</option>
            <option value="">Assigned</option>
            <option value="">Recent</option>
          </select>
          <select
            name=""
            id=""
            className="font-semibold bg-transparent text-sky-800"
          >
            <option value="">Projects</option>
            <option value="">Project 1</option>
            <option value="">Project 2</option>
          </select>
          <button
            onClick={openModal}
            className="px-4 py-2 font-semibold text-white rounded bg-sky-600"
          >
            Create
          </button>
        </div>
        <div className="flex gap-4">
          <div className="flex p-[1px] pl-2 bg-white border rounded-md shadow items-center">
            <SearchIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
            <input className="pl-2" placeholder="Search" type="text" />
          </div>
          <div className="pr-2">
            <img
              className="w-12 h-12 rounded-full"
              src="https://assets.aceternity.com/manu.png"
              alt="Profile"
            />
          </div>
          <CircleNotificationsIcon style={{ fontSize: "45px" }} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg z-50 w-1/3">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <CloseIcon />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
            <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="Enter project name"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="Enter project description"
        />
      </div>
      {/* Auto Complete Text View */}
              {/* <div className="mb-4">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Search for a project..."
                />
                {suggestions.length > 0 && (
                  <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(suggestion)}
                        className="p-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div> */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 font-semibold text-white bg-sky-600 rounded-md">
          Save
        </button>
      </div>
    </form>
          </div>
        </div>
         
      )}
    </div>
  );
}

export default Navbar;
