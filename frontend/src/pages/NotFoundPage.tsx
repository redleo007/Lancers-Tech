import React from 'react';
import { Link } from 'react-router-dom';
import { PiSmileySad } from 'react-icons/pi';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <PiSmileySad size={64} className="not-found-icon" />
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
      </div>
    </div>
  );
}