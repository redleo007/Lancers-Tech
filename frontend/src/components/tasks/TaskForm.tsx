import React, { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'

const TaskForm: React.FC<{ projectId?: string; sprintId?: string | null }> = ({ projectId, sprintId = null }) => {
  const { addTask } = useTasks()
  const [title, setTitle] = useState('')
  const [estimate, setEstimate] = useState<number | ''>('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ id: Date.now().toString(), title: title.trim(), description: '', status: 'todo', projectId: projectId ?? null, sprintId, estimate: estimate === '' ? undefined : Number(estimate) })
    setTitle(''); setEstimate('')
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>Create Task</h3>
      <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Task title" />
      <input value={estimate.toString()} onChange={(e)=>setEstimate(e.target.value ? Number(e.target.value) : '')} placeholder="Estimate (pts)" />
      <button className="btn btn-primary" type="submit">Add Task</button>
    </form>
  )
}
export default TaskForm
