import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PiSignOut, PiUserCircle } from 'react-icons/pi';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-root">
      {user && (
        <header className="site-header">
          <div className="header-brand">
            <img src="/assets/images/SprintZen.jpg" alt="SprintZen Logo" className="header-logo" />
            <h1>SprintZen</h1>
          </div>
          <nav>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/sprints">Sprints</NavLink>
            <NavLink to="/backlog">Backlog</NavLink>
          </nav>
          <div className="profile-menu">
            <div onClick={() => setProfileOpen(!isProfileOpen)} className="profile-trigger">
              <PiUserCircle size={24} />
            </div>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <NavLink to="/profile" onClick={() => setProfileOpen(false)}>Profile</NavLink>
                <button onClick={handleLogout}>
                  <PiSignOut />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
      )}

      <div className="main-grid">
        <main className="content">
          <Outlet />
        </main>
      </div>

      {user && (
        <footer className="site-footer">© {new Date().getFullYear()} SprintZen Management</footer>
      )}
    </div>
  );
}