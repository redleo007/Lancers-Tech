import React from 'react'
import { NavLink } from 'react-router-dom'


const Sidebar: React.FC = () => {
return (
<aside className="sidebar">
<ul>
<li><NavLink to="/dashboard">Dashboard</NavLink></li>
<li><NavLink to="/projects">Projects</NavLink></li>
<li><NavLink to="/sprints">Sprints</NavLink></li>
<li><NavLink to="/backlog">Backlog</NavLink></li>
<li><NavLink to="/reports">Reports</NavLink></li>
</ul>
</aside>
)
}


export default Sidebar