import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useLocation } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from '../axios';

function EventDetails() {
  const { userId } = useParams();
  const location = useLocation();
  const { event_id } = location.state || {}; 
  const [event, setEvent] = useState('');
  const [user, setUser] = useState('');
  const [registered, setRegistered] = useState(false);
  const [seatsAvailable, setSeatsAvailable] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.post('/events/find_event', {
          event_id: event_id // Send event_id in the request body
        });

        setEvent(response.data.event);
        setSeatsAvailable(response.data.event.capacity); // Set initial seats available

        const res = await axios.get(`user/find_user/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetch();
  }, [userId, event_id]);

  useEffect(() => {
    if (user && event) {
      const isRegistered = user.registered_events?.some(e => e.event_id === event.event_id);
      setRegistered(isRegistered || false);
    }
  }, [user, event]);

  const handleRegister = async () => {
    const res = await axios({
      method: 'post',
      url: 'events/add_event_to_user',
      headers: {
        'Content-Type': 'application/json', // Ensure the content type is set to JSON
      },
      data: {
        user_id: userId,
        event_id: event_id,
      },
    });
    setSeatsAvailable(seatsAvailable - 1);
    setRegistered(true);
  };

  const handleWithdraw = async () => {
    if (registered) {
      setSeatsAvailable(seatsAvailable + 1);
      setRegistered(false);
      const res = await axios({
        method: 'post',
        url: 'events/unregister',
        headers: {
          'Content-Type': 'application/json', // Ensure the content type is set to JSON
        },
        data: {
          user_id: userId,
          event_id: event_id,
        },
      });
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  // Extract date and time for display
  const startDateTime = new Date(event.start_datetime); // Assuming start_datetime is the correct field
  const formattedDate = startDateTime.toLocaleDateString(); // Format as needed
  const formattedTime = startDateTime.toLocaleTimeString(); // Format as needed

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
            <h3><FaCalendarAlt /> Date</h3>
            <p>{formattedDate}</p>
          </div>
          <div className="detail-item">
            <h3><FaCalendarAlt /> Time</h3>
            <p>{formattedTime}</p>
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