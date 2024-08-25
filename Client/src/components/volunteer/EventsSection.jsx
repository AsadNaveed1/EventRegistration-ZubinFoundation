import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import EventCard from '../shared/EventCard';
import axios from '../axios'; // Import Axios

function EventsSection() {
  const [events, setEvents] = useState([]); // State to store fetched events
  const [showDetail, setShowDetail] = useState('');

  // Fetch events when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/all_events'); // Adjust the URL as needed
        console.log(response)
        if (response.data){setEvents(response.data)}; // Assuming the response data is an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this runs once on mount

  const handleRegister = (val) => {
    console.log(val);
  };

  return (
    <Wrapper>
      <div className="container">
        <h1>Upcoming Events</h1>
        <div className="events-grid">
          {events.length>0 && events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={handleRegister} // Pass the handleRegister function if needed
            />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 50px 20px;
  text-align: center;

  .container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }

  h1 {
    font-size: 32px; /* Increased font size */
    color: #333;
    margin-bottom: 30px;
  }

  .events-grid {
    display: flex; /* Changed to flex */
    flex-wrap: wrap; /* Allow wrapping */
    justify-content: center; /* Center the items */
    align-items: center; /* Center vertically */
    gap: 20px;
    margin-top: 200px;
  }
`;

export default EventsSection;