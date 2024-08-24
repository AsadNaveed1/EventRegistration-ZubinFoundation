import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';
import Applicants from './admin-actions/Applicants';
import sampleData from './sample.json';

function Applications() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const eventsPerPage = 10;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const combinedEvents = [...sampleData, ...storedEvents];
    setEvents(combinedEvents.sort((a, b) => new Date(b.time) - new Date(a.time)));
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const isUpcoming = (date) => new Date(date) > new Date();

  return (
    <Wrapper>
      <SearchBar>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={handleSearchChange}
        />
        <button>Filter: Newest to Oldest</button>
      </SearchBar>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type of Event</th>
            <th>Location</th>
            <th>Date of Event</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event, index) => (
            <tr key={index}>
              <td>{event.title}</td>
              <td>{event.eventType}</td>
              <td>{event.location}</td>
              <td>{new Date(event.time).toDateString()}</td>
              <td>
                <StatusBadge upcoming={isUpcoming(event.time)}>
                  {isUpcoming(event.time) ? 'Upcoming' : 'Old'}
                </StatusBadge>
              </td>
              <td>
                <ActionButton onClick={() => handleViewEvent(event)}><FaEye /></ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {[...Array(Math.ceil(filteredEvents.length / eventsPerPage)).keys()].map(number => (
          <button key={number} onClick={() => handlePageChange(number + 1)}>
            {number + 1}
          </button>
        ))}
      </Pagination>
      {selectedEvent && <Applicants event={selectedEvent} onClose={handleCloseEvent} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-left: 270px; /* Adjusted for the side navbar width */
  margin-top: 60px;
  width: calc(100% - 270px); /* Adjusted for the side navbar width */
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  input {
    padding: 10px;
    width: 70%;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #5a67d8;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

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

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  font-size: 18px;
  color: #333;

  &:hover {
    color: #5a67d8;
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 12px;
  color: white;
  background-color: ${({ upcoming }) => upcoming ? '#28a745' : '#6c757d'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    margin: 0 5px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #e9ecef;
    }
  }
`;

export default Applications;