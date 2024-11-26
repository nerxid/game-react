// src/component/APP.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import UserContext
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  const { setUsername } = useUser(); // Get setUsername function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // For navigation after login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username); // Set username from response
        navigate('/Home'); // Redirect to the Menu page after login
      } else {
        setMessage('Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to server');
    }
  };


  return (
    <>
     <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#ffffff', fontFamily: "'Roboto', sans-serif" }}>
  <div className="text-center mb-4">
    <h2 className="text-primary">Math Quiz Login</h2>
    <p className="text-muted">Enter your credentials to test your math skills!</p>
  </div>

  <form className="w-75 w-md-50" onSubmit={handleLogin} style={{ border: '1px solid #dcdcdc', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
    <div className="form-group mb-3">
      <label htmlFor="email" className="text-dark">Email</label>
      <input
        type="email"
        className="form-control"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="password" className="text-dark">Password</label>
      <input
        type="password"
        className="form-control"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />
    </div>
    <button type="submit" className="btn btn-success btn-lg mt-3 w-100">Login</button>
  </form>

  <div className="mt-3">
    <Link className="btn btn-outline-info mt-3" to="/HighScoresTable">
      <i className="bi bi-trophy-fill"></i> Top Scores
    </Link>
  </div>

  <p className="mt-2 text-danger">{message}</p>

  <div className="mt-3">
    <Link to="/Signup" className="btn btn-link text-secondary">Don't have an account? Sign up</Link>
  </div>
</div>


    </>
  );
}

export default App;
