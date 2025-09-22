// src/components/sprints/SprintBoard.tsx
import React, { useState } from 'react'
import { useSprints } from '../../hooks/useSprints'
import { useTasks } from '../../hooks/useTasks'
import TaskBoard from '../tasks/TaskBoard'

const SprintBoard: React.FC = () => {
  const { sprints, addSprint, addTaskToSprint, removeTaskFromSprint } = useSprints()
  const { tasks, assignToSprint } = useTasks()
  const [name, setName] = useState('')

  const createSprint = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!name.trim()) return
    const s = { id: Date.now().toString(), name: name.trim(), startDate: undefined, endDate: undefined, goal: '', taskIds: [], status: 'Planned' as const }
    addSprint(s)
    setName('')
  }

  const addTask = (sprintId: string, taskId: string) => {
    addTaskToSprint(sprintId, taskId)
    assignToSprint(taskId, sprintId)
  }

  const removeTask = (sprintId: string, taskId: string) => {
    removeTaskFromSprint(sprintId, taskId)
    assignToSprint(taskId, null)
  }

  return (
    <div>
      <div className="card">
        <h3>Create Sprint</h3>
        <form onSubmit={createSprint} className="form-inline">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sprint name" />
          <button type="submit">Create</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {sprints.map((s) => (
          <div key={s.id} className="card">
            <h3>{s.name} <small style={{ color: '#6b7280' }}>({s.status})</small></h3>
            <p>{s.goal}</p>
            <div style={{ marginBottom: 8 }}>
              <strong>Tasks in sprint:</strong>
              <ul>
                {s.taskIds.map((tid) => {
                  const t = tasks.find((x) => x.id === tid)
                  return t ? (
                    <li key={tid}>
                      {t.title}
                      <button style={{ marginLeft: 8 }} onClick={() => removeTask(s.id, t.id)}>Remove</button>
                    </li>
                  ) : null
                })}
              </ul>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Board</strong>
              <TaskBoard sprintId={s.id} />
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Add existing task to sprint</strong>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {tasks.filter((t) => t.sprintId !== s.id).map((t) => (
                  <button key={t.id} onClick={() => addTask(s.id, t.id)}>{t.title}</button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SprintBoard
