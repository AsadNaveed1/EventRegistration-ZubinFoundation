// features/EventFilter.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

function EventFilter({ onFilterChange }) {
  const [interests, setInterests] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');

  const handleInterestsChange = (event) => {
    setInterests(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleFilterSubmit = () => {
    onFilterChange({ interests, age, gender, location });
  };

  return (
    <FilterWrapper>
      <div className="filter-group">
        <label>Interests:</label>
        <select
          value={interests}
          onChange={handleInterestsChange}
        >
          <option value="">All</option>
          <option value="mental health">Mental Health</option>
          <option value="women and girls">Women and Girls</option>
          <option value="careers">Careers</option>
          <option value="emergency relief">Emergency Relief</option>
          <option value="family">Family</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Age:</label>
        <input type="text" value={age} onChange={handleAgeChange} placeholder="e.g., 18-60" />
      </div>
      <div className="filter-group">
        <label>Gender:</label>
        <select value={gender} onChange={handleGenderChange}>
          <option value="">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="filter-group">
        <label>Location:</label>
        <select value={location} onChange={handleLocationChange}>
          <option value="">All</option>
          <option value="Hong Kong Island">Hong Kong Island</option>
          <option value="TST">TST</option>
          <option value="Mong Kok">Mong Kok</option>
          <option value="Central">Central</option>
        </select>
      </div>
      <button onClick={handleFilterSubmit}>Apply Filters</button>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0px;
    flex: 1;
    min-width: 150px;

    label {
      font-size: 16px;
      color: #333;
      margin-bottom: 5px;
    }

    select,
    input {   padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 14px;
    }
  }

  button {
    padding: 10px 20px;
    background-color: #00a9ff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

  }
`;

export default EventFilter;