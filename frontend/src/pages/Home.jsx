import React, { useState, useEffect } from 'react';
import './Home.css';
import LinkGenerator from '../components/LinkGenerator';
import LinkResult from '../components/LinkResult';

export const Home = () => {
  const [createdLink, setCreatedLink] = useState(null);

  return (
    <div className="home-page">
      <div className="container">
        <header className="hero">
          <h1>Short Link & QR Code Generator</h1>
          <p>Shorten your URLs and generate QR codes instantly</p>
        </header>

        <LinkGenerator onLinkCreated={setCreatedLink} />
        
        {createdLink && <LinkResult link={createdLink} />}
      </div>
    </div>
  );
};

export default Home;
