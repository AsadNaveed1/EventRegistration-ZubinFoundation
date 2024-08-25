import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import data from './Sample.json';
import Navbar from '../shared/Navbar';
import { useEventContext } from './context/EventContext'; 

function EventDetails() {
  const { id } = useParams();
  const event = data.find((e) => e.id.toString() === id.toString());
  const { registeredEvents, registerEvent, withdrawEvent } = useEventContext();
  const [seatsAvailable, setSeatsAvailable] = useState(Math.floor(Math.random() * 100) + 1);
  

  const isRegistered = registeredEvents.some(e => e.id === event.id);
  const [registered, setRegistered] = useState(isRegistered);

  useEffect(() => {

    setRegistered(isRegistered);
  }, [id, isRegistered]);

  const handleRegister = () => {
    if (seatsAvailable > 0 && !registered) {
      setSeatsAvailable(seatsAvailable - 1);
      registerEvent(event); 
      setRegistered(true);
    }
  };

  const handleWithdraw = () => {
    if (registered) {
      withdrawEvent(event.id); 
      setSeatsAvailable(seatsAvailable + 1);
      setRegistered(false);
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <div className="info">
            <p>By Event Organizer</p>
            <button>Follow</button>
          </div>
        </div>
        <div className="details">
          <div className="detail-item">
            <h3><FaCalendarAlt /> Date and time</h3>
            <p>{new Date(event.time).toLocaleString()}</p>
          </div>
          <div className="detail-item">
            <h3><FaMapMarkerAlt /> Location</h3>
            <p>{event.location}</p>
          </div>
          <div className="detail-item">
            <h3>About this event</h3>
            <p>{event.description}</p>
          </div>
          <div className="detail-item">
            <h3>Seats Available</h3>
            <p>{seatsAvailable}</p>
          </div>
          <button onClick={handleRegister} disabled={registered}>
            {registered ? 'Registered' : 'Register'}
          </button>
          {registered && <button onClick={handleWithdraw}>Withdraw</button>}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .container {
    max-width: 960px;
    margin: 20px auto;
    padding: 40px;
    background: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    font-family: Arial, sans-serif;
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  h1 {
    font-size: 32px;
    color: #333;
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
  }

  .info button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .detail-item {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .detail-item h3 {
    font-size: 18px;
    color: #007bff;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .detail-item p {
    font-size: 16px;
    color: #555;
  }

  button {
    padding: 12px 24px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
    font-size: 16px;
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

export default EventDetails;