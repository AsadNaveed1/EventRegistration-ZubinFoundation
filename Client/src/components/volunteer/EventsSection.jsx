import React, { useState } from 'react';
import styled from 'styled-components';
import EventCard from '../shared/EventCard';
import EventFullDisplay from '../shared/EventFullDisplay';

function EventsSection() {
  const [showDetail, setShowDetail] = useState('');
  const eventList = [
{imageSrc:"../img/Img1.png",
  title:"Charity Event",
  date:"April 15, 2023",
  time:"10:00 AM - 2:00 PM",
  description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  location:"City Park, New York"},
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
  ]
  
  return (
    <Wrapper>
      <div className="container">
        <h1>Upcoming Events</h1>
        <div className="events-grid">
        { 
        !showDetail&& eventList.map((event) => (
          <EventCard
          key={event}
            event = {event}
            getDetails ={()=>{
              setShowDetail(event)
            }}
          />
          ))}
          {
          showDetail&&<EventFullDisplay
            event = {showDetail}
            getDetails ={setShowDetail}
          />
          }

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
    font-size: 28px;
    color: #333;
    margin-bottom: 30px;
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }
`;

export default EventsSection;