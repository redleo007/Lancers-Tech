import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { PiSignOut, PiUserCircle } from 'react-icons/pi';
import logo from '../../assets/sprintzen-logo.svg';
import logoDark from '../../assets/sprintzen-logo-dark.svg';
import logoLight from '../../assets/sprintzen-logo-light.svg';

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
            <picture>
              <source srcSet={logoDark} media="(prefers-color-scheme: dark)" />
              <source srcSet={logoLight} media="(prefers-color-scheme: light)" />
              <img src={logo} alt="SprintZen Logo" className="header-logo" />
            </picture>
            <h1 className="brand-title">SprintZen</h1>
          </div>
          <nav>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/dashboard">Dashboard</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/projects">Projects</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/sprints">Sprints</NavLink>
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to="/backlog">Backlog</NavLink>
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