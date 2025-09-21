import React from 'react'
import ProjectOverview from '../components/dashboard/ProjectOverview'
import TeamStats from '../components/dashboard/TeamStats'


const DashboardPage: React.FC = () => {
return (
<div>
<h2>Dashboard</h2>
<div className="grid-2">
<ProjectOverview />
<TeamStats />
</div>
</div>
)
}


export default DashboardPage