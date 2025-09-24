import React from 'react'
import { useProjects } from '../../hooks/useProjects'

const ProjectList: React.FC = () => {
  const { projects, removeProject } = useProjects()
  return (
    <div className="card">
      <h3>Projects</h3>
      <ul>
        {projects.map((p) => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <div>
              <strong>{p.name}</strong><div className="text-muted">{p.description}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => removeProject(p.id)} className="btn btn-danger">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ProjectList
