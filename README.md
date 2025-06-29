# MockMate 🎤

A comprehensive mock interview platform that helps students practice and improve their interview skills through AI-powered conversations. MockMate provides a realistic interview experience with voice recognition, text-to-speech capabilities, and intelligent AI responses.

### This Page is live at https://sagar8989-null.github.io/MockMate/ But the Backend server is not hosted for some internal reasons but you run it locally 

## 🚀 Features

- **Voice-Based Interaction**: Practice interviews using speech recognition and text-to-speech
- **AI-Powered Interviewer**: Intelligent responses from an AI interviewer that adapts to your answers
- **Real-time Communication**: Seamless voice-to-text and text-to-voice conversion
- **Modern UI/UX**: Clean, responsive design with intuitive navigation
- **Multiple Interview Types**: Support for technical and behavioral questions
- **Cross-platform**: Works on desktop and mobile browsers

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **React Speech Recognition** - Voice input capabilities

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **OpenAI API** - AI-powered interview responses
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **OpenAI API Key** (for AI functionality)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MockMate
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the `Backend` directory:
   ```bash
   cd ../Backend
   touch .env
   ```
   
   Add your OpenAI API key to the `.env` file:
   ```
   APIKEY=your_openai_api_key_here
   ```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd Backend
node server.js
```
The backend server will start on `http://localhost:3000`

### Start the Frontend Development Server
```bash
cd Frontend
npm run dev
```
The frontend application will start on `http://localhost:5173`

## 📱 Usage

1. **Navigate to the Homepage**: Open your browser and go to `http://localhost:5173`

2. **Start a Mock Interview**: Click the "Start Mock Interview" button

3. **Begin the Conversation**: 
   - Click the "Listen" button to start voice recording
   - Speak your response to the interview question
   - Click "Stop" when you're done speaking
   - The AI interviewer will respond with follow-up questions

4. **Practice Different Scenarios**: The AI adapts to your responses and provides relevant follow-up questions

## 🏗️ Project Structure

```
MockMate/
├── Backend/
│   ├── server.js          # Express server with OpenAI integration
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables (create this)
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Homepage.jsx        # Landing page component
│   │   │   ├── MockInterview.jsx   # Interview interface wrapper
│   │   │   └── ChatInterface.jsx   # Voice chat functionality
│   │   ├── App.jsx                 # Main app component with routing
│   │   └── main.jsx                # App entry point
│   ├── public/
│   │   └── Gemini_Generated_Image_r39344r39344r393.png  # AI interviewer avatar
│   └── package.json       # Frontend dependencies
└── README.md
```

## 🔧 Configuration

### Backend Configuration
- **Port**: Default port is 3000 (configurable in `server.js`)
- **OpenAI Model**: Currently using `openai/gpt-4.1`
- **CORS**: Enabled for cross-origin requests

### Frontend Configuration
- **Development Server**: Runs on port 5173 (Vite default)
- **API Endpoint**: Configured to connect to `http://localhost:3000/chat`

## 🎯 Key Features Explained

### Voice Recognition
- Uses the Web Speech API for real-time speech-to-text conversion
- Supports continuous listening with automatic transcription
- Language set to English (India) for optimal recognition

### AI Interviewer
- Powered by OpenAI's GPT-4.1 model
- Acts as an intelligent interviewer that adapts to user responses
- Provides contextual follow-up questions based on user answers

### Text-to-Speech
- Converts AI responses to spoken audio
- Uses male voice for interviewer responses
- Automatic playback when AI responds

## 🐛 Troubleshooting

### Common Issues

1. **Speech Recognition Not Working**
   - Ensure you're using a supported browser (Chrome, Edge, Safari)
   - Check microphone permissions
   - Try refreshing the page

2. **AI Responses Not Working**
   - Verify your OpenAI API key is correct
   - Check that the backend server is running
   - Ensure you have sufficient API credits

3. **CORS Errors**
   - Make sure the backend server is running on port 3000
   - Check that CORS is properly configured

### Browser Compatibility
- **Chrome**: Full support
- **Edge**: Full support
- **Firefox**: Limited speech recognition support
- **Safari**: Full support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- React Speech Recognition library for voice input
- Web Speech API for text-to-speech functionality
- The open-source community for various tools and libraries

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the troubleshooting section above
2. Review the browser compatibility notes
3. Ensure all dependencies are properly installed
4. Verify your API keys are correctly configured

---

**Made for students, by student** 🎓
