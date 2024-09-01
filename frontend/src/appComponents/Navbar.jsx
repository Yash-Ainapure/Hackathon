import React, { useState } from "react";
// import Banner from '../assets/banner.jpg';
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import CloseIcon from "@mui/icons-material/Close";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from "react-router-dom";


//Modal State
function Navbar() {

  const navigateTo = useNavigate();
  const user = useSelector(state => state.setUserObjReducer.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };



  const openNotificationModal = () => {
    setShowNotificationModal(true);
  };

  const closeNotificationModal = () => {
    setShowNotificationModal(false);
  };

  // const [inputValue, setInputValue] = useState("");
  // const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      name: projectName,
      projectDescription: description,
      startDate: startDate,
      owner: user._id,
      ownerName: user.name,
    };

    try {
      console.log(user._id)
      const response = await axios.post('http://localhost:3000/api/projects/createproject', projectData);
      console.log('Project saved successfully:', response.data);
      closeModal();
      // Handle successful response here (e.g., display a success message, reset the form)
    } catch (error) {
      console.error('Error saving project:', error);
      // Handle error here (e.g., display an error message)
    }
  };


  const handleSeeMore = () => {
    // Redirect logic or navigate to notifications page
    alert('Redirecting to notifications page');
    closeModal();
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

  const changeLoginStatus = () => {
    localStorage.removeItem('auth-token');
    navigateTo('/');
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full p-2 px-24 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">CoLab</h1>
          <select
            name=""
            id=""
            className="font-semibold bg-transparent text-sky-800"
          >
            <option value="">Your work</option>
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
          <div className="pr-2" onClick={() => setProfileModal(true)}>
            <img
              className="w-12 h-12 rounded-full"
              src="https://assets.aceternity.com/manu.png"
              alt="Profile"
            />
          </div>

          {showNotificationModal && (
            <CircleNotificationsIcon onClose={closeNotificationModal} onSeeMore={handleSeeMore} />
          )}
        </div>
        {
          profileModal && <div className="absolute z-50 bg-white border rounded-md shadow-lg h-60 w-72 right-40 top-16">
            <button
              onClick={() => setProfileModal(false)}
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            >
              <CloseIcon />
            </button>
            <div className="p-2">
              <div><p>Account</p></div>
              <div className="flex gap-4 p-2">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://assets.aceternity.com/manu.png"
                  alt="Profile"
                />
                <div>
                  <p>Pawan Malgavi</p>
                  <p>pawan1423@gmail.com</p>
                </div>
              </div>
            </div>
            <div onClick={() => {
              setProfileModal(false)
              navigate('/manageaccount')
            }} className="flex justify-between px-6 py-2 cursor-pointer">
              <p>Manage Account</p>
              <ManageAccountsIcon />
            </div>
            <div className="absolute bottom-0 flex justify-start w-full p-4 border-t">
              <p onClick={changeLoginStatus} className="cursor-pointer"> Log out</p>
            </div>
          </div>
        }
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative z-50 w-1/3 p-8 bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            >
              <CloseIcon />
            </button>
            <h2 className="mb-4 text-2xl font-semibold">Create New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter project name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
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
                  <ul className="absolute w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md max-h-40">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelect(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-200"
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
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="px-4 py-2 font-semibold text-white rounded-md bg-sky-600">
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
