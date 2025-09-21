import React from 'react'
import ProjectList from '../components/projects/projectslist'
import ProjectForm from '../components/projects/ProjectForm'


const ProjectsPage: React.FC = () => {
return (
<div>
<h2>Projects</h2>
<ProjectForm />
<ProjectList />
</div>
)
}


export default ProjectsPage