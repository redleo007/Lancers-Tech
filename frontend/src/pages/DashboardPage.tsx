import React from 'react'
import ProjectOverview from '../components/dashboard/ProjectOverview'
import TeamStats from '../components/dashboard/TeamStats'

const DashboardPage: React.FC = () => (
  <div className="page-container">
    <div className="page-header">
      <h2>Dashboard</h2>
    </div>
    <div className="dashboard-columns">
      <ProjectOverview />
      <TeamStats />
    </div>
  </div>
)
export default DashboardPage
