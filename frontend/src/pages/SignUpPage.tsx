import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useFormValidation } from "../hooks/useFormValidation";
import { useNotification } from "../context/NotificationContext";
import { PiUser, PiEnvelope, PiLock, PiEye, PiEyeSlash } from "react-icons/pi";
import "../styles/Auth.css";

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const { errors, validateField } = useFormValidation();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateField("name", name);
    const isEmailValid = validateField("email", email);
    const isPasswordValid = validateField("password", password);
    const isConfirmPasswordValid = validateField("confirmPassword", confirmPassword) && password === confirmPassword;

    if (password !== confirmPassword) {
      showNotification("Passwords do not match.", "error");
    }

    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`${API}/auth/email/signup`, { name, email, password });
      showNotification(res.data.message || "Registration successful! Please sign in.", "success");
      navigate("/signin");
    } catch (err: any) {
      showNotification(err?.response?.data?.error || "Signup failed", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <AuthForm
        title="Create your Account"
        isLoading={isLoading}
        onSubmit={handleSignUp}
        submitButtonText="Sign Up"
        footerContent={
          <p className="signup-link">
            Already have an account? <a href="/signin">Sign in</a>
          </p>
        }
      >
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="Enter your full name"
              className={errors.name ? "error" : ""}
              required
            />
            <PiUser className="icon" size={20} />
          </div>
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
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
          <div className="input-with-icon">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="Create a password"
              className={errors.password ? "error" : ""}
              required
            />
            <div className="icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <PiEyeSlash size={20} /> : <PiEye size={20} />}
            </div>
          </div>
          {errors.password && <p className="error-message">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <div className="input-with-icon">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "error" : ""}
              required
            />
            <div className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <PiEyeSlash size={20} /> : <PiEye size={20} />}
            </div>
          </div>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
        </div>
      </AuthForm>
    </div>
  );
}