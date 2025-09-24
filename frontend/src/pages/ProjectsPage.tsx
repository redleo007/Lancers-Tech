import React from 'react'
import ProjectForm from '../components/projects/ProjectForm'
import ProjectList from '../components/projects/projectslist'

const ProjectsPage: React.FC = () => (
  <div>
    <h1>Projects</h1>
    <div style={{ display:'grid', gridTemplateColumns: '1fr 320px', gap: 12 }}>
      <ProjectList />
      <ProjectForm />
    </div>
  </div>
)
export default ProjectsPage
