import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // Import bcryptjs
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState([]);
  const [inputEmail, setInputEmail] = useState(''); // Store the email entered

  useEffect(() => {
    fetchHighScores();
  }, []);

  const fetchHighScores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setData(response.data); // Store the data from the database
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Validate the password (must contain at least one special character and be at least 8 characters long)
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle email input change
  const handleEmailChange = (event) => {
    setInputEmail(event.target.value);
  };

  // Check if email already exists in the database
  const isEmailTaken = () => {
    return data.some((user) => user.email === inputEmail);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Check if email is already taken
    if (isEmailTaken()) {
      setMessage('This email is already registered.');
      return;
    }

    // Validate password
    if (!isValidPassword(password)) {
      setMessage('Password must contain at least one special character and be at least 8 characters long.');
      return;
    }

    try {
      // Hash the password before sending it to the server
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password: hashedPassword }),
      });

      if (response.ok) {
        setMessage('User registered successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        const errorText = await response.text();
        setMessage(`Failed to register user: ${errorText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#f7f7f7' }}>
      <div className="card shadow-lg p-5" style={{ width: '400px', borderRadius: '15px', backgroundColor: '#ffffff' }}>
        <h2 className="text-center mb-4" style={{ color: '#2e8b57' }}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
              style={{ borderRadius: '8px', padding: '10px' }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={inputEmail}
              onChange={handleEmailChange}
              required
              placeholder="Enter email"
              style={{ borderRadius: '8px', padding: '10px' }}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
              style={{ borderRadius: '8px', padding: '10px' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success btn-lg w-100 mt-3"
            style={{ borderRadius: '8px' }}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3" style={{ color: '#333' }}>{message}</p>
        <p className="text-center mt-3">
          Already have an account? <Link to="/" style={{ color: '#28a745' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
