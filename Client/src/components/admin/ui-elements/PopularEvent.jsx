import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PopularEvent({ events }) {

  const topEvents = events
    .map(event => ({
      name: event.title,
      volunteers: event.applicants.filter(applicant => applicant.id.includes('volunteer')).length,
      members: event.applicants.filter(applicant => applicant.id.includes('member')).length,
    }))
    .sort((a, b) => (b.volunteers + b.members) - (a.volunteers + a.members))
    .slice(0, 4);

  return (
    <Card>
      <h3>Top 4 Popular Events</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={topEvents}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="volunteers" fill="#8884d8" name="Volunteers" />
          <Bar dataKey="members" fill="#82ca9d" name="Members" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 600px;
  margin: 20px;
  display: inline-block;
  vertical-align: top;

  h3 {
    margin-bottom: 20px;
  }
`;

export default PopularEvent;