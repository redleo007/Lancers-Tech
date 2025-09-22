import React from "react"
import { useProjects } from "../../hooks/useProjects"

const TeamStats: React.FC = () => {
  const { projects } = useProjects()
  const totalProjects = projects.length
  const completed = projects.filter((p) => p.status === "Completed").length
  const inProgress = projects.filter((p) => p.status === "In Progress").length

  return (
    <div className="card">
      <h2>Team Stats</h2>
      <p>Total Projects: {totalProjects}</p>
      <p>Completed: {completed}</p>
      <p>In Progress: {inProgress}</p>
    </div>
  )
}

export default TeamStats
