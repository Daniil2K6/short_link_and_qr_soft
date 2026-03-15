import React, { useState, useEffect } from 'react';
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
      const response = await fetch('http://localhost:3000/api/links?limit=50');
      if (!response.ok) throw new Error('Failed to fetch links');
      const data = await response.json();
      setLinks(data.links);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Dashboard</h1>

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
