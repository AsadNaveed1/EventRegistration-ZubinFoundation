import React,{useState}from 'react';
import EventFullDisplay from '../shared/EventFullDisplay';
import styled from 'styled-components';

import MyEventCard from './MyEventCard';

const events = [
  {imageSrc:"../img/Img2.png",
    title:"Fundraising Event",
    date:"May 10, 2023",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time:"10:00 AM - 2:00 PM",
    location:"Community Center, Los Angeles"},
  {imageSrc:"../img/Img2.png",
    title:"Fundraising Event",
    date:"May 10, 2023",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    time:"10:00 AM - 2:00 PM",
    location:"Community Center, Los Angeles"},
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