// src/App.tsx (replace or merge with existing)
import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import SprintsPage from './pages/SprintsPage'
import BacklogPage from './pages/BacklogPage'

const App: React.FC = () => {
  return (
    <div className="app-root">
      <header className="site-header">
        <h1>Scrum Management</h1>
        <nav>
          <NavLink to="/" style={{ marginRight: 12 }}>Dashboard</NavLink>
          <NavLink to="/projects" style={{ marginRight: 12 }}>Projects</NavLink>
          <NavLink to="/sprints" style={{ marginRight: 12 }}>Sprints</NavLink>
          <NavLink to="/backlog">Backlog</NavLink>
        </nav>
      </header>

      <div className="main-grid">
        <aside className="sidebar">
          <ul>
            <li><NavLink to="/dashboard">Dashboard</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/sprints">Sprints</NavLink></li>
            <li><NavLink to="/backlog">Backlog</NavLink></li>
            <li><NavLink to="/reports">Reports</NavLink></li>
          </ul>
        </aside>

        <main className="content">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/sprints" element={<SprintsPage />} />
            <Route path="/backlog" element={<BacklogPage />} />
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </main>
      </div>

      <footer className="site-footer">© {new Date().getFullYear()} Scrum Management</footer>
    </div>
  )
}

export default App
