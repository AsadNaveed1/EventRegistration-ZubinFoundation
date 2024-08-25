import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams,useLocation  } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import data from './Sample.json';
import Navbar from '../shared/Navbar';
import { useEventContext } from './context/EventContext'; 
import axios from '../axios'

function EventDetails() {
  const { userId } = useParams();
  const location = useLocation();
  const { event_id } = location.state || {}; 
  const [event, setEvent]=useState('');
  const [user, setUser]=useState('');
  const [registered, setRegistered] = useState(false);

  console.log("event id", event_id)
  const id = userId
  useEffect(() => {
    const fetch = async () => {
      try {
        // Use the correct endpoint and include the event ID in the URL
        const response = await axios.post('/events/find_event', {
          event_id: event_id // Send event_id in the request body
        }); // Convert to integer
        
        console.log("response",response);
        setEvent(response.data)
        const res = await axios.get(`user/find_user/${userId}`)
        console.log('res',res.data)
        setUser(res.data)

      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to Sample.json on error, if you have it imported
        // setEventList(data); // Uncomment if you have Sample.json data
      }
    };

    fetch();
  }, [id]);  // Runs once on mount
  console.log('events')
  console.log(user,event)
  const [seatsAvailable, setSeatsAvailable] = useState(event.capacity)
  
  useEffect(() => {
    if (user && event) {
      const isRegistered = user.registered_events?.some(e => e.event_id === event.event_id);
      console.log(isRegistered)
      setRegistered(isRegistered || false);
    }
  }, [user, event]);

  const handleRegister = async () => {
    // if (seatsAvailable > 0 && !registered) {
      const res = await axios.post('events/add_event_to_user',{
        user_id :userId,
        event_id:event_id
      })
      console.log(res)
      setSeatsAvailable(seatsAvailable - 1);
      setRegistered(true);
    // }
  };

  const handleWithdraw = () => {
    if (registered) {
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