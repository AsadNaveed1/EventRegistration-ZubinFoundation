import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';


import { useNavigate } from 'react-router-dom';


function MemberProfile() {
  
  const navigate = useNavigate();

  const handleMyAppointments = () => {
    navigate('/my-appointments'); 
  };

  const handleMyEvents = () => {
    navigate('/my-events');
  };
  return (
    <Wrapper>
      <div className="profile-container">
        <div className="profile-header">
          <img src="./avatar.png" alt="Profile Avatar" className="profile-avatar" />
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>johndoe@example.com</p>
            <p>Member since: May 2023</p>
          </div>
        </div>
        <div className="profile-categories">
          <div className="category" onClick={handleMyAppointments}>
            <h3>My Appointments</h3>
            <p>View and manage your upcoming appointments</p>
          </div>
          <div className="category" onClick={handleMyEvents}>
            <h3>My Events</h3>
            <p>View and participate in upcoming events</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;

  .profile-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 600px;
    width: 100%;
  }

  .profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  }

  .profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 1.5rem;
  }

  .profile-info h2 {
    margin-bottom: 0.5rem;
  }

  .profile-info p {
    color: #666;
    margin-bottom: 0.25rem;
  }

  .profile-categories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1.5rem;
  }

  .category {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 1.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e9e9e9;
    }

    h3 {
      margin-bottom: 0.5rem;
    }

    p {
      color: #666;
    }
  }
`;

export default MemberProfile;