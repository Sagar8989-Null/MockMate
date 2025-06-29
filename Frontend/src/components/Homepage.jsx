import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const features = [
    {
      title: 'Technical Questions',
      description: 'Practice coding problems and system design questions',
      icon: '💻'
    },
    {
      title: 'Behavioral Questions',
      description: 'Master common behavioral interview scenarios',
      icon: '🗣️'
    },
    {
      title: 'Timed Practice',
      description: 'Simulate real interview conditions with timers',
      icon: '⏱️'
    },
    {
      title: 'Multiple Categories',
      description: 'Questions for different roles and experience levels',
      icon: '📚'
    }
  ];

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <h2>MOCKMATE</h2>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Master Your Interview Skills</h1>
            <p className="hero-description">
              Practice with real interview questions, improve your responses, and build confidence 
              for your next job opportunity. Our platform provides a realistic interview experience 
              to help you succeed.
            </p>
            <div className="hero-buttons">
              <Link to="/interview" className="btn btn-primary btn-large">
                Start Mock Interview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-header">
            <h2>Why Practice With Us?</h2>
            <p>Get the tools and practice you need to ace your next interview</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of students who have improved their interview skills</p>
            <Link to="/interview" className="btn btn-accent btn-large">
              Begin Practice Session
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 MockInterview Pro. Made for students, by students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;