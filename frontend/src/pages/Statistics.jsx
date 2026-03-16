import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './Statistics.css';

export const Statistics = () => {
  const [stats, setStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [showOriginalUrl, setShowOriginalUrl] = useState(false);

  const handleGetStats = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter a link ID or short code');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Try to fetch stats
      const response = await apiService.getLinkStats(searchQuery);
      setStats(response.data);
      
      // Generate QR code for the short link
      try {
        const qrResponse = await apiService.getQRCode(response.data.id);
        setQrCode(qrResponse.data.qrCode);
      } catch (err) {
        console.log('Could not generate QR code');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Link not found. Try using the link ID or short code from the dashboard.');
      setStats(null);
      setQrCode(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="statistics-page">
      <div className="container">
        <h1>Link Statistics</h1>

        <div className="stats-input">
          <input
            type="text"
            placeholder="Enter Link ID or Short Code (e.g. abc123)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGetStats()}
          />
          <button onClick={handleGetStats} disabled={loading}>
            {loading ? 'Loading...' : 'Get Statistics'}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {stats && (
          <div className="stats-display">
            <div className="stat-card">
              <h3>Short Code</h3>
              <p className="stat-value">{stats.shortCode}</p>
            </div>

            <div className="stat-card">
              <h3>Total Clicks</h3>
              <p className="stat-value">{stats.clickCount}</p>
            </div>

            <div className="stat-card">
              <h3>Status</h3>
              <p className={`stat-value status-${stats.status}`}>{stats.status}</p>
            </div>

            <div className="stat-card">
              <h3>Clicks via QR Code</h3>
              <p className="stat-value">
                {stats.sourceStats && stats.sourceStats.find(s => s.source === 'qr')?.count || 0}
              </p>
            </div>

            {qrCode && (
              <div className="stat-card">
                <h3>QR Code</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                  <img src={qrCode} alt="QR Code" style={{ width: '100%', maxWidth: '200px' }} />
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '12px' }}>
                      QR Link (for statistics):
                    </p>
                    <a 
                      href={`http://localhost:3000/${stats.shortCode}?source=qr`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#007bff',
                        textDecoration: 'none',
                        fontSize: '14px',
                        wordBreak: 'break-all'
                      }}
                      onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                      onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                    >
                      {stats.shortCode}?source=qr
                    </a>
                  </div>
                </div>
              </div>
            )}

            <div className="stat-card">
              <h3>Clicks via Direct Link</h3>
              <p className="stat-value">
                {stats.sourceStats && stats.sourceStats.find(s => s.source === 'direct')?.count || 0}
              </p>
            </div>

            <div className="stat-card full-width">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>Original URL</h3>
                <button
                  onClick={() => setShowOriginalUrl(!showOriginalUrl)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#666',
                    fontSize: '16px',
                    padding: '5px 10px',
                  }}
                  title={showOriginalUrl ? 'Collapse' : 'Expand'}
                >
                  {showOriginalUrl ? '▼' : '▶'}
                </button>
              </div>
              {showOriginalUrl && (
                <p className="stat-value url" style={{ marginTop: '15px' }}>
                  {stats.originalUrl}
                </p>
              )}
            </div>

            <div className="stat-card">
              <h3>Created</h3>
              <p className="stat-value">{new Date(stats.createdAt).toLocaleString()}</p>
            </div>

            {stats.clicksByDate && stats.clicksByDate.length > 0 && (
              <div className="stat-card full-width">
                <h3>Clicks by Date</h3>
                <div className="clicks-table">
                  {stats.clicksByDate.map((click, idx) => (
                    <div key={idx} className="click-row">
                      <span className="date">{click.click_date}</span>
                      <span className="count">{click.total_clicks} clicks ({click.unique_visitors} unique)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
