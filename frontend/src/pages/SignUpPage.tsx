import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scrumLogo = "/assets/images/Scrum_logo.jpg";
const googleLogo = "/assets/images/Google__logo.jpg";
const appleLogo = "/assets/images/Apple_logo.jpg";
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
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <img src={scrumLogo} alt="Scrum Manager" className="scrum-logo" />
          <h1>Create your Account</h1>
          <form onSubmit={handleSignUp} className="login-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            <button type="submit" className="btn-signin">Sign Up</button>
          </form>
          <div className="divider">
            <span>or continue with</span>
          </div>
          <div className="social-buttons">
            <button className="btn-social btn-google">
              <img src={googleLogo} alt="Google" />
              <span>Google</span>
            </button>
            <button className="btn-social btn-apple">
              <img src={appleLogo} alt="Apple" />
              <span>Apple</span>
            </button>
          </div>
          <p className="signup-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}