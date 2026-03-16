import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './Dashboard.css';

export const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await apiService.getUserLinks(50, 0);
      setLinks(response.data.links);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>My Links</h1>

        {loading && <p className="loading">Loading links...</p>}
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
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr key={link.id}>
                    <td>
                      <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                        {link.shortCode}
                      </a>
                    </td>
                    <td title={link.originalUrl}>{link.originalUrl}</td>
                    <td>{link.clickCount}</td>
                    <td>{link.status}</td>
                    <td>{new Date(link.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && links.length === 0 && !error && (
          <p className="empty">No links created yet. Start by creating your first short link!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
