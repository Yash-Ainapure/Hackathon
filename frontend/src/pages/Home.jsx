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

  const [userProjects, setUserProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const uid = localStorage.getItem("userid"); 
      console.log("Fetching projects for user ID: ");
      console.log("Userid:"+uid);
      // Await the promise returned by getProjectsForUser
      const projects = await getProjectsForUser(uid);

      // Once the projects are fetched, update the state
      setUserProjects(projects);
      console.log("Fetched user projects:", projects[0].ownerName);
      
      console.log("sadasdasdasdasdasdas");
      console.log(userProjects);
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };


  useEffect(() => {
 
    fetchProjects();
  }, []);

  return (
    <>
      <Navbar fetch={fetchProjects}/>
      <YourWork projects={userProjects}   />
      <Footer />
    </>
  )
}
