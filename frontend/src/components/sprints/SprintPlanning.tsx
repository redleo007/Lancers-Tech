// src/components/sprints/SprintPlanning.tsx
import React from 'react'
import { useSprints } from '../../hooks/useSprints'

const SprintPlanning: React.FC = () => {
  const { sprints } = useSprints()
  return (
    <div className="card">
      <h3>Sprint Planning</h3>
      <p>Pick backlog items and move them into sprint during planning.</p>
      <ul>
        {sprints.map((s) => <li key={s.id}>{s.name} — {s.taskIds.length} tasks</li>)}
      </ul>
    </div>
  )
}

export default SprintPlanning
