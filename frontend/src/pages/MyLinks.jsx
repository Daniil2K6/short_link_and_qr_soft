import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';
import authService from '../services/authService';
import ChangePasswordModal from '../components/ChangePasswordModal';
import './MyLinks.css';

function MyLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await apiService.getUserLinks(100, 0);
      setLinks(response.data.links);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (linkId) => {
    if (!window.confirm('Are you sure you want to delete this link?')) {
      return;
    }

    try {
      await apiService.deleteUserLink(linkId);
      setLinks(links.filter(link => link.id !== linkId));
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to delete link');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      authService.logout();
      navigate('/');
    }
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handlePasswordChanged = () => {
    setShowChangePassword(false);
    alert('Password changed successfully!');
  };

  return (
    <div className="mylinks-page">
      <div className="container">
        <div className="mylinks-header">
          <h1>My Links & Profile</h1>
          <p>Welcome, <strong>{user?.username}</strong>!</p>
        </div>

        <div className="profile-actions">
          <button 
            className="btn btn-primary"
            onClick={handleChangePassword}
          >
            🔐 Change Password
          </button>
          <button 
            className="btn btn-danger"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>

        {showChangePassword && (
          <ChangePasswordModal 
            onClose={() => setShowChangePassword(false)}
            onSuccess={handlePasswordChanged}
          />
        )}

        <div className="links-section">
          <h2>Your Short Links ({links.length})</h2>

          {loading && <p className="loading">Loading your links...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && links.length > 0 && (
            <div className="links-table">
              <table>
                <thead>
                  <tr>
                    <th>Short Code</th>
                    <th>Original URL</th>
                    <th>Clicks</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr key={link.id}>
                      <td>
                        <a 
                          href={`http://localhost:3000/${link.shortCode}`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="short-code-link"
                        >
                          {link.shortCode}
                        </a>
                      </td>
                      <td 
                        title={link.originalUrl}
                        className="url-cell"
                      >
                        {link.originalUrl.length > 50 
                          ? link.originalUrl.substring(0, 50) + '...' 
                          : link.originalUrl}
                      </td>
                      <td>{link.clickCount}</td>
                      <td>
                        <span className={`status ${link.status}`}>
                          {link.status}
                        </span>
                      </td>
                      <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                      <td className="actions">
                        <button 
                          className="btn btn-sm btn-info"
                          onClick={() => navigate(`/statistics`)}
                          title="View statistics"
                        >
                          📊
                        </button>
                        <button 
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteLink(link.id)}
                          title="Delete link"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && links.length === 0 && !error && (
            <div className="empty-state">
              <p>No links created yet.</p>
              <p>Go to <strong>Home</strong> to create your first short link!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLinks;
