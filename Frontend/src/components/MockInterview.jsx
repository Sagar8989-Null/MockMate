import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MockInterview.css';
import ChatInterface from './ChatInterface';

const MockInterview = () => {

  return (
    <div className="mock-interview">
      <header className="interview-header">
        <div className="container">
          <nav className="nav">
            <Link to="/" className="logo">
              <h3>MOCKMATE</h3>
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </nav>
        </div>
      </header>
      <div className="SCcontainer">
        <div className="cardcontainer">
          <div className='personalitycard'><div className="circle"><img src="/Gemini_Generated_Image_r39344r39344r393.png" alt="AI image" /></div></div>
          <div className='personalitycard'><div className="circle"></div></div>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default MockInterview;