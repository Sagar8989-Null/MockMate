import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MockInterview.css';
import ChatInterface from './ChatInterface';

const MockInterview = () => {
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);

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
          <div className={`personalitycard${isAISpeaking ? ' speaking' : ''}`}><div className="circle"><img src="/MockMate/Gemini_Generated_Image_r39344r39344r393.png" alt="AI image" /></div></div>
          <div className={`personalitycard${isUserSpeaking ? ' speaking' : ''}`}><div className="circle"><div className="face"></div><div className="body"></div></div></div>
        </div>
        <ChatInterface isUserSpeaking={isUserSpeaking} setIsUserSpeaking={setIsUserSpeaking} isAISpeaking={isAISpeaking} setIsAISpeaking={setIsAISpeaking} />
      </div>
    </div>
  );
};

export default MockInterview;