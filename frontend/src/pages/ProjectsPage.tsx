import React from 'react'
import ProjectForm from '../components/projects/ProjectForm'
import ProjectList from '../components/projects/projectslist'

const ProjectsPage: React.FC = () => (
  <div className="page-container">
    <div className="page-header">
      <h2>Projects</h2>
    </div>
    <div className="dashboard-columns">
      <ProjectList />
      <ProjectForm />
    </div>
  </div>
)
export default ProjectsPage
