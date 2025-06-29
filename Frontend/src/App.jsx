import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import MockInterview from './components/MockInterview';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/interview" element={<MockInterview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;