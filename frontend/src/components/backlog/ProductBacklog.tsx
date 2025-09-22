// src/components/backlog/ProductBacklog.tsx
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
    const id = Date.now().toString()
    addItem({ id, title: title.trim(), description: '', priority: items.length + 1 })
    setTitle('')
  }

  const pushToTasks = (itemId: string) => {
    const item = items.find((i) => i.id === itemId)
    if (!item) return
    const task = { id: 't' + Date.now().toString(), title: item.title, description: item.description, status: 'todo' as const, projectId: item.projectId, sprintId: null, estimate: undefined }
    addTask(task)
    removeItem(itemId)
  }

  return (
    <div className="card">
      <h3>Product Backlog</h3>
      <form onSubmit={create} className="form-inline">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Backlog item title" />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 12 }}>
        {items.sort((a,b)=> (a.priority ?? 0) - (b.priority ?? 0)).map((it) => (
          <li key={it.id} style={{ marginBottom: 8 }}>
            <strong>{it.title}</strong> <small style={{ color: '#6b7280' }}>#{it.priority}</small>
            <div style={{ marginTop: 6 }}>
              <button onClick={() => prioritize(it.id, (it.priority ?? 1) - 1)}>Move Up</button>
              <button onClick={() => prioritize(it.id, (it.priority ?? 1) + 1)}>Move Down</button>
              <button onClick={() => pushToTasks(it.id)} style={{ marginLeft: 8 }}>Push to Tasks</button>
              <button onClick={() => removeItem(it.id)} style={{ marginLeft: 8, background: '#ef4444' }}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductBacklog
