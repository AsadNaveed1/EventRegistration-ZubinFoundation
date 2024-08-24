import React from 'react';
import styled from 'styled-components';
import { FaHome, FaPlus, FaList, FaEnvelopeOpenText } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function SideNavbar() {
  return (
    <Wrapper>
      <div className="logo">
        <h2>Admin Panel</h2>
      </div>
      <ul>
        <li>
          <Link to="/admin/dashboard">
            <FaHome className="icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/addevent">
            <FaPlus className="icon" />
            Add Event
          </Link>
        </li>
        <li>
          <Link to="/admin/manageevents">
            <FaList className="icon" />
            Manage Events
          </Link>
        </li>
        <li>
          <Link to="/admin/applications">
            <FaEnvelopeOpenText className="icon" />
            Applications
          </Link>
        </li>
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #fff; 
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 

  .logo {
    margin-bottom: 30px;
  }

  .logo h2 {
    color: #333;
    font-size: 24px;
  }

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
  }

  ul li {
    margin-bottom: 20px;
  }

  ul li a {
    display: flex;
    align-items: center;
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  ul li a:hover {
    background-color: #f0f0f0; 
  }

  .icon {
    margin-right: 10px;
    font-size: 24px;
  }
`;

export default SideNavbar;