import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './AdminPanel.css';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [links, setLinks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLinks, setUserLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'links') {
      loadAllLinks();
    } else if (activeTab === 'user-details' && selectedUser) {
      loadUserDetails(selectedUser.id);
    }
  }, [activeTab]);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getAllUsers(100, 0);
      setUsers(response.data.users);
    } catch (err) {
      setError(err.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const loadAllLinks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getAllLinksAdmin(100, 0);
      setLinks(response.data.links);
    } catch (err) {
      setError(err.message || 'Failed to load links');
    } finally {
      setLoading(false);
    }
  };

  const loadUserDetails = async (userId) => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getUserDetails(userId);
      setSelectedUser(response.data.user);
      setUserLinks(response.data.links);
    } catch (err) {
      setError(err.message || 'Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user and all their links?')) return;
    
    setLoading(true);
    setError('');
    try {
      await apiService.deleteUser(userId);
      setSuccess('User deleted successfully');
      loadUsers();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (linkId) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    
    setLoading(true);
    setError('');
    try {
      await apiService.deleteLink(linkId);
      setSuccess('Link deleted successfully');
      if (activeTab === 'links') {
        loadAllLinks();
      } else if (selectedUser) {
        loadUserDetails(selectedUser.id);
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete link');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLinkStatus = async (linkId, status) => {
    setLoading(true);
    setError('');
    try {
      await apiService.updateLinkStatus(linkId, status);
      setSuccess('Link status updated');
      if (activeTab === 'links') {
        loadAllLinks();
      } else if (selectedUser) {
        loadUserDetails(selectedUser.id);
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update link');
    } finally {
      setLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setActiveTab('user-details');
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users Management
        </button>
        <button 
          className={`tab-button ${activeTab === 'links' ? 'active' : ''}`}
          onClick={() => setActiveTab('links')}
        >
          All Links
        </button>
      </div>

      <div className="admin-content">
        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>All Users ({users.length})</h2>
            {loading && <p>Loading...</p>}
            <div className="users-table-wrapper">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td><span className={`role-badge ${user.role}`}>{user.role}</span></td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="action-btn view-btn"
                          onClick={() => handleUserClick(user)}
                        >
                          View
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Links Management */}
        {activeTab === 'links' && (
          <div className="links-section">
            <h2>All Links ({links.length})</h2>
            {loading && <p>Loading...</p>}
            <div className="links-table-wrapper">
              <table className="links-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Short Code</th>
                    <th>Original URL</th>
                    <th>Clicks</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>User ID</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {links.map(link => (
                    <tr key={link.id}>
                      <td>{link.id}</td>
                      <td><strong>{link.shortCode}</strong></td>
                      <td className="url-cell">{link.originalUrl.substring(0, 40)}...</td>
                      <td>{link.clickCount}</td>
                      <td>
                        <select 
                          value={link.status}
                          onChange={(e) => handleUpdateLinkStatus(link.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="active">Active</option>
                          <option value="blocked">Blocked</option>
                          <option value="inactiv">Inactiv</option>
                        </select>
                      </td>
                      <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                      <td>{link.userId || 'Guest'}</td>
                      <td>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteLink(link.id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* User Details */}
        {activeTab === 'user-details' && selectedUser && (
          <div className="user-details-section">
            <button className="back-btn" onClick={() => setActiveTab('users')}>← Back to Users</button>
            
            <h2>User Details</h2>
            <div className="user-info">
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> <span className={`role-badge ${selectedUser.role}`}>{selectedUser.role}</span></p>
              <p><strong>Created:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              <button 
                className="delete-btn"
                onClick={() => {
                  handleDeleteUser(selectedUser.id);
                  setActiveTab('users');
                }}
              >
                Delete User
              </button>
            </div>

            <h3>User's Links ({userLinks.length})</h3>
            {userLinks.length === 0 ? (
              <p>This user has not created any links yet.</p>
            ) : (
              <div className="links-table-wrapper">
                <table className="links-table">
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
                    {userLinks.map(link => (
                      <tr key={link.id}>
                        <td><strong>{link.shortCode}</strong></td>
                        <td className="url-cell">{link.originalUrl.substring(0, 40)}...</td>
                        <td>{link.clickCount}</td>
                        <td>
                          <select 
                            value={link.status}
                            onChange={(e) => handleUpdateLinkStatus(link.id, e.target.value)}
                            className="status-select"
                          >
                            <option value="active">Active</option>
                            <option value="blocked">Blocked</option>
                            <option value="inactiv">Inactiv</option>
                          </select>
                        </td>
                        <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteLink(link.id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
