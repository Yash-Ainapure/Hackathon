import React, { useState } from 'react'
import Navbar from '../appComponents/Navbar'
import Footer from '../appComponents/Footer'
import YourWork from '../appComponents/YourWork'
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getProjectsForUser } from "../services/projectService";
export default function Home() {
  useAuth();

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
  const user = useSelector(state => state.setUserObjReducer.user);

  const [userProjects, setUserProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log("Fetching projects for user ID: 66d1f445bf20097cf324f0d6");

        // Await the promise returned by getProjectsForUser
        const projects = await getProjectsForUser(user._id);

        // Once the projects are fetched, update the state
        setUserProjects(projects);
        console.log("Fetched user projects:", projects[0]);

      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <Navbar />
      <YourWork projects={userProjects} />
      <Footer />
    </>
  )
}
