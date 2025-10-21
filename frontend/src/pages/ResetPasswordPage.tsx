import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { useNotification } from '../context/NotificationContext';

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      showNotification('Password must be at least 6 characters.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showNotification('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(`${API}/auth/reset-password`, { token, password });
      showNotification('Password has been reset successfully. Please sign in.', 'success');
      navigate('/login');
    } catch (err: any) {
      showNotification(err?.response?.data?.error || 'Failed to reset password.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Reset Password"
      isLoading={isLoading}
      onSubmit={handleResetPassword}
      submitButtonText="Reset Password"
      footerContent={
        <p className="signup-link">
          Remember your password? <a href="/login">Sign In</a>
        </p>
      }
    >
      <div className="form-group">
        <label>New Password</label>
        <div className="input-with-icon">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            required
          />
          <div className="icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <PiEyeSlash size={20} /> : <PiEye size={20} />}
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Confirm New Password</label>
        <div className="input-with-icon">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your new password"
            required
          />
          <div className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <PiEyeSlash size={20} /> : <PiEye size={20} />}
          </div>
        </div>
      </div>
    </AuthForm>
  );
}