import React from 'react';
import styled from 'styled-components';

function Applications() {
  return (
    <Wrapper>
      <h1>Applications</h1>
      <p>View and manage applications here.</p>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 60px;
  margin-left: 250px;
`;

export default Applications;