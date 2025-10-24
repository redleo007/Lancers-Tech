import React from 'react'
import ProductBacklog from '../components/backlog/ProductBacklog'
import TaskForm from '../components/tasks/TaskForm'

const BacklogPage: React.FC = () => (
  <div className="page-container">
    <div className="page-header">
      <h2>Backlog</h2>
    </div>
    <div className="dashboard-columns">
      <ProductBacklog />
      <TaskForm />
    </div>
  </div>
)
export default BacklogPage
