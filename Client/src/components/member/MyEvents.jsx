import React, { useState } from 'react';
import styled from 'styled-components';
import { useEventContext } from './context/EventContext'; // Adjust import based on your actual path
import Footer from '../shared/Footer';

function MyEvents() {
  const { registeredEvents, withdrawEvent } = useEventContext();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
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
              <button onClick={() => withdrawEvent(event.id)}>Withdraw</button>
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
            <p>Date: {new Date(selectedEvent.time).toLocaleString()}</p>
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
    background: #ffffff; // Brighter white for a cleaner look
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1); // Softer shadow
    width: 80%;
    max-width: 900px; // Smaller max width for better layout
    transition: transform 0.3s ease-in-out; // Smooth transform on hover
  }

  .event-card:hover {
    transform: translateY(-3px); // Slight lift effect on hover
  }

  button {
    margin-top: 30px;
    padding: 12px 24px; // More padding for a better button feel
    background-color: #0056b3; // Darker blue as the main color
    color: white;
    font-weight: bold; // Bold text on buttons
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.2s; // Smooth background color transition
  }

  button:hover {
    background-color: #003d82; // Even darker on hover
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
  z-index: 1000; // Ensure it's above all other content

  .modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 15px; // More pronounced rounded corners
    width: 90%;
    max-width: 500px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2); // Stronger shadow for more depth
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px; // Space out content more
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 28px; // Larger close button
    cursor: pointer;
    color: #333;
    transition: color 0.2s; // Transition for hover effect
  }

  .close-button:hover {
    color: #000; // Darken color on hover
  }
`;

export default MyEvents;