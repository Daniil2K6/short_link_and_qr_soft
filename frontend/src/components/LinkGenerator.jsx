import React, { useState } from 'react';
import './LinkGenerator.css';

export const LinkGenerator = ({ onLinkCreated }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateLink = async () => {
    if (!inputUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: inputUrl })
      });

      if (!response.ok) {
        throw new Error('Failed to create short link');
      }

      const data = await response.json();
      onLinkCreated(data);
      setInputUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="link-generator">
      <h2>Create Short Link</h2>
      <input
        type="text"
        placeholder="Enter your long URL here..."
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleCreateLink()}
        className="input-url"
      />
      <button onClick={handleCreateLink} disabled={loading}>
        {loading ? 'Creating...' : 'Generate Short Link'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LinkGenerator;
