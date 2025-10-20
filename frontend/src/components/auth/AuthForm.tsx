import React from "react";

const googleLogo = "/assets/images/Google__logo.jpg";
const appleLogo = "/assets/images/Apple_logo.jpg";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitButtonText: string;
  footerContent: React.ReactNode;
  isLoading: boolean;
}

export default function AuthForm({ title, children, onSubmit, submitButtonText, footerContent, isLoading }: AuthLayoutProps) {
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
            <button className="btn-social btn-google">
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