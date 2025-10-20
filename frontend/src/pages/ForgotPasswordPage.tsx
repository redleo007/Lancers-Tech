import React, { useState } from 'react';
import axios from 'axios';
import AuthForm from '../components/auth/AuthForm';
import { useNotification } from '../context/NotificationContext';
import { PiEnvelope } from 'react-icons/pi';

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(`${API}/auth/forgot-password`, { email });
      showNotification('If an account with that email exists, a reset link has been sent.', 'success');
    } catch (err: any) {
      showNotification(err?.response?.data?.error || 'Failed to send reset link.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Forgot Password"
      onSubmit={handleForgotPassword}
      submitButtonText="Send Reset Link"
      isLoading={isLoading}
      footerContent={
        <p className="signup-link">
          Remember your password? <a href="/login">Sign In</a>
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
            placeholder="Enter your email"
            required
          />
          <PiEnvelope className="icon" size={20} />
        </div>
      </div>
    </AuthForm>
  );
}