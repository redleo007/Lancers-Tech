import React, { useState } from 'react'
import { useBacklog } from '../../hooks/useBacklog'
import { useTasks } from '../../hooks/useTasks'

const ProductBacklog: React.FC = () => {
  const { items, addItem, prioritize, removeItem } = useBacklog()
  const { addTask } = useTasks()
  const [title, setTitle] = useState('')

  const create = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addItem({ id: Date.now().toString(), title: title.trim(), priority: items.length + 1, description: '' })
    setTitle('')
  }

  const pushToTasks = (itemId: string) => {
    const item = items.find(i => i.id === itemId)
    if (!item) return
    addTask({ id: Date.now().toString(), title: item.title, description: item.description, status: 'todo', projectId: item.projectId ?? null, sprintId: null })
    removeItem(itemId)
  }

  return (
    <div className="card">
      <h3>Product Backlog</h3>
      <form onSubmit={create} className="form-inline">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Backlog item title" />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 12 }}>
        {items.sort((a,b)=> (a.priority ?? 0) - (b.priority ?? 0)).map(it => (
          <li key={it.id} style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent:'space-between' }}>
              <div>
                <strong>{it.title}</strong><div className="text-muted">#{it.priority}</div>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={()=>prioritize(it.id, (it.priority ?? 1) - 1)} className="btn">Up</button>
                <button onClick={()=>prioritize(it.id, (it.priority ?? 1) + 1)} className="btn">Down</button>
                <button onClick={()=>pushToTasks(it.id)} className="btn btn-accent">Push</button>
                <button onClick={()=>removeItem(it.id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ProductBacklog
