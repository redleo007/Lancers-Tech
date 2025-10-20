import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const scrumLogo = "/assets/images/Scrum_logo.jpg";
const googleLogo = "/assets/images/Google__logo.jpg";
const appleLogo = "/assets/images/Apple_logo.jpg";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/email/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <img src={scrumLogo} alt="Scrum Manager" className="scrum-logo" />
          <h1>Sign in to your Account</h1>
          <form onSubmit={handleEmailSignIn} className="login-form">
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
              <div className="password-input">
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <a href="/forgot-password" className="forgot-link">Forgot password?</a>
              </div>
            </div>
            <button type="submit" className="btn-signin">Sign In</button>
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
            Not registered yet? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
}