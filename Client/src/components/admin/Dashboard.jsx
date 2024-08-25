import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TotalUpcomingEvents from './ui-elements/TotalUpcomingEvents';
import TotalVolunteers from './ui-elements/TotalVolunteers';
import TotalMembers from './ui-elements/TotalMember';
import PopularEvent from './ui-elements/PopularEvent';
import UpcomingEvents from './ui-elements/UpcomingEvents';
import data from './sample.json'; 

function Dashboard() {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalMembers, setTotalMembers] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const now = new Date();
    const upcomingEvents = data.filter(event => new Date(event.time) > now);

    setTotalEvents(upcomingEvents.length);
    setUpcomingEvents(upcomingEvents);

    let volunteersCount = 0;
    let membersCount = 0;

    upcomingEvents.forEach(event => {
      event.applicants.forEach(applicant => {
        if (applicant.id.includes('volunteer')) {
          volunteersCount++;
        } else if (applicant.id.includes('member')) {
          membersCount++;
        }
      });
    });

    setTotalVolunteers(volunteersCount);
    setTotalMembers(membersCount);
  }, []);

  return (
    <Wrapper>
      <div className="content">
        <div className="card-container">
          <TotalUpcomingEvents totalEvents={totalEvents} />
          <TotalVolunteers totalVolunteers={totalVolunteers} />
          <TotalMembers totalMembers={totalMembers} />
        </div>
        <PopularEvent events={upcomingEvents} />
      </div>
      <UpcomingEvents />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 60px;
  margin-left: 250px;

  .content {
    display: flex;
    gap: 20px;
    align-items: center; 
  }

  .card-container {
    display: flex;
    gap: 20px;
  }
`;

export default Dashboard;