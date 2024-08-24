import React from 'react';
import Navbar from './shared/Navbar.jsx';
import { useState } from 'react';

import MyEvents from './MyEvents';
import MyAppointments from './MyAppointments';
import MemberProfile from './MemberProfile';
import EventSearchPage from './EventSearchPage';
import EventsSection from './EventsSection';

function MemberPage() {

  const [chosenPage, setChosenPage] = useState('Events Search');

  return (
    <div>
      <div>Welcome, Community Member! </div>
      <Navbar userTypeLinks={['Events Search','My Events', 'My Appointments', ]} nav={setChosenPage}/>
      
      {chosenPage==='Events Search' && <EventSearchPage /> && <EventsSection />}
      
      {chosenPage==='My Events' && <MyEvents />}
      {chosenPage==='My Appointments' && <MyAppointments/>}
    </div>
  );
}

export default MemberPage;