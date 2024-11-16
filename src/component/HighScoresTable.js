import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function HighScoresTable() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('easy'); // ค่าเริ่มต้นคือ 'easy'

  // ดึงข้อมูลจาก API เมื่อมีการเปลี่ยนแปลงโหมด
  useEffect(() => {
    fetchHighScores(mode);
  }, [mode]);

  const fetchHighScores = async (mode) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/data/${mode}`);
      setData(response.data); // เก็บข้อมูลจากฐานข้อมูล
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f0f8ff', borderRadius: '10px', padding: '20px' }}>
      {/* ปุ่มสำหรับเลือกโหมด */}
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-success mx-2" onClick={() => setMode('easy')}>Easy</button>
        <button className="btn btn-warning mx-2" onClick={() => setMode('normal')}>Normal</button>
        <button className="btn btn-danger mx-2" onClick={() => setMode('hard')}>Hard</button>
      </div>

      {/* แสดงชื่อโหมดที่เลือก */}
      <h2 className="text-center mb-4" style={{ color: '#2e8b57' }}>Top Rank - {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode</h2>

      {/* ตารางแสดงข้อมูล */}
      <div className="card shadow-lg mb-4" style={{ borderRadius: '15px' }}>
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ปุ่มกลับไปที่หน้า Login */}
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn btn-secondary btn-lg">Back to Login</Link>
      </div>
    </div>
  );
}

export default HighScoresTable;
