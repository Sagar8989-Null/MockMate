import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './ChatInterface.css';
import {useSpeech} from "react-text-to-speech"

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const { speak } = useSpeech(); 
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Browser doesn't support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startListening = () => {
    resetTranscript();
    setRecording(true);
    SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
  };

  const getAIResponse = async (transcript) => {
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcript })
      });

      const data = await response.json();
      console.log("AI Response:", data);

      return data.reply || "No response from AI.";
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't reach the AI.";
    }
  };

  const stopListening = async () => {
    SpeechRecognition.stopListening();
    setRecording(false);

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: transcript
    };

    setMessages(prev => [...prev, userMessage]);
    resetTranscript(); // Reset after sending to backend

    // Placeholder for AI response call
    // You should call your backend API here with transcript
    try {
      const aireply = await getAIResponse(transcript);
      console.log("AI REPLY:", aireply); // 🔍 Debugging output

      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aireply
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error setting AI response:", error);
    }

  };

  return (
    <div className="chat-app">
      {/* <div className="chat-header">🎤 AI Chat Assistant</div> */}

      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`chat-message ${msg.role}`}>
            {msg.role=='assistant' && speak({text : msg.content})} {/* this line spell the content deliverd by the assistant*/} 
            <div className="chat-bubble">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-controls">
        <button onClick={startListening} disabled={recording}>Listen</button>
        <button onClick={stopListening} disabled={!recording}>Stop</button>
      </div>
    </div>
  );
};

export default ChatInterface;
