import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setMessage('User registered successfully!');
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        const errorText = await response.text(); // ดึงข้อความผิดพลาดที่ได้รับจากเซิร์ฟเวอร์
        setMessage(`Failed to register user: ${errorText}`); // แสดงข้อความผิดพลาด
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
