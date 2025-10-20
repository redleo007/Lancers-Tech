import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scrumLogo = "/scrum-logo.svg";
const googleLogo = "/Google__G__logo.svg.webp";
const appleLogo = "/png-clipart-apple-logo-brand-apple-company-trademark-thumbnail.png";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary mock for demo login
    if (email === "demo@gmail.com" && password === "demopass1234") {
      localStorage.setItem("token", "demo-token");
      navigate("/dashboard");
      return;
    }
    try {
      const res = await axios.post(`${API}/auth/email/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  const startGoogle = () => {
    window.location.href = `${API}/auth/google`;
  };

  const startApple = () => {
    window.location.href = `${API}/auth/apple`;
  };

  return (
    <div className="auth-root">
      <header className="auth-header">
        <img src={scrumLogo} alt="Scrum Manager Logo" className="scrum-logo" />
        <h1 className="scrum-title">Scrum Manager</h1>
      </header>
      <div className="auth-card">
        <h2>Sign In</h2>
        <form onSubmit={handleEmailSignIn} className="auth-form">
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
          <button className="btn btn-primary" type="submit">Sign In with Email</button>
        </form>
        <div className="auth-social">
          <button onClick={startGoogle} className="btn btn-google">
            <img src={googleLogo} alt="" className="social-icon" />
            <div className="btn-text">Sign in with Google</div>
          </button>
          <button onClick={startApple} className="btn btn-apple">
            <img src={appleLogo} alt="" className="social-icon" />
            <div className="btn-text">Sign in with Apple</div>
          </button>
        </div>
        <div className="auth-link">
          <span>New user? <a href="/signup">Sign Up</a></span>
        </div>
      </div>
    </div>
  );
}