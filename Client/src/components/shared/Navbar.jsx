import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

function Navbar({ routes }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current route

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLogout = () => {
    axios.post("http://localhost:5000/user/log_out").then(() => {
      sessionStorage.removeItem("sessionId");
    });
  };

  return (
    <Wrapper>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>Event Registration</span>
      </div>
      <ul className="nav-links">
        {routes.map((route) => (
          <li key={route.title}>
            <Link to={route.link}>{route.title}</Link>
          </li>
        ))}
        <li>
          <FaUserCircle className="user-icon" onClick={togglePopup} />
          {showPopup && (
            <Popup>
              <div className="user-info">
                <span className="name">Name</span>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </Popup>
          )}
        </li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .logo {
    display: flex;
    align-items: center;
  }

  .logo img {
    max-width: 50px;
    margin-right: 10px;
  }

  .logo span {
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }

  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .nav-links li a {
    color: #333;
    text-decoration: none;
    font-size: 16px;
    font-weight: 500;
  }

  .nav-links li a:hover {
    text-decoration: underline;
  }

  .user-icon {
    font-size: 28px;
    color: #333;
    cursor: pointer;
  }
`;

const Popup = styled.div`
  position: absolute;
  right: 20px;
  top: 60px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1;

  .user-info {
    margin-bottom: 10px;
  }

  .name {
    font-weight: bold;
    display: block;
  }

  .logout-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: flex;
    align-items: center;
    color: #333;
    margin: 5px 0;
  }
`;

export default Navbar;
