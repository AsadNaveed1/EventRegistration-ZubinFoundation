import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function EventCard({ event }) {
  const randomImage = event.imageSrc;

  // Splitting the datetime string
  const [date, time] = event.start_datetime.split('T'); // Assuming start_datetime is the datetime string

  return (
    <Wrapper>
      <img src={randomImage} alt="Event" />
      <div className="content">
        <div className="title">
          <h2>{event.title}</h2>
        </div>
        <div className="details">
          <div className="detail-item">
            <span>Date:</span>
            <span>{date}</span> {/* Displaying the date */}
          </div>
          <div className="detail-item">
            <span>Time:</span>
            <span>{time}</span> {/* Displaying the time */}
          </div>
          <div className="detail-item">
            <span>Location:</span>
            <span>{event.location}</span>
          </div>
          <div className="detail-item">
            <span>Event Type:</span>
            <span>{event.interests}</span>
          </div>
        </div>
        <div className="button-container">
          <Link to={`Event`} state={{ event_id: event.event_id }}>
            <button className="details-button">Details</button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 300px; 
  text-align: left;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title h2 {
    font-size: 20px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .icon {
    font-size: 20px;
    color: #00a9ff;
  }

  .details {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .detail-item {
    display: flex;
    align-items: center;
  }

  .detail-item span {
    margin-left: 10px;
    font-size: 16px;
    color: #555;
  }

  .button-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .details-button {
    background-color: #00a9ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .details-button:hover {
    background-color: #434190;
  }
`;

export default EventCard;