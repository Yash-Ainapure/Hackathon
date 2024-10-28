import React from 'react'
import Card from './Card'
import { FlipWords } from "../components/ui/flip-words";
import { useProject } from './ProjectContext';
const words = ["Your Work", "Our Priority", "Our Management", "Your Success"];



export default function YourWork(props) {

  const projects = props.projects;
  const { setProject } = useProject();
  // className="text-2xl font-medium text-gray-700 border-b border-gray-400"
  return (
    <div className='p-10'>
      <h1 className='pb-5 text-2xl font-medium text-gray-700 border-b border-gray-400'><FlipWords words={words} /> <br /></h1>


      <div className='flex flex-wrap justify-center py-10'>
        {projects.length !== 0 ? (
          projects.map((project, index) => (
            <Card
              key={index}
              project={project}
              name={project.name}
              ownerName={project.ownerName}
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
