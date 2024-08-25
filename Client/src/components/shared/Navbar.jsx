import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";
import { FaUserCircle, FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import chatbot_logo from '../member/chatbot.svg';

function Navbar({ routes }) {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const popupRef = useRef();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClick = () => {
    window.open("http://localhost:5001/api/chatbot", '_blank');
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleProfile = () => {
    navigate("profile");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <img src={chatbot_logo} width={45} height={45} alt="" onClick={handleClick}  />
        </li>
        
        <li>
          <FaUserCircle className="user-icon" fill="#00a9ff" onClick={togglePopup} />
          {showPopup && (
            <Popup ref={popupRef}>
              <div className="user-info">
                <span className="name">User 1</span>
              </div>
              <button className="profile-button" onClick={handleProfile}>
                <FaUser /> Profile
              </button>
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
    font-size: 40px;
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

  .profile-button, .logout-button {
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