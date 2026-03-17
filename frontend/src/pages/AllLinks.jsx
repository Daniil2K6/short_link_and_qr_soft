import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './AllLinks.css';

function AllLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    fetchLinks();
  }, [page]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await apiService.getLinks(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
      setLinks(response.data.links);
      setHasMore(response.data.links.length === ITEMS_PER_PAGE);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to fetch links');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="alllinks-page">
      <div className="container">
        <div className="alllinks-header">
          <h1>All Public Links</h1>
          <p>Browse all short links created on this platform</p>
        </div>

        {loading && <p className="loading">Loading links...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && links.length > 0 && (
          <>
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
                        <a 
                          href={link.shortUrl}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <button 
                onClick={handlePrevPage}
                disabled={page === 0}
                className="btn btn-secondary"
              >
                ← Previous
              </button>
              <span className="page-info">Page {page + 1}</span>
              <button 
                onClick={handleNextPage}
                disabled={!hasMore}
                className="btn btn-secondary"
              >
                Next →
              </button>
            </div>
          </>
        )}

        {!loading && links.length === 0 && !error && (
          <p className="empty">No public links available yet.</p>
        )}
      </div>
    </div>
  );
}

export default AllLinks;
