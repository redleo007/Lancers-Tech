import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ApiErrorResponse } from '../types/errors';
import AuthForm from "../components/auth/AuthForm";
import { PiEnvelope, PiEye, PiEyeSlash } from "react-icons/pi";

import { useFormValidation } from "../hooks/useFormValidation";
import "../styles/Auth.css";
import { useNotification } from "../context/NotificationContext";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// Demo credentials for temporary login
const DEMO_EMAIL = 'demo@sprintzen.com';
const DEMO_PASSWORD = 'Naveeth@123';

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { errors, validateField } = useFormValidation();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);

    if (!isEmailValid || !isPasswordValid) return;

    setIsLoading(true);

    // --- Temporary Demo Login ---
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setTimeout(() => {
        // A dummy JWT token with a payload: { "name": "Demo User", "email": "demo@sprintzen.com" }
        const demoToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVtbyBVc2VyIiwiZW1haWwiOiJkZW1vQHNwcmludHplbi5jb20ifQ.dummy_signature';
        localStorage.setItem('token', demoToken);
        setIsLoading(false);
        showNotification("Successfully logged in as Demo User!", "success");
        navigate('/dashboard');
      }, 1000);
      return;
    } else {
      // --- End Temporary Demo Login ---
      try {
        const res = await axios.post(`${API}/auth/email/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } catch (error) {
        const err = error as ApiErrorResponse;
        showNotification(err?.response?.data?.error || "Login failed", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <AuthForm
        title="Sign in to your Account"
        isLoading={isLoading}
        onSubmit={handleEmailSignIn}
        submitButtonText="Sign In"
        footerContent={
          <p className="signup-link">
            Not registered yet? <Link to="/signup">Create an account</Link>
          </p>
        }
      >
        <div className="form-group">
          <label>Email</label>
          <div className="input-with-icon">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
              required
            />
            <PiEnvelope className="icon" size={20} />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <div className="input-with-icon">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => validateField(e.target.name, e.target.value)}
                placeholder="Enter your password"
                className={errors.password ? "error" : ""}
                required
              />
              <div className="icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <PiEyeSlash size={20} /> : <PiEye size={20} />}
              </div>
            </div>
            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
      </AuthForm>
    </div>
  );
}