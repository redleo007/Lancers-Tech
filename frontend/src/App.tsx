import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import SprintsPage from './pages/SprintsPage'
import BacklogPage from './pages/BacklogPage'
import Profile from './components/auth/Profile'
import Notification from './components/common/Notification'
import { NotificationProvider } from './context/NotificationContext'
import { useAuth } from './hooks/useAuth'
import ErrorBoundary from './components/common/ErrorBoundary'
import PrivateRoute from './components/common/PrivateRoute'
import './App.css'
import './styles/global.css'

const App: React.FC = () => {
  const { user } = useAuth()

  return (
    <NotificationProvider>
      <ErrorBoundary>
        <div className="app-root">
          <Notification />
          {user && (
            <header className="site-header">
              <div className="header-brand">
                <img src="/assets/images/SprintZen.jpg" alt="Scrum Manager" className="header-logo" />
              </div>
              <nav>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/projects" style={{ marginLeft: 12 }}>Projects</NavLink>
                <NavLink to="/sprints" style={{ marginLeft: 12 }}>Sprints</NavLink>
                <NavLink to="/backlog" style={{ marginLeft: 12 }}>Backlog</NavLink>
                <NavLink to="/profile" style={{ marginLeft: 12 }}>Profile</NavLink>
              </nav>
            </header>
          )}
  
          <div className="main-grid">
            {user && (
              <aside className="sidebar">
                <div className="sidebar-brand">
                  <img src="/SM-logo.png" alt="Scrum Manager" className="sidebar-logo" />
                </div>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/sprints">Sprints</NavLink>
                <NavLink to="/backlog">Backlog</NavLink>
                <NavLink to="/profile">Profile</NavLink>
              </aside>
            )}
  
            <main className="content">
              <Routes>
                <Route path="/login" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
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
  
          {user && (
            <footer className="site-footer">© {new Date().getFullYear()} Scrum Management</footer>
          )}
        </div>
      </ErrorBoundary>
    </NotificationProvider>
  )
}

export default App

/* Example usage in your component */
