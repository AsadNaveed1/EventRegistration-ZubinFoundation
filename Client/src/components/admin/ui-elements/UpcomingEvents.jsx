import React from 'react';
import styled from 'styled-components';
import data from '../sample.json';

function UpcomingEvents() {
  const now = new Date();
  const upcomingEvents = data.filter(event => new Date(event.time) > now);

  return (
    <Wrapper>
      <h3>Upcoming Events</h3>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type of Event</th>
            <th>Location</th>
            <th>Date</th>
            <th>Total Members</th>
            <th>Total Volunteers</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>{event.eventType}</td>
              <td>{event.location}</td>
              <td>{new Date(event.time).toDateString()}</td>
              <td>
                {event.applicants.filter(applicant => applicant.id.includes('member')).length}
              </td>
              <td>
                {event.applicants.filter(applicant => applicant.id.includes('volunteer')).length}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 20px;
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

  th, td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }

  th {
    background-color: #6b46c1;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

export default UpcomingEvents;
