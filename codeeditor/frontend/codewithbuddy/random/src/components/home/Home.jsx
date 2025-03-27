import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Code Together, Build Together</h1>
          <p className="hero-subtitle">
            Collaborate in real-time with your team using our powerful code editor.
            Share, edit, and build amazing projects together.
          </p>
          <div className="hero-buttons">
            <Link to="/editor" className="primary-button">
              Start Coding
            </Link>
            <Link to="/signup" className="secondary-button">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose CodeWithBuddy?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Collaboration</h3>
            <p>Work together seamlessly with instant updates and live cursor sharing.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Beautiful Interface</h3>
            <p>Modern, clean design with dark and light themes for comfortable coding.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your code is encrypted and secure. Control who can access your rooms.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Built-in Chat</h3>
            <p>Communicate with your team using the integrated chat feature.</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create an Account</h3>
            <p>Sign up for free and get started in seconds.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Create a Room</h3>
            <p>Start a new coding session or join an existing one.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Share & Collaborate</h3>
            <p>Share the room link with your team and start coding together.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to Start Coding Together?</h2>
          <p>Join thousands of developers who are already using CodeWithBuddy.</p>
          <Link to="/signup" className="primary-button">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 