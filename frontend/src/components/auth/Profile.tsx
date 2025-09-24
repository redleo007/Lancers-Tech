import React from 'react'
import { useAuth } from '../../hooks/useAuth'

const Profile: React.FC = () => {
  const { user, logout } = useAuth()
  if (!user) return <div className="card"><p className="text-muted">Not signed in</p></div>
  return (
    <div className="card">
      <h3>Profile</h3>
      <p><strong>{user.name}</strong></p>
      <p className="text-muted">{user.email}</p>
      <button onClick={() => logout()} className="btn btn-danger">Sign out</button>
    </div>
  )
}
export default Profile
