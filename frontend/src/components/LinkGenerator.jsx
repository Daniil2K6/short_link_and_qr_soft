import React, { useState } from 'react';
import { apiService } from '../services/api';
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
      const response = await apiService.createLink(inputUrl);
      onLinkCreated(response.data);
      setInputUrl('');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create short link');
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
