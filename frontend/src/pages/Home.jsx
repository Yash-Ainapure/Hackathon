import React, { useState } from 'react'
import Navbar from '../appComponents/Navbar'
import Footer from '../appComponents/Footer'
import YourWork from '../appComponents/YourWork'
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { getProjectsForUser } from "../services/projectService";
export default function Home() {

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
      <Navbar/>
        <YourWork projects={userProjects}/>
      <Footer/>
    </>
  )
}
