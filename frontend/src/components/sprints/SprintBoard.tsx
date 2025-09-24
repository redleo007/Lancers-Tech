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
    addSprint({ id: Date.now().toString(), name: name.trim(), taskIds: [], goal: '', status: 'Planned' })
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
        <form className="form-inline" onSubmit={createSprint}>
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Sprint name" />
          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 12 }}>
        {sprints.map(s => (
          <div key={s.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4>{s.name}</h4>
              <small className="text-muted">{s.status}</small>
            </div>

            <p className="text-muted">{s.goal}</p>

            <div style={{ marginTop: 8 }}>
              <strong>Tasks in sprint</strong>
              <ul>
                {s.taskIds.map(tid => {
                  const t = tasks.find(x=> x.id === tid)
                  return t ? <li key={tid} style={{ display:'flex', justifyContent:'space-between' }}>{t.title}<button onClick={()=>removeTask(s.id, t.id)} className="btn">Remove</button></li> : null
                })}
              </ul>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Board</strong>
              <TaskBoard sprintId={s.id} />
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Add existing task</strong>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                {tasks.filter(t=> t.sprintId !== s.id).map(t => <button key={t.id} className="btn" onClick={()=>addTask(s.id, t.id)}>{t.title}</button>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default SprintBoard
