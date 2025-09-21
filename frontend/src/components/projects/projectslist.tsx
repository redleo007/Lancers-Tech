import React from 'react'
import useProjectStore from '../../store/projectStore'


const ProjectList: React.FC = () => {
const projects = useProjectStore((s: { projects: any }) => s.projects)


return (
<div className="card">
<h3>Projects</h3>
<ul>
{projects.map((p: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => (
<li key={p.id}>
<strong>{p.name}</strong> — {p.description}
</li>
))}
</ul>
</div>
)
}


export default ProjectList