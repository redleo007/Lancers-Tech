// src/components/tasks/TaskCard.tsx
import React from 'react'
import { Task } from '../../types'

type Props = {
  task: Task
  onMove?: (id: string, status: Task['status']) => void
  onAssignSprint?: (id: string, sprintId: string | null) => void
  onDelete?: (id: string) => void
}

const TaskCard: React.FC<Props> = ({ task, onMove, onAssignSprint, onDelete }) => {
  return (
    <div className="task-card" title={task.description}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong>{task.title}</strong>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{task.estimate ?? '—'} pts</span>
      </div>
      <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
        {task.status !== 'todo' && <button onClick={() => onMove?.(task.id, 'todo')}>To TODO</button>}
        {task.status !== 'inprogress' && <button onClick={() => onMove?.(task.id, 'inprogress')}>To InProgress</button>}
        {task.status !== 'done' && <button onClick={() => onMove?.(task.id, 'done')}>To Done</button>}
      </div>
      <div style={{ marginTop: 6, display: 'flex', gap: 6 }}>
        <button onClick={() => onAssignSprint?.(task.id, null)}>Unassign Sprint</button>
        <button onClick={() => onDelete?.(task.id)} style={{ background: '#ef4444' }}>Delete</button>
      </div>
    </div>
  )
}

export default TaskCard
