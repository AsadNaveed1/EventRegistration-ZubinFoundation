import React from 'react';
import styled from 'styled-components';

function MyAppointments() {
  return (
    <Container>
      <AppointmentsHeader>My appointments</AppointmentsHeader>
      <AppointmentsContainer>
        <Appointment>
          <AppointmentImage src="placeholder.jpg" alt="Mental Health Counselling" />
          <AppointmentInfo>
            <h2>Mental Health Counselling</h2>
            <p>
              Body text for whatever you'd like to say. Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
            <Button>Read More</Button>
          </AppointmentInfo>
        </Appointment>
        <Appointment>
          <AppointmentImage src="placeholder.jpg" alt="Title" />
          <AppointmentInfo>
            <h2>Title</h2>
            <p>
              Body text for whatever you'd like to say. Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
            <Button>Button</Button>
          </AppointmentInfo>
        </Appointment>
        <Appointment>
          <AppointmentImage src="placeholder.jpg" alt="Title" />
          <AppointmentInfo>
            <h2>Title</h2>
            <p>
              Body text for whatever you'd like to say. Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
            <Button>Button</Button>
          </AppointmentInfo>
        </Appointment>
      </AppointmentsContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1em;
`;

const AppointmentsHeader = styled.h1`
  text-align: left;
  margin-bottom: 1em;
`;

const AppointmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Appointment = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AppointmentImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const AppointmentInfo = styled.div`
  flex-grow: 1;
  padding: 1.5rem;

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default MyAppointments;