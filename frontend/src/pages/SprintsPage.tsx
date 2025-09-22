// src/pages/SprintsPage.tsx
import React from 'react'
import SprintBoard from '../components/sprints/SprintBoard'
import SprintPlanning from '../components/sprints/SprintPlanning'

const SprintsPage: React.FC = () => {
  return (
    <div className="content">
      <h1>Sprints</h1>
      <SprintBoard />
      <SprintPlanning />
    </div>
  )
}

export default SprintsPage
