import React from 'react';
import styled from 'styled-components';

function MyEvents() {
  return (
    <Container>
      <EventsHeader>My Events</EventsHeader>
      <Event>
        <EventImage src="placeholder.jpg" alt="Chai Gathering" />
        <EventInfo>
          <h2>Chai Gathering</h2>
          <p>
            Body text for whatever you'd like to say. Add main takeaway points,
            quotes, anecdotes, or even a very very short story.
          </p>
          <Button>Read More</Button>
        </EventInfo>
      </Event>
      <Event>
        <EventImage src="placeholder.jpg" alt="Title" />
        <EventInfo>
          <h2>Tiramisu Making</h2>
          <p>
            Body text for whatever you'd like to say. Add main takeaway points,
            quotes, anecdotes, or even a very very short story.
          </p>
          <Button>Read More</Button>
        </EventInfo>
      </Event>
      <Event>
        <EventImage src="placeholder.jpg" alt="Title" />
        <EventInfo>
          <h2>Basking</h2>
          <p>
            Body text for whatever you'd like to say. Add main takeaway points,
            quotes, anecdotes, or even a very very short story.
          </p>
          <Button>Read More</Button>
        </EventInfo>
      </Event>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
`;

const EventsHeader = styled.h1`
  text-align: left;
  margin-bottom: 1em;
`;

const Event = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const EventImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const EventInfo = styled.div`
  flex-grow: 1;
  padding: 1.5rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default MyEvents;