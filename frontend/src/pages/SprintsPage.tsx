import React from 'react'
import SprintBoard from '../components/sprints/SprintBoard'

const SprintsPage: React.FC = () => (
  <div className="page-container">
    <div className="page-header">
      <h2>Sprints</h2>
    </div>
    <div className="page-content">
      <SprintBoard />
    </div>
  </div>
)
export default SprintsPage
