import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scrumLogo = "/scrum-logo.svg";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/email/signup`, { name, email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="auth-root">
      <header className="auth-header">
        <img src={scrumLogo} alt="Scrum Manager Logo" className="scrum-logo" />
        <h1 className="scrum-title">Scrum Manager</h1>
      </header>
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} className="auth-form">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </form>
        <div className="auth-link">
          <span>Already have an account? <a href="/login">Sign In</a></span>
        </div>
      </div>
    </div>
  );
}