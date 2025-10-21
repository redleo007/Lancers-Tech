import React from "react";
import { useNavigate } from "react-router-dom";

const googleLogo = "/assets/images/Google__logo.jpg";
const appleLogo = "/assets/images/Apple_logo.jpg";
const API = import.meta.env.VITE_API_BASE || "http://localhost:4000";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  footerContent: React.ReactNode;
  isLoading: boolean;
}

export default function AuthForm({ title, children, onSubmit, submitButtonText, footerContent, isLoading }: AuthLayoutProps) {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    const googleLoginURL = `${API}/auth/google`;
    const newWindow = window.open(googleLoginURL, "_blank", "width=500,height=600");

    const checkWindow = setInterval(() => {
      if (newWindow && newWindow.closed) {
        clearInterval(checkWindow);
        // Potentially refresh user state or navigate, assuming backend sets a cookie
        // For now, we'll just navigate to the dashboard as a simple example
        // A more robust solution would use a message event or check auth state
        window.location.href = "/dashboard";
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <img src="/assets/images/SprintZen.jpg" alt="SprintZen Logo" className="scrum-logo" />
          <h1>{title}</h1>
          <form onSubmit={onSubmit} className="login-form">
            {children}
            <button type="submit" className="btn-signin" disabled={isLoading}>
              {isLoading ? (
                <><div className="spinner"></div>Submitting...</>
              ) : (
                submitButtonText
              )}
            </button>
          </form>
          <div className="divider">
            <span>or continue with</span>
          </div>
          <div className="social-buttons">
            <button className="btn-social btn-google" onClick={handleGoogleSignIn}>
              <img src={googleLogo} alt="Google" />
              <span>Google</span>
            </button>
            <button className="btn-social btn-apple">
              <img src={appleLogo} alt="Apple" />
              <span>Apple</span>
            </button>
          </div>
          {footerContent}
        </div>
      </div>
    </div>
  );
}