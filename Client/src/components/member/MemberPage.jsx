import React from 'react';
import Navbar from '../shared/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Home from './Home.jsx'
import Footer from '../shared/Footer.jsx';
import EventSection from './EventSection.jsx';
import styled from 'styled-components';


// Define the routes for the Navbar
const memberRoutes = [
  { title: 'Home', link: '' },
  { title: 'My Events', link: 'MyEvents' },
  { title: 'My Appointments', link: 'MyAppointments' },
  { title: 'Make An Appointment', link: 'MakeAppointment' },
  { title: 'Profile', link: 'Profile' },
];

function MemberPage() {
  return (
    <>
    <PageContainer>
      <Navbar routes={memberRoutes} />
      <Outlet/>
    </PageContainer>
      <Footer/>
      </>

  );
};

export default MemberPage;


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;



