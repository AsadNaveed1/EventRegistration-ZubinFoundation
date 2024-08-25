import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import EventFilter from '../member/features/EventFilter';
import EventSection from './EventsSection';


function Landing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState('');
  const [filters, setFilters] = useState({
    interests: [],
    age: '',
    gender: '',
    location: '',
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setEventType(newFilters.eventType || ''); 
  };


  return (
  

    <Wrapper>
      <HeroSection>
        <div className="container">
          <h1>
           Volunteer for <span>Events</span>
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Find your events..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button>
              <FaSearch />
            </button>
          </div>
          <EventFilter onFilterChange={handleFilterChange} />
        </div>
      </HeroSection>
      <EventSection searchQuery={searchQuery} eventType={eventType} />
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
`;

export default Landing;