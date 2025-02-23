import React, { useState } from 'react';
import Card from './Card';
import { FlipWords } from "../components/ui/flip-words";
import { useProject } from './ProjectContext';
import axios from 'axios';

import CloseIcon from "@mui/icons-material/Close";
const yourWorkWords = ["Your Projects", "Managed by You", "Your Creations"];
const sharedWorkWords = ["Shared Projects", "Collaborations", "Projects with You"];
const BACKEND_URL = import.meta.env.VITE_API_URL;
export default function YourWork({ projects, searchQuery, fetch }) {
  const { setProject } = useProject();
  const user = JSON.parse(localStorage.getItem('user-object'));

  // Filter projects based on searchQuery
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate projects into "Your Projects" and "Shared Projects"
  const yourProjects = filteredProjects.filter(project => project.ownerName === user.name);
  const sharedProjects = filteredProjects.filter(project => project.ownerName !== user.name);

const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
      fetch();
      closeModal();

      // Handle successful response here (e.g., display a success message, reset the form)
    } catch (error) {
      console.error("Error saving project:", error);
      // Handle error here (e.g., display an error message)
    }
  };
  return (
    <div className='px-10'>
      <div className='py-10'>
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
        {/* Your Projects Section */}
        <h2 className='py-5 text-2xl font-medium text-gray-700 border-y border-gray-400 flex justify-between items-center'>
          <FlipWords words={yourWorkWords} />
          <button
              onClick={openModal}
              className="md:hidden block w-[35px] h-[35px] font-semibold text-white rounded bg-sky-600 text-sm "
            >
            <span className="font-bold text-lg">+</span>
            </button>
        </h2>
        <div className='flex flex-wrap justify-center'>
          {yourProjects.length !== 0 ? (
            yourProjects.map((project, index) => (
              <Card
                key={index}
                fetch={fetch}
                project={project}
                name={project.name}
                ownerName={project.ownerName}
                summary={project.projectDescription}
                todoCount={project.toDO.length}
                progressCount={project.inProgress.length}
                doneCount={project.completed.length}
              />
            ))
          ) : (
            <p className='mt-8'>No personal projects found.</p>
          )}
        </div>

        {/* Shared Projects Section */}
        <h2 className='py-5 text-2xl font-medium text-gray-700 border-y border-gray-400 mt-10'>
          <FlipWords words={sharedWorkWords} />
        </h2>
        <div className='flex flex-wrap justify-center'>
          {sharedProjects.length !== 0 ? (
            sharedProjects.map((project, index) => (
              <Card
                key={index}
                fetch={fetch}
                project={project}
                name={project.name}
                ownerName={project.ownerName}
                summary={project.projectDescription}
                todoCount={project.toDO.length}
                progressCount={project.inProgress.length}
                doneCount={project.completed.length}
              />
            ))
          ) : (
            <p className='mt-8'>No shared projects found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
