import React from 'react';
import './LinkResult.css';

export const LinkResult = ({ link }) => {
  const [qrCode, setQrCode] = React.useState(null);
  const [showOriginalUrl, setShowOriginalUrl] = React.useState(false);

  React.useEffect(() => {
    if (link?.id) {
      fetchQRCode();
    }
  }, [link]);

  const fetchQRCode = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/links/${link.id}/qrcode`);
      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (error) {
      console.error('Failed to fetch QR code:', error);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (!link) return null;

  return (
    <div className="link-result">
      <h3>Link Created Successfully!</h3>

      <div className="result-item">
        <label>
          Original URL: 
          <button 
            className="toggle-btn" 
            onClick={() => setShowOriginalUrl(!showOriginalUrl)}
          >
            {showOriginalUrl ? '▼' : '▶'}
          </button>
        </label>
        {showOriginalUrl && (
          <div className="result-value">
            <span>{link.originalUrl}</span>
            <button onClick={() => copyToClipboard(link.originalUrl)}>Copy</button>
          </div>
        )}
      </div>

      <div className="result-item">
        <label>Short Link:</label>
        <div className="result-value">
          <span className="short-link">{link.shortUrl}</span>
          <button onClick={() => copyToClipboard(link.shortUrl)}>Copy</button>
        </div>
      </div>

      {qrCode && (
        <div className="result-item">
          <label>QR Code:</label>
          <img src={qrCode} alt="QR Code" className="qr-code" />
          <div className="qr-actions">
            <a href={qrCode} download="qr-code.png" className="download-qr">
              Download QR Code
            </a>
            <p className="qr-note">
              💡 When users scan this QR code, clicks will be tracked as "qr" source
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkResult;
