import React from 'react'
import { useTasks } from '../../hooks/useTasks'
import TaskCard from './TaskCard'
import { TaskStatus } from '../../types'

const columns: { key: TaskStatus; title: string }[] = [
  { key: 'todo', title: 'To Do' },
  { key: 'inprogress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
]

const TaskBoard: React.FC<{ sprintId?: string | null }> = ({ sprintId = null }) => {
  const { tasks, moveTask, removeTask } = useTasks()
  const filtered = sprintId ? tasks.filter((t)=> t.sprintId === sprintId) : tasks

  const onDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault()
    const id = e.dataTransfer.getData('text/plain')
    if (id) moveTask(id, status)
  }

  return (
    <div className="task-board">
      {columns.map(col => (
        <div key={col.key} className="task-column" onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>onDrop(e,col.key)}>
          <h4>{col.title}</h4>
          {filtered.filter(t=> t.status === col.key).map(task => (
            <TaskCard key={task.id} task={task} onMove={(id,status)=>moveTask(id,status)} onDelete={(id)=>removeTask(id)} />
          ))}
        </div>
      ))}
    </div>
  )
}
export default TaskBoard
