import React, { useState } from "react";
// import Banner from '../assets/banner.jpg';
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { IoLogInOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_API_URL;

//Modal State
function Navbar(props) {
  const navigateTo = useNavigate();
  // const user = useSelector(state => state.setUserObjReducer.user);
  const user = JSON.parse(localStorage.getItem("user-object"));
  const profilePicUrl = user.profilePic;
  // console.log('User:', user);

  const [profileModal, setProfileModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onManageAccountClick = async () => {
    const userId = localStorage.getItem("userid");
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/fetch-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      // console.log('User data:', data);
      setProfileModal(false);
      // console.log('User data before navigating:', data);
      navigate("/manageaccount", { state: { user: data } });
    } catch (error) {
      console.error("Failed to load user data:", error);
    }
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
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");

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
      // console.log(user._id)
      const response = await axios.post(
        `${BACKEND_URL}/api/projects/createproject`,
        projectData
      );
      // console.log('Project saved successfully:', response.data);
      props.fetch();
      closeModal();

      // Handle successful response here (e.g., display a success message, reset the form)
    } catch (error) {
      console.error("Error saving project:", error);
      // Handle error here (e.g., display an error message)
    }
  };

  const handleSeeMore = () => {
    // Redirect logic or navigate to notifications page
    alert("Redirecting to notifications page");
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
    localStorage.removeItem("auth-token");
    navigateTo("/");
  };

  const handleSearchChange = (e) => {
    props.setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full p-2 px-4 md:px-24 md:border-b">
        <div className="flex items-center justify-between w-full md:w-auto">
          <h1
            onClick={() => navigate("/home")}
            className="text-xl font-semibold cursor-pointer"
          >
            CoLab
          </h1>
          <div className="md:hidden">
            <button onClick={() => setProfileModal(!profileModal)}>
              <img
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                src={
                  profilePicUrl
                    ? profilePicUrl
                    : "https://assets.aceternity.com/manu.png"
                }
                alt="Profile"
              />
            </button>
          </div>
        </div>
        {!props.componentHide && (
          <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-0 w-full md:w-auto border-t pt-3 md:border-t-0 md:pt-0">
            <div className="flex items-center justify-between gap-4 w-full md:w-auto ">
              <div className="flex p-[1px] pl-2 bg-white border rounded-md shadow items-center w-full md:w-auto">
                <SearchIcon className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />
                <input
                  onChange={handleSearchChange}
                  className="pl-2 focus:outline-none focus:ring-0 py-2 w-full md:w-auto"
                  placeholder="Search Projects"
                  type="text"
                />
              </div>
              <button
                onClick={openModal}
                className="hidden md:block px-4 py-2 font-semibold text-white rounded bg-sky-600 w-[30%] md:w-auto"
              >
                Create Project <span className="font-bold text-lg">+</span>
              </button>
            </div>
          </div>
        )}
        <div className="hidden md:flex items-center gap-4">
          <div className="pr-2" onClick={() => setProfileModal(true)}>
            <img
              className="w-12 h-12 object-cover rounded-full cursor-pointer"
              src={
                profilePicUrl
                  ? profilePicUrl
                  : "https://assets.aceternity.com/manu.png"
              }
              alt="Profile"
            />
          </div>
          {showNotificationModal && (
            <CircleNotificationsIcon
              onClose={closeNotificationModal}
              onSeeMore={handleSeeMore}
            />
          )}
        </div>
      </div>

      {profileModal && (
        <div className="absolute right-4 md:right-24 top-16 z-50 flex h-60 w-72 flex-col rounded-2xl border bg-white shadow-lg">
          <div className="flex w-full items-center justify-between p-4">
            <p className="font-bold font-roboto">Account</p>
            <button
              onClick={() => setProfileModal(false)}
              className="hover:text-gray-900"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="my-2 flex items-center justify-center">
            <img
              src={
                profilePicUrl
                  ? profilePicUrl
                  : "https://assets.aceternity.com/manu.png"
              }
              alt="Profile Picture"
              className="mr-2 w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p className="font-roboto font-bold tracking-wide">{user.name}</p>
              <p className="font-roboto tracking-wide text-sm md:text-md">
                {user.email}
              </p>
            </div>
          </div>
          <div className="my-3 border-t"></div>
          <div className="flex flex-col items-center">
            <div
              onClick={onManageAccountClick}
              className="flex w-full items-center cursor-pointer justify-start gap-4 px-6 py-2 transition-colors duration-200 hover:bg-gray-100"
            >
              <ManageAccountsIcon className="w-6 h-6 text-gray-500" />
              <p className="font-roboto">Manage Account</p>
            </div>
            <div className="flex w-full items-center cursor-pointer justify-start gap-4 px-6 py-2 transition-colors duration-200 hover:bg-gray-100">
              <IoLogInOutline className="w-6 h-6 text-gray-500" />
              <p className="font-roboto" onClick={changeLoginStatus}>
                Log out
              </p>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>

          <div className="relative z-50 w-11/12 md:w-1/3 p-8 bg-white rounded-lg shadow-lg">
            <button
              onClick={closeModal}
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
            >
              <CloseIcon />
            </button>
            <h2 className="mb-4 text-2xl font-semibold">Create New Project</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter project name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                  placeholder="Enter project description"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 mt-1 border rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 font-semibold text-white rounded-md bg-sky-600"
                >
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
