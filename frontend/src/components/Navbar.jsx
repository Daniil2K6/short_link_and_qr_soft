import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Navbar.css';

function Navbar({ user, onUserUpdate }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    onUserUpdate(null);
    navigate('/');
  };

  const getProfileStatus = () => {
    if (!user) return 'Guest';
    if (user.role === 'admin') return 'Administrator';
    return user.username;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">Short Link & QR</Link>
        
        <div className="nav-profile">
          <span className="profile-label">
            Profile: <strong>{getProfileStatus()}</strong>
          </span>
        </div>

        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          
          {user && user.role !== 'admin' && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/statistics">Statistics</Link></li>
              <li><Link to="/my-links">My Links</Link></li>
            </>
          )}
          
          {user && user.role === 'admin' && (
            <>
              <li><Link to="/admin">Admin Panel</Link></li>
              <li><Link to="/my-links">My Links</Link></li>
            </>
          )}
          
          {user ? (
            <li className="nav-user">
              <span className="username">{user.username}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
