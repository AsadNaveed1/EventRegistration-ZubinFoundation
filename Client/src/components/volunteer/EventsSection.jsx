import React from 'react';
import styled from 'styled-components';
import EventCard from '../shared/EventCard';

function EventsSection() {
  return (
    <Wrapper>
      <div className="container">
        <h1>Upcoming Events</h1>
        <div className="events-grid">
          <EventCard
            imageSrc="../img/Img1.png"
            title="Charity Event"
            date="April 15, 2023"
            time="10:00 AM - 2:00 PM"
            location="City Park, New York"
          />
          <EventCard
            imageSrc="../img/Img2.png"
            title="Fundraising Event"
            date="May 10, 2023"
            time="3:00 PM - 6:00 PM"
            location="Community Center, Los Angeles"
          />
          <EventCard
            imageSrc="../img/Img.png"
            title="Community Cleanup"
            date="June 5, 2023"
            time="9:00 AM - 12:00 PM"
            location="Downtown Plaza, Chicago"
          />

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