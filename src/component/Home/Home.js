import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const handleLogout = () => {
    alert("Logging out...");
    // Add your logout logic here (e.g., clearing user data, redirecting to login)
  };

  return (
    <div style={{ backgroundColor: '#ffffff', height: '100vh' }}> {/* White background for the entire page */}
      {/* Home Page Content */}
      <div 
        className="container d-flex flex-column justify-content-center align-items-center" 
        style={{ 
          height: '100vh', 
          backgroundColor: '#ffffff',  // White background
          fontFamily: "'Press Start 2P', cursive", 
          color: '#333',  // Dark text for better contrast on white background
          textAlign: 'center',
          padding: '20px'
        }}
      >
        {/* Welcome Text */}
        <div className="mb-4">
          <h2 className="text-primary" style={{ fontSize: '2.5rem' }}>Welcome to the Math Quiz Game!</h2>
          <p className="text-muted" style={{ fontSize: '1.2rem' }}>Ready to test your math skills? Let's get started!</p>
        </div>

        {/* Play Button */}
        <Link to="/Menu"
          className="btn btn-danger btn-lg w-50 my-3" 
          style={{
            fontSize: '1.5rem',
            padding: '15px 40px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)',
            transition: 'transform 0.3s ease',
          }} 
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <i className="bi bi-play-fill"></i> Start Game
        </Link>

        {/* View High Scores Link */}
        <div className="mt-4">
          <Link to="/HighScoresTable" className="btn btn-outline-primary btn-lg" style={{ fontSize: '1.2rem', padding: '10px 25px', textTransform: 'uppercase' }}>
            <i className="bi bi-trophy-fill"></i> View My Scores
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
