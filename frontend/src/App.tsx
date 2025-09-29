import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import SprintsPage from './pages/SprintsPage'
import BacklogPage from './pages/BacklogPage'
import Profile from './components/auth/Profile'
import { useAuth } from './hooks/useAuth'
import ErrorBoundary from './components/common/ErrorBoundary'
import PrivateRoute from './components/common/PrivateRoute'
import './App.css'
import './styles/global.css'

const App: React.FC = () => {
  const { user } = useAuth()

  return (
    <ErrorBoundary>
      <div className="app-root">
        <header className="site-header">
          <h1>Scrum Management</h1>
          <nav>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/projects" style={{ marginLeft: 12 }}>Projects</NavLink>
            <NavLink to="/sprints" style={{ marginLeft: 12 }}>Sprints</NavLink>
            <NavLink to="/backlog" style={{ marginLeft: 12 }}>Backlog</NavLink>
            <NavLink to="/profile" style={{ marginLeft: 12 }}>{user ? 'Profile' : 'Login'}</NavLink>
          </nav>
        </header>

        <div className="main-grid">
          <aside className="sidebar">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/sprints">Sprints</NavLink>
            <NavLink to="/backlog">Backlog</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </aside>

          <main className="content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <ProjectsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sprints"
                element={
                  <PrivateRoute>
                    <SprintsPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/backlog"
                element={
                  <PrivateRoute>
                    <BacklogPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </main>
        </div>

        <footer className="site-footer">© {new Date().getFullYear()} Scrum Management</footer>
      </div>
    </ErrorBoundary>
  )
}

export default App
