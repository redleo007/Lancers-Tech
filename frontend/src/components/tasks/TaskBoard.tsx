// src/components/tasks/TaskBoard.tsx
import React from 'react'
import { useTasks } from '../../hooks/useTasks'
import TaskCard from './TaskCard'

const columns = [
  { key: 'todo', title: 'To Do' },
  { key: 'inprogress', title: 'In Progress' },
  { key: 'done', title: 'Done' },
] as const

const TaskBoard: React.FC<{ sprintId?: string | null }> = ({ sprintId = null }) => {
  const { tasks, moveTask, assignToSprint, removeTask } = useTasks()

  const filtered = sprintId ? tasks.filter((t) => t.sprintId === sprintId) : tasks

  return (
    <div className="task-board">
      {columns.map((col) => (
        <div key={col.key} className="task-column">
          <h4>{col.title}</h4>
          {filtered.filter((t) => t.status === col.key).map((task) => (
            <TaskCard key={task.id} task={task}
              onMove={(id, status) => moveTask(id, status)}
              onAssignSprint={(id, sId) => assignToSprint(id, sId)}
              onDelete={(id) => removeTask(id)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default TaskBoard
