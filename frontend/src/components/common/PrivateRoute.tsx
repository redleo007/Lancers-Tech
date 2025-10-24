import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { User } from '../../types/auth'

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, login } = useAuth()
  const location = useLocation()

  useEffect(() => {
    // If there's no user but there is a token, try to restore the session
    const token = localStorage.getItem('token')
    if (!user && token) {
      // Parse the JWT token to get user info
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const user: User = {
          id: 'demo-user',
          name: payload.name || 'Demo User',
          email: payload.email || 'demo@sprintzen.com'
        };
        login(user)
      } catch (error) {
        console.error('Failed to restore session:', error)
        localStorage.removeItem('token')
      }
    }
  }, [user, login])

  if (!user && !localStorage.getItem('token')) {
    // Save the attempted URL
    localStorage.setItem('postLoginRedirect', location.pathname)
    return <Navigate to="/login" replace />
  }
  
  return children
}