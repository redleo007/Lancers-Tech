// src/components/tasks/TaskForm.tsx
import React, { useState } from 'react'
import { useTasks } from '../../hooks/useTasks'

const TaskForm: React.FC<{ projectId?: string; sprintId?: string | null }> = ({ projectId, sprintId = null }) => {
  const { addTask } = useTasks()
  const [title, setTitle] = useState('')
  const [estimate, setEstimate] = useState<number | ''>('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    const t = {
      id: Date.now().toString(),
      title: title.trim(),
      description: '',
      status: 'todo' as const,
      projectId,
      sprintId,
      estimate: estimate === '' ? undefined : Number(estimate),
    }
    addTask(t)
    setTitle('')
    setEstimate('')
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>Create task</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
      <input value={estimate} onChange={(e) => setEstimate(e.target.value ? Number(e.target.value) : '')} placeholder="Estimate (pts)" />
      <button type="submit">Add Task</button>
    </form>
  )
}

export default TaskForm
