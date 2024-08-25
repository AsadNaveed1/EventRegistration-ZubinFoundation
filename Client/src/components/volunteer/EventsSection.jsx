import React, {useState,useEffect}from 'react';
import styled from 'styled-components';
import EventCard from '../shared/EventCard';
import data from '../member/Sample.json';
import img1 from '../img/Img1.png';
import img2 from '../img/Img2.png';
import img3 from '../img/Img3.png';
import Footer from '../shared/Footer';
import axios from '../axios';

const images = [img1, img2, img3];

function EventSection({ searchQuery }) {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/events/all_events');
        const quer = response.data.info; // Adjust based on your API response structure
        setEventList(quer || data); // Use fetched data or fallback to Sample.json
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventList(data); // Fallback to Sample.json on error
      }
    };

    fetchEvents();
  }, []); // Runs once on mount
  console.log('events',eventList)
  // Filtering based on search query
  const filteredEvents = eventList.filter(event => {
    const query = (searchQuery || '').toLowerCase();
    const matchesTitle = event.title.toLowerCase().includes(query);
    const matchesType = event.interests.toLowerCase().includes(query);
    return matchesTitle || matchesType;
  });


  const eventsWithImages = filteredEvents.map(event => {
 
    

    return {
      ...event,
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