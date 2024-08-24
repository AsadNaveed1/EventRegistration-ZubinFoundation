import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt, FaClock, FaInfoCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function EventCard({ event, getDetails}) {
  return (
    <Wrapper>
      <img src={event.imageSrc} alt="Event" />
      <div className="content">
        <div className="title">
          <h2>{event.title}</h2>
          <FaInfoCircle className="icon" />
        </div>
        <div className="details">
          <div className="detail-item">
            <FaCalendarAlt className="icon" />
            <span>{event.date}</span>
          </div>
          <div className="detail-item">
            <FaClock className="icon" />
            <span>{event.time}</span>
          </div>
          <div className="detail-item">
            <FaMapMarkerAlt className="icon" />
            <span>{event.location}</span>
          </div>
        </div>
        <div className="button-container">
        <Link to={`Event/${event.id}`}> <button className="details-button"  >Details</button></Link>
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
    color: #5a67d8;
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
    margin-top: auto;
    display: flex;
    justify-content: center;
  }

  .details-button {
    background-color: #5a67d8;
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