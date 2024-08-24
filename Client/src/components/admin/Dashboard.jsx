import React from 'react';
import styled from 'styled-components';

function Dashboard() {
  return (
    <Wrapper>
      <h1>Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 60px;
  margin-left: 250px;
`;

export default Dashboard;