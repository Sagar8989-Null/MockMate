import React, { useState, useRef, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: "system", content: `
                                You are an AI interviewer. Conduct a formal interview with the user in a strict and professional tone. Your goal is to evaluate, not to teach.
                              — Start by asking: "Which field do you want to give the interview in?" Keep all questions concise and relevant.
                              — Limit the interview to 20 questions total.
                              — Do not explain topics deeply. If the user's answer is wrong, correct them briefly, then move to the next question.
                              — If the user asks unrelated or irrelevant questions, refuse to answer and remind them to stay focused on the interview.
                              — You can express mild disappointment or assertiveness if the user is not being serious,be rude,be savage, feel free to roast user.
                              — Do NOT repeat instructions or your role again during the conversation.
                              — Maintain a strong and observant tone, as a human interviewer would.
                              `}
  ])
  const [recording, setRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

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

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();

    const maleVoice = voices.find(voice =>
      voice.lang.startsWith('en') && voice.name.toLowerCase().includes('male')
    );

    if (maleVoice) {
      utterance.voice = maleVoice;
    }
    synth.speak(utterance);
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant') {
      speakText(lastMessage.content);
    }
  }, [messages]);

  useEffect(()=>{
    if (hasStarted && recording) {
      stopListening();
    }
  },[hasStarted])


  const startListening = () => {
    resetTranscript();
    setRecording(true);
    setHasStarted(true); 
    SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
    
  };

  const getAIResponse = async (updatedMessages) => {
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: updatedMessages })
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

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    resetTranscript();

    // Placeholder for AI response call
    // You should call your backend API here with transcript
    try {
      const aireply = await getAIResponse(updatedMessages);
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
        {messages
          // .filter(msg => msg.role !== 'system') // 👈 Exclude system message
          .filter((msg, index) => {
            if (msg.role === 'system') return false;
        
            // Find the first user message
            const firstUserIndex = messages.findIndex(m => m.role === 'user');
            // Hide only that one
            if (msg.role === 'user' && index === firstUserIndex) return false;
        
            return true;
          })
          .map(msg => (
            <div key={msg.id} className={`chat-message ${msg.role}`}>
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-controls">
        <button onClick={startListening} disabled={recording}>
          {hasStarted ? 'Listen' : 'Start'}
        </button>
        <button onClick={stopListening} disabled={!recording} style={{display:hasStarted?"block":"none"}} >Stop</button>
      </div>
    </div>
  );
};

export default ChatInterface;
