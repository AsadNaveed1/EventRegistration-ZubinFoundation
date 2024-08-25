import React from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';

function TotalMembers({ totalMembers }) {
  return (
    <Card>
      <div className="info">
        <h3>Members</h3>
      </div>
      <div className="details">
        <FaUser className="icon" />
        <span className="number">{totalMembers}</span>
      </div>
      <a href="#" className="more">View more...</a>
    </Card>
  );
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 200px;
  margin: 20px;
  display: inline-block;
  vertical-align: top;

  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .percent {
    color: #ff0000;
    font-size: 14px;
  }

  .details {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }

  .icon {
    font-size: 24px;
    color: #8884d8;
    margin-right: 10px;
  }

  .number {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }

  .more {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    color: #888;
    font-size: 14px;
  }
`;

export default TotalMembers;