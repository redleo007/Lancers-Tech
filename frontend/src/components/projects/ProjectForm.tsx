import React, { useState } from "react"
import { useProjects } from "../../hooks/useProjects"

const ProjectForm: React.FC = () => {
  const { addProject } = useProjects()
  const [name, setName] = useState("")
  const [status, setStatus] = useState("Planned")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    addProject({ id: Date.now().toString(), name, status })
    setName("")
  }

  return (
    <div className="card">
      <h2>Create Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">Add Project</button>
      </form>
    </div>
  )
}

export default ProjectForm
