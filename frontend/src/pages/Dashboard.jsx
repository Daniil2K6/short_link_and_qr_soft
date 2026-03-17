import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './Dashboard.css';

export const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    filterLinks();
  }, [searchTerm, links]);

  const filterLinks = () => {
    const term = searchTerm.toLowerCase();
    if (!term) {
      setFilteredLinks(links);
      return;
    }

    const filtered = links.filter((link) => {
      const id = link.id.toString();
      const shortCode = link.shortCode.toLowerCase();
      const originalUrl = link.originalUrl.toLowerCase();
      const status = link.status.toLowerCase();
      const clickCount = link.clickCount.toString();
      const createdDate = new Date(link.createdAt).toLocaleDateString().toLowerCase();

      return (
        id.includes(term) ||
        shortCode.includes(term) ||
        originalUrl.includes(term) ||
        status.includes(term) ||
        clickCount.includes(term) ||
        createdDate.includes(term)
      );
    });

    setFilteredLinks(filtered);
  };

  const fetchLinks = async () => {
    try {
      const response = await apiService.getUserLinks(50, 0);
      setLinks(response.data.links);
      setFilteredLinks(response.data.links);
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
          <>
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search by ID, short code, URL, status, clicks, or date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <p className="search-results">
                  Found {filteredLinks.length} of {links.length} links
                </p>
              )}
            </div>

            {filteredLinks.length > 0 ? (
              <div className="links-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Short Code</th>
                      <th>Original URL</th>
                      <th>Clicks</th>
                      <th>Status</th>
                      <th>Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLinks.map((link) => (
                      <tr key={link.id}>
                        <td>{link.id}</td>
                        <td>
                          <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="short-code">
                            {link.shortCode}
                          </a>
                        </td>
                        <td title={link.originalUrl} className="url-cell">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="empty">No links match your search.</p>
            )}
          </>
        )}

        {!loading && links.length === 0 && !error && (
          <p className="empty">No links created yet. Start by creating your first short link!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
