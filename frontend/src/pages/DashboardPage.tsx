import React from "react"
import ProjectOverview from "../components/dashboard/ProjectOverview"
import TeamStats from "../components/dashboard/TeamStats"

const DashboardPage: React.FC = () => {
  return (
    <div className="content">
      <h1>Dashboard</h1>
      <ProjectOverview />
      <TeamStats />
    </div>
  )
}

export default DashboardPage
