import React,{useState} from 'react';
import Navbar from '../shared/Navbar';
import EventSearchPage from './EventSearchPage';
import TrainingPage from './TrainingPage';
import MyEventsPage from './MyEventsPage';
import EventsSection from './EventsSection';

function VolunteerPage() {
  const [chosenPage, setChosenPage] = useState('Events Search');

  return (
    <div>
    <Navbar userTypeLinks={['Events Search','My Events', 'Trainings']} nav={setChosenPage}/>
     
      {chosenPage==='Events Search' && <EventSearchPage /> && <EventsSection />}
    {chosenPage==='My Events' && <MyEventsPage />}
    {chosenPage==='Trainings' && <TrainingPage />}

    </div>
  );
}

export default VolunteerPage;