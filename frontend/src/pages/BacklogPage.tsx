// src/pages/BacklogPage.tsx
import React from 'react'
import ProductBacklog from '../components/backlog/ProductBacklog'
import TaskForm from '../components/tasks/TaskForm'

const BacklogPage: React.FC = () => {
  return (
    <div className="content">
      <h1>Backlog</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 12 }}>
        <ProductBacklog />
        <div>
          <TaskForm />
        </div>
      </div>
    </div>
  )
}

export default BacklogPage
