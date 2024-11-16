import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../UserContext'; // Import useUser from UserContext
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import "./Menu.css";

function Menu() {
  const { username } = useUser(); // ดึงค่า username จาก UserContext

  // ใช้ useEffect เพื่อแสดงค่า username ใน console เมื่อโหลดหน้า Menu
  useEffect(() => {
    console.log('Username:', username);
  }, [username]);

  return (
    <div className="menu-container">
  <div className="content">
    <h1 className="welcome-text">Welcome, {username}!</h1> {/* แสดงชื่อผู้ใช้ */}
    <h2 className="select-mode-text">Select Mode</h2>
    <div className="row justify-content-center align-items-center g-4">
      <div className="col-md-4">
        <Link className="btn mode-btn" to="/Easy">
          <h3>Easy</h3>
        </Link>
      </div>
      <div className="col-md-4">
        <Link className="btn mode-btn" to="/Normal">
          <h3>Normal</h3>
        </Link>
      </div>
      <div className="col-md-4">
        <Link className="btn mode-btn" to="/Hard">
          <h3>Hard</h3>
        </Link>
      </div>
    </div>

    {/* ปุ่มกลับไปหน้า Home */}
    <div className="mt-4">
      <Link to="/Home" className="btn btn-secondary btn-lg">
        Back to Home
      </Link>
    </div>
  </div>
</div>


  );
}

export default Menu;
