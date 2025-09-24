// frontend/src/pages/LoginPage.tsx
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'

const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // if redirected with token param, set and navigate to dashboard
  React.useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      localStorage.setItem('token', token)
      navigate('/dashboard')
    }
  }, [])

  const startGoogle = () => {
    window.location.href = `${API}/auth/google`
  }

  const startApple = () => {
    window.location.href = `${API}/auth/apple`
  }

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/auth/phone/request-otp`, { phone })
      setOtpSent(true)
      alert('OTP sent to phone')
    } catch (err: any) {
      alert(err?.response?.data?.error || 'Failed to send OTP')
    }
  }

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const r = await axios.post(`${API}/auth/phone/verify-otp`, { phone, otp })
      const token = r.data.token
      if (token) {
        localStorage.setItem('token', token)
        navigate('/dashboard')
      } else {
        alert('No token returned')
      }
    } catch (err: any) {
      alert(err?.response?.data?.error || 'OTP verification failed')
    }
  }

  return (
    <div style={{ maxWidth: 820, margin: '48px auto', display: 'grid', gap: 16 }}>
      <div className="card">
        <h2>Sign in</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={startGoogle} className="btn btn-primary">Sign in with Google</button>
          <button onClick={startApple} className="btn">Sign in with Apple</button>
        </div>
        <hr />
        <form onSubmit={otpSent ? verifyOtp : requestOtp} style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+1555..." />
          {!otpSent ? <button className="btn btn-primary" type="submit">Send OTP</button> : (
            <>
              <input value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
              <button className="btn btn-primary" type="submit">Verify OTP</button>
            </>
          )}
        </form>
      </div>
      <div className="card text-muted">
        <p>Demo login: Google/Apple require app credentials. Phone login uses Twilio to send SMS (configure .env).</p>
      </div>
    </div>
  )
}
