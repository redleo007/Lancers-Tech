import React from "react"
import { useProjects } from "../../hooks/useProjects"

const ProjectList: React.FC = () => {
  const { projects, removeProject } = useProjects()

  return (
    <div className="card">
      <h2>All Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id} style={{ marginBottom: "0.5rem" }}>
            {p.name} — {p.status}
            <button
              style={{ marginLeft: "1rem" }}
              onClick={() => removeProject(p.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectList
