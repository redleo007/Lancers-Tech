import React from "react"
import ProjectForm from "../components/projects/ProjectForm"
import ProjectList from "../components/projects/projectslist"

const ProjectsPage: React.FC = () => {
  return (
    <div className="content">
      <h1>Projects</h1>
      <ProjectForm />
      <ProjectList />
    </div>
  )
}

export default ProjectsPage
