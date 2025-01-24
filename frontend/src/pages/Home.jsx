import React, { useState, useEffect } from 'react';
import Navbar from '../appComponents/Navbar';
import Footer from '../appComponents/Footer';
import YourWork from '../appComponents/YourWork';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getProjectsForUser } from "../services/projectService";

export default function Home() {
  useAuth(); // Custom hook to check authentication

  const location = useLocation();
  const navigate = useNavigate();
  // useEffect(() => {

  //   if (!location.state || !location.state.subject) {
  //     console.log('sending to login page');
  //     navigate('/');
  //   }
  // }, [location, navigate]);

  // Ensure component does not render if subject is not present
  // if (!location.state || !location.state.subject) {
  //   return null;
  // }
  const [userProjects, setUserProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch projects for the authenticated user
  const fetchProjects = async () => {
    try {
      const uid = localStorage.getItem("userid");
      // console.log("Fetching projects for user ID:", uid);

      // Await the promise returned by getProjectsForUser
      const projects = await getProjectsForUser(uid);

      // Update the state with fetched projects
      setUserProjects(projects);
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };

  // Use effect to fetch projects when the component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar fetch={fetchProjects} setSearchQuery={setSearchQuery} />
      <YourWork projects={userProjects} fetch={fetchProjects} searchQuery={searchQuery} />
      <Footer />
    </>
  );
}
