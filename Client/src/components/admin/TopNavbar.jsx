import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";
import { FiLogOut } from "react-icons/fi";

function TopNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {

    navigate('/'); 
 
    axios.post("http://localhost:5001/user/logout").then(() => {
      sessionStorage.removeItem("sessionId");
    });

  };

  return (
    <Wrapper>
      <div className="logo">
        <img src={logo} alt="Logo" />
        <span>Event Registration</span>
      </div>
      <div className="logout">
        <button className="logout-button" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
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
  position: fixed;
  top: 0;
  left: 250px;
  right: 0;
  z-index: 1000;

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

  .logout {
    display: flex;
    align-items: center;
  }

  .logout-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;
    padding: 5px 10px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .logout-button:hover {
    background-color: #f0f0f0;
  }
`;

export default TopNavbar;
