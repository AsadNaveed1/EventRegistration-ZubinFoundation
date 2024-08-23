import React,{useState}from 'react';
import EventFullDisplay from '../shared/EventFullDisplay';
import styled from 'styled-components';

import MyEventCard from './MyEventCard';

const events = [
  {
    id: 1,
    image: 'event1.jpg',
    title: 'Event One',
    description: 'This is a short description of Event One.',
  },
  {
    id: 2,
    image: 'event2.jpg',
    title: 'Event Two',
    description: 'This is a short description of Event Two.',
  },
  // Add more events here
];

function MyEventsPage() {
  const [showDetail, setShowDetail] = useState('');
const handleRegister = (val)=>{
  setShowDetail('')
  console.log(val)
}
  return (
    <Wrapper>
    <div style={{ padding: '20px' }}>
      {!showDetail && <h1>My Events</h1>}
        {!showDetail && events.map((event) => (
          <MyEventCard
            key={event}
            event={event}
            getDetails={() => {
              setShowDetail(event);
            }}
          />
        ))}
        {showDetail && (
      <div className="events-grid">

          <EventFullDisplay
            event={showDetail}
            getDetails={setShowDetail}
            register ={handleRegister}
          />
        </div>

        )}
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

export default MyEventsPage;