import React from 'react';
import Card from './Card';
import { FlipWords } from "../components/ui/flip-words";
import { useProject } from './ProjectContext';

const yourWorkWords = ["Your Projects", "Managed by You", "Your Creations"];
const sharedWorkWords = ["Shared Projects", "Collaborations", "Projects with You"];

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

  return (
    <div className='px-10'>
      <div className='py-10'>
        {/* Your Projects Section */}
        <h2 className='pb-5 text-2xl font-medium text-gray-700 border-b border-gray-400'>
          <FlipWords words={yourWorkWords} />
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
        <h2 className='pb-5 text-2xl font-medium text-gray-700 border-b border-gray-400'>
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
