import React, { useState } from 'react'
import { useProjects } from '../../hooks/useProjects'

const ProjectForm: React.FC = () => {
  const { addProject } = useProjects()
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    addProject({ id: Date.now().toString(), name: name.trim(), description: desc, status: 'Planned' })
    setName(''); setDesc('')
  }

  return (
    <form onSubmit={submit} className="card">
      <h3>Create Project</h3>
      <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Project name" />
      <input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Short description" />
      <button className="btn btn-primary" type="submit">Add Project</button>
    </form>
  )
}
export default ProjectForm
