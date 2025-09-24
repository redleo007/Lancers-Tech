import React from 'react'
import ProjectOverview from '../components/dashboard/ProjectOverview'
import TeamStats from '../components/dashboard/TeamStats'

const DashboardPage: React.FC = () => (
  <div>
    <h1>Dashboard</h1>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 12 }}>
      <ProjectOverview />
      <TeamStats />
    </div>
  </div>
)
export default DashboardPage
