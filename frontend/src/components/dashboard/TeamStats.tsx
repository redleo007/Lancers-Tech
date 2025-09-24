import React from 'react'
import { useProjects } from '../../hooks/useProjects'

const TeamStats: React.FC = () => {
  const { projects } = useProjects()
  const total = projects.length
  const completed = projects.filter(p => p.status === 'Completed').length
  return (
    <div className="card">
      <h3>Team Stats</h3>
      <p>Total projects: <strong>{total}</strong></p>
      <p>Completed: <strong>{completed}</strong></p>
    </div>
  )
}
export default TeamStats
