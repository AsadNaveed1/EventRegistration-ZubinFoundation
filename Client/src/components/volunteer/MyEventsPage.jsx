import React from 'react';
import EventCard from './MyEventCard';

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
  return (
    <div style={{ padding: '20px' }}>
      <h1>My Events</h1>
      <div>
        {events.map((event) => (
          <EventCard
            key={event.id}
            image={event.image}
            title={event.title}
            description={event.description}
          />
        ))}
      </div>
    </div>
  );
}

export default MyEventsPage;