import React from 'react';
import Navbar from '../shared/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Home from './Home.jsx'
import Footer from '../shared/Footer.jsx';
import styled from 'styled-components';


// // Define the routes for the Navbar
// const memberRoutes = [
//   { title: 'Home', link: '/member' },
//   { title: 'My Events', link: '/member/MyEvents' },
//   { title: 'My Appointments', link: '/member/MyAppointments' },
//   { title: 'Make An Appointment', link: '/member/MakeAppointment' },
//   { title: 'Profile', link: '/member/Profile' },
// ];



// const Layout = ({ children}) => {
//   return (
//     <PageContainer>
//       <Navbar routes={memberRoutes} />
//       <MainContent>{children}</MainContent>
//       <Footer />
//     </PageContainer>
//   );
// };

export default Layout;


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;