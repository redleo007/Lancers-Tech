import React from "react";

  const scrumLogo = "/assets/images/SprintZen.svg";
const googleLogo = "/assets/images/Google__logo.jpg";
const appleLogo = "/assets/images/Apple_logo.jpg";

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  submitButtonText: string;
  footerContent: React.ReactNode;
}

export default function AuthLayout({ title, children, onSubmit, submitButtonText, footerContent }: AuthLayoutProps) {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-form-container">
          <img src={scrumLogo} alt="SprintZen Logo" className="scrum-logo" />
          <h1>{title}</h1>
          <form onSubmit={onSubmit} className="login-form">
            {children}
            <button type="submit" className="btn-signin">{submitButtonText}</button>
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