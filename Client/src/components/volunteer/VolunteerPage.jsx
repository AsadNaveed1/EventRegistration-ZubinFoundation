import React from 'react';
import Navbar from '../shared/Navbar';
import EventSearchPage from './EventSearchPage';
import EventsSection from './EventsSection';

function VolunteerPage() {
  return (
    <div>
      <Navbar />
      <EventSearchPage />
      <EventsSection />
    </div>
  );
}

export default VolunteerPage;