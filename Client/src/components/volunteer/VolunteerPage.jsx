import React from 'react';
import Navbar from '../shared/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer.jsx';
import styled from 'styled-components';
function VolunteerPage() {
 const routes= [
  {title:'Events Search',
    link:''
  },
  {title:'My Events',
    link:'MyEvents'
  },
  {title:'Trainings',
    link:'Training'
  },
]
  return (
    <>
    <PageContainer>
      <Navbar routes={routes} />
      <Outlet/>
    </PageContainer>
      <Footer/>
      </>
  );
}
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
`;
export default VolunteerPage;

