import React from 'react'
import { useProjects } from '../../hooks/useProjects'

const ProjectOverview: React.FC = () => {
  const { projects } = useProjects()
  return (
    <div className="card">
      <h3>Projects Overview</h3>
      <ul>
        {projects.map(p => <li key={p.id}><strong>{p.name}</strong> — <span className="text-muted">{p.status}</span></li>)}
      </ul>
    </div>
  )
}
export default ProjectOverview
