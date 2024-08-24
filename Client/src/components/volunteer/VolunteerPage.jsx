import React,{useState} from 'react';
import Navbar from '../shared/Navbar';
import EventSearchPage from './EventSearchPage';
import TrainingPage from './TrainingPage';
import MyEventsPage from './MyEventsPage';
import EventsSection from './EventsSection';
function VolunteerPage() {
  const [chosenPage, setChosenPage] = useState('Events Search');
 const trainModules = [
  {
    id: 1,
    image:"/assets/Final-Women-and-Girls-2-1.png",
    title:"how to properly make tea",
    link:'https://www.youtube.com/watch?v=F898rbUvzV4&pp=ygUQaG93IHRvIG1ha2UgdGVhIA%3D%3D',
    status:false

  },
  {
    id: 2,
    image:"/assets/Final-Women-and-Girls-2-1.png",
    title:"how to properly make tea",
    link:'https://www.youtube.com/watch?v=F898rbUvzV4&pp=ygUQaG93IHRvIG1ha2UgdGVhIA%3D%3D',
    status:true

  },
  {
    id: 3,
    image:"/assets/Opportunities-2.png",
    title:"how to interview properly",
    link:'https://www.youtube.com/watch?v=WDOQBPYEaNs&pp=ygUQaG93IHRvIGludGVydmlldw%3D%3D',
    status:false

  },
 ]
  return (
    <div>
    <Navbar userTypeLinks={['Events Search','My Events', 'Trainings']} nav={setChosenPage}/>
     
      {chosenPage==='Events Search' && <EventSearchPage /> && <EventsSection />}
    {chosenPage==='My Events' && <MyEventsPage />}
    {chosenPage==='Trainings' && <TrainingPage modules ={trainModules}/>}

    </div>
  );
}

export default VolunteerPage;