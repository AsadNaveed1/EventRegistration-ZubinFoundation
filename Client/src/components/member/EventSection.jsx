// Member/EventSection.jsx
import React from 'react';
import styled from 'styled-components';
import EventCard from '../shared/EventCard';
import data from './Sample.json';
import img1 from '../img/Img1.png';
import img2 from '../img/Img2.png';
import img3 from '../img/Img3.png';
import Footer from '../shared/Footer';

const images = [img1, img2, img3];

function EventSection({ searchQuery }) {
  const filteredEvents = data.filter(event => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = event.title.toLowerCase().includes(query);
    const matchesType = event.eventType.toLowerCase().includes(query);
    return matchesTitle || matchesType;
  });

  const eventsWithImages = filteredEvents.map(event => {
    const eventDate = new Date(event.time);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = eventDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      ...event,
      date: formattedDate,
      time: formattedTime,
      imageSrc: images[Math.floor(Math.random() * images.length)],
    };
  });

  return (
    <>
    <SectionWrapper>
      {eventsWithImages.map(event => (
        <EventCard key={event.title} event={event} />
      ))}
    </SectionWrapper>

    </>
  );
}

const SectionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  justify-items: center;
  padding: 20px;
`;

export default EventSection;