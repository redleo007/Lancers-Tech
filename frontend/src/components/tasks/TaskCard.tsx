import React from 'react'
import { Task } from '../../types'

type Props = {
  task: Task
  onMove?: (id: string, status: Task['status']) => void
  onDelete?: (id: string) => void
}

const TaskCard: React.FC<Props> = ({ task, onMove, onDelete }) => {
  return (
    <div className="task-card" draggable onDragStart={(e)=> e.dataTransfer.setData('text/plain', task.id)}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <strong>{task.title}</strong>
        <span className="text-muted">{task.estimate ?? '—'} pts</span>
      </div>
      <p className="text-muted" style={{ marginTop: 6 }}>{task.description}</p>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {task.status !== 'todo' && <button onClick={()=>onMove?.(task.id,'todo')} className="btn">To TODO</button>}
        {task.status !== 'inprogress' && <button onClick={()=>onMove?.(task.id,'inprogress')} className="btn">In Progress</button>}
        {task.status !== 'done' && <button onClick={()=>onMove?.(task.id,'done')} className="btn">Done</button>}
        <button onClick={()=>onDelete?.(task.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  )
}
export default TaskCard
