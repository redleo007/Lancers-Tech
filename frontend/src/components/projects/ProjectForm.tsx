import React, { useState } from 'react'
import useProjectStore from '../../store/projectStore'


const ProjectForm: React.FC = () => {
const addProject = useProjectStore((s: { addProject: any }) => s.addProject)
const [name, setName] = useState('')
const [description, setDescription] = useState('')


function submit(e: React.FormEvent) {
e.preventDefault()
if (!name) return
addProject({ id: Date.now().toString(), name, description })
setName('')
setDescription('')
}


return (
<form onSubmit={submit} className="card form-inline">
<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Project name" />
<input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
<button type="submit">Add Project</button>
</form>
)
}


export default ProjectForm