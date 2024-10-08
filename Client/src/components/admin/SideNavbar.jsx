import React from 'react';
import styled from 'styled-components';
import { FaHome, FaPlus, FaList, FaEnvelopeOpenText } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function SideNavbar() {
  return (
    <Wrapper>
      <div className="logo">
        <h2>Admin Panel</h2>
      </div>
      <ul>
        <li>
          <NavLink to="dashboard" activeClassName="active">
            <FaHome className="icon" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="addevent" activeClassName="active">
            <FaPlus className="icon" />
            Add Event
          </NavLink>
        </li>
        <li>
          <NavLink to="manageevents" activeClassName="active">
            <FaList className="icon" />
            Manage Events
          </NavLink>
        </li>
        <li>
          <NavLink to="applications" activeClassName="active">
            <FaEnvelopeOpenText className="icon" />
            Applications
          </NavLink>
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

  ul li a:hover, ul li a.active {
    background-color: #e0e0e0; 
  }

  .icon {
    margin-right: 10px;
    font-size: 24px;
  }
`;

export default SideNavbar;