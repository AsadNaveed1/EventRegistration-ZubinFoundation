// import styled from 'styled-components';
// import {Outlet} from "react-router-dom"

// function Home() {
//     return <div>
//     Hello
//     </div>
        
// }
// const Wrapper = styled.div`
//   padding: 20px;
//   margin-top: 100px;
//   margin-left: 250px;
// `;

// export default Home

import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import EventCard from '../shared/EventCard';
import EventFullDisplay from '../shared/EventFullDisplay';


function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [gender, setGender] = useState('');

  const handleSearch = () => {

    console.log('Search Query:', searchQuery);
    console.log('Event Type:', eventType);
    console.log('Gender:', gender);
  };

  return (
    <Wrapper>
      <HeroSection>
        <div className="container">
          <h1>
            Signup for <span>Events</span>
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Find your events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>
              <FaSearch />
            </button>
          </div>
          <div className="filters">
            <div className="filter">
              <label>Event Type:</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="">All</option>
                <option value="online">Families</option>
                <option value="offline">Mental Health</option>
              </select>
            </div>
            <div className="filter">
              <label>Gender:</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </HeroSection>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HeroSection = styled.div`
  background-color: #f8f9fa;
  padding: 60px 20px;
  text-align: center;
  width: 100%;

  .container {
    max-width: 900px;
    width: 100%;
    margin: 0 auto;
  }

  h1 {
    font-size: 36px;
    color: #333;
    margin-bottom: 10px;

    span {
      color: #00a9ff;
    }
  }

  p {
    color: #666;
    margin-bottom: 40px;
  }

  .search-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;

    input {
      width: 70%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 25px 0 0 25px;
      margin-right: -1px;
      font-size: 16px;
    }

    button {
      padding: 12px 20px;
      background-color: #00a9ff;
      color: #fff;
      border: none;
      border-radius: 0 25px 25px 0;
      cursor: pointer;
      font-size: 16px;

      svg {
        vertical-align: middle;
      }
    }
  }

  .filters {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;

    .filter {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;

      label {
        font-size: 16px;
        color: #555;
      }

      select {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
      }
    }
  }
`;

export default Home;