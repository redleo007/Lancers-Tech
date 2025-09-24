import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const Login: React.FC = () => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    login({ id: Date.now().toString(), name, email })
  }

  return (
    <div className="card" style={{ maxWidth: 520 }}>
      <h2>Sign in (demo)</h2>
      <form onSubmit={submit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
    </div>
  )
}
export default Login
