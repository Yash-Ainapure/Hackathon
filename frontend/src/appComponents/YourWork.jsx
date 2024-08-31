import React from 'react'
import Card from './Card'

const projects1 = [
  {
    name: "CoLab",
    owner: "Aryan Patil",
    summary: "Collaboration Management Tool for Remote Teams",
    todoCount: 10,
    progressCount: 15,
    doneCount: 80,
  },
  {
    name: "E-Commerce Platform",
    owner: "Priya Sharma",
    summary: "An online platform for buying and selling products.",
    todoCount: 7,
    progressCount: 8,
    doneCount: 2,
  },
  {
    name: "Healthcare App",
    owner: "Rahul Verma",
    summary: "A mobile app to manage healthcare appointments and records.",
    todoCount: 12,
    progressCount: 14,
    doneCount: 13,
  },
  {
    name: "Fintech Solution",
    owner: "Sneha Patel",
    summary: "A financial technology solution for secure online transactions.",
    todoCount: 6,
    progressCount: 7,
    doneCount: 10,
  },
  {
    name: "Educational Portal",
    owner: "Vikram Singh",
    summary: "A portal providing educational resources for students.",
    todoCount: 65,
    progressCount: 9,
    doneCount: 25,
  },
  {
    name: "Cloud Storage Service",
    owner: "Neha Gupta",
    summary: "A cloud-based storage service for secure file management.",
    todoCount: 8,
    progressCount: 5,
    doneCount: 22,
  },
  {
    name: "Social Media App",
    owner: "Rohit Mehra",
    summary: "A social media application connecting people worldwide.",
    todoCount: 9,
    progressCount: 6,
    doneCount: 15,
  },
  {
    name: "Cybersecurity Tool",
    owner: "Anjali Desai",
    summary: "A tool to enhance cybersecurity measures for businesses.",
    todoCount: 13,
    progressCount: 7,
    doneCount: 19,
  },
  {
    name: "Logistics Management",
    owner: "Suresh Rao",
    summary: "A system for managing logistics and supply chain operations.",
    todoCount: 5,
    progressCount: 8,
    doneCount: 29,
  },
  {
    name: "Smart Home System",
    owner: "Manisha Jain",
    summary: "A smart home system to control devices remotely.",
    todoCount: 30,
    progressCount: 4,
    doneCount: 21,
  },
];

export default function YourWork(props) {

  const projects = props.projects;

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-medium text-gray-700 border-b border-gray-400 pb-5'>Your Work</h1>

      <div className='flex flex-wrap '>

      {projects.length !== 0 ? (
      projects.map((project, index) => (
        <Card
          key={index}
          name={project.name}
          owner={project.owner}
          summary={project.projectDescription}
          todoCount={project.toDO.length}         // Replace these with actual data if available
          progressCount={project.inProgress.length}     // Replace these with actual data if available
          doneCount={project.completed.length}         // Replace these with actual data if available
        />
      ))
    ) : (
      <p>No projects found.</p>  // This will render if the projects array is empty
    )}
         </div>
    </div>
  )
}
