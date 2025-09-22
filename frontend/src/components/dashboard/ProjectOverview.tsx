import React from "react"
import { useProjects } from "../../hooks/useProjects"

const ProjectOverview: React.FC = () => {
  const { projects } = useProjects()

  return (
    <div className="card">
      <h2>Project Overview</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> — {project.status}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectOverview
