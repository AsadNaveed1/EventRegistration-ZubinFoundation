import React from 'react';
import Navbar from '../shared/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer.jsx';
import styled from 'styled-components';
import {Button} from '@mui/material'
import {Link} from 'react-router-dom'


// Define the routes for the Navbar
const memberRoutes = [
  { title: 'Home', link: '/member' },
  { title: 'My Events', link: '/member/MyEvents' },
  { title: 'My Appointments', link: '/member/MyAppointments' },
  { title: 'Make An Appointment', link: '/member/MakeAppointment' },
];

const StyledButton = styled(Button)`
  margin-left: 10px;
`;

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



