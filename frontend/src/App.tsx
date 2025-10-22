import React from 'react'
import { Routes, Route } from 'react-router-dom'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AuthCallbackPage from './components/auth/AuthCallbackPage'
import DashboardPage from './pages/DashboardPage'
import ProjectsPage from './pages/ProjectsPage'
import SprintsPage from './pages/SprintsPage'
import BacklogPage from './pages/BacklogPage'
import Profile from './components/auth/Profile'
import NotFoundPage from './pages/NotFoundPage'
import Notification from './components/common/Notification'
import { NotificationProvider } from './context/NotificationContext'

import MainLayout from './components/layout/MainLayout'
import ErrorBoundary from './components/common/ErrorBoundary'
import PrivateRoute from './components/common/PrivateRoute'
import './App.css'

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <ErrorBoundary>
        <Notification />
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="sprints" element={<SprintsPage />} />
            <Route path="backlog" element={<BacklogPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </NotificationProvider>
  )
}

export default App

/* Example usage in your component */
