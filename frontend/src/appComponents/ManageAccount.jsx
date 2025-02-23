import Footer from "./Footer";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_API_URL;

// require('dotenv').config();
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET;

const ManageAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    jobInfo: ""
  });

  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      
    }));
    console.log(user)

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let profilePictureUrl = user.profilePicture;
      if (selectedFile) {
        setUploading(true);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", CLOUDINARY_PRESET); // Replace with your Cloudinary upload preset
        formData.append("cloud_name", CLOUDINARY_CLOUD_NAME); // Replace with your Cloudinary cloud name

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace with your Cloudinary URL
          formData
        );
        profilePictureUrl = cloudinaryResponse.data.secure_url; // Get the uploaded image URL
        setUploading(false);
      }

      user.profilePic = profilePictureUrl;

      const response = await axios.post(`${BACKEND_URL}/api/auth/update-user`, {
        user,
      });

      // console.log(response);

      if (response.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          ...response.data.user,
        }));
        location.state.user = response.data.user;
        alert("User data updated successfully");
        navigate("/home", { replace: true });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert("Failed to update user data: " + error.response.data.message);
      } else {
        alert("Failed to update user data");
      }
    }
  };

  useEffect(() => {
    if (location.state?.user) {
      user.firstName = location.state.user.name.split(" ")[0];
      user.lastName = location.state.user.name.split(" ")[1];
      setUser((prevUser) => ({
        ...prevUser,
        ...location.state.user,
        address: {
          ...prevUser.address,
          ...location.state.user.address,
        },
      }));
    }
    
  }, [location]);

  return (
    <>
      <Navbar componentHide={true} />

      <div className="flex justify-center my-6 px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="border-2 w-full max-w-2xl  shadow-xl p-6 sm:p-10 md:p-10 rounded-2xl"
        >
          <div className="space-y-6">
            
              <h1 className="text-3xl  text-center font-bold tracking-tight text-gray-900">
                Manage Account
              </h1>
            
            <div className="border-b border-gray-900/10 pb-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                        colab.com/
                      </span>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="yourname"
                        autoComplete="name"
                        value={user.name.split(" ").join('_')}
                        readOnly={true}
                        onChange={handleChange}
                        className="block flex-1 border-0 cursor-not-allowed bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="col-span-full">
                  <div className="col-span-full">
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Profile Picture
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        {user.profilePicture && (
                          <img
                            src={user.profilePicture}
                            alt="Profile"
                            className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                          />
                        )}
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                            {preview && (
                              <div>
                                <h4>Image Preview:</h4>
                                <img
                                  src={preview}
                                  alt="Preview"
                                  style={{
                                    width: "200px",
                                    height: "auto",
                                    borderRadius: "8px",
                                  }}
                                />
                              </div>
                            )}
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, JPEG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={user.firstName}
                    onChange={handleChange}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={user.lastName}
                    onChange={handleChange}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={handleChange}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="job-description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="job-description"
                    name="jobInfo"
                    rows={3}
                    value={user.jobInfo}
                    onChange={handleChange}
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                  />
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about your job profile.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-x-4 space-y-0">
              <button
                type="button"
                className="rounded-md bg-white px-3.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                onClick={() => {
                  navigate("/home");
                  window.scrollTo(0, 0);
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-sky-500 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-sky-600"
                disabled={uploading}
              >
                {uploading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ManageAccount;
