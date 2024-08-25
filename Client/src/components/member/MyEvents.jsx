import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import Footer from '../shared/Footer';
import axios from '../axios'
import { useParams } from 'react-router-dom';

function MyEvents() {
  const [registeredEvents,setRegisteredEvents]=useState([]);
  const { userId } = useParams();
  console.log(userId)
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`user/find_user/${userId}`)
        console.log("response",res)

        setRegisteredEvents(res.data.registered_events)
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to Sample.json on error, if you have it imported
        // setEventList(data); // Uncomment if you have Sample.json data
      }
    };

    fetch();
  }, [userId]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  const withdrawEvent = async (event) => {
    // if (seatsAvailable > 0 && !registered) {
      await axios.post('events/unregister',{
        user_id :userId,
        event_id:event.event_id
      })
      setRegisteredEvents(prevEvents =>
        prevEvents.filter(x => x.event_id !== event.event_id) // Adjust based on your event structure
      );
    // }
  };

  return (
    <EventsWrapper>
      {registeredEvents.length > 0 ? (
        <div className="events-list">
          {registeredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <button onClick={() => handleViewDetails(event)}>View Details</button>
              <button onClick={() => withdrawEvent(event)}>Withdraw</button>
            </div>
          ))}
        </div>
      ) : (
        <div>No registered events found.</div>
      )}

      {selectedEvent && (
        <Modal>
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <p>Date: {new Date(selectedEvent.start_datetime).toLocaleString()}</p>
            <p>Location: {selectedEvent.location}</p>
          </div>
        </Modal>
      )}

    </EventsWrapper>
  );
}

const EventsWrapper = styled.div`
  .events-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    align-items: center;
    
  }

  .event-card {
    background: #ffffff; 
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
    width: 80%;
    max-width: 900px; 
    transition: transform 0.3s ease-in-out; 
  }

  .event-card:hover {
    transform: translateY(-3px); 
  }

  button {
    margin-top: 30px;
    padding: 12px 24px; 
    background-color: #00a9ff; 
    color: white;
    font-weight: bold; 
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.2s; 
  }

  button:hover {
    background-color: #003d82; 
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 

  .modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 15px; 
    width: 90%;
    max-width: 500px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2); 
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px; 
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 28px; 
    cursor: pointer;
    color: #333;
    transition: color 0.2s; 
  }

  .close-button:hover {
    color: #000; 
  }
`;

export default MyEvents;