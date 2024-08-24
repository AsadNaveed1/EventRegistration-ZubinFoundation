import React from 'react';
import styled from 'styled-components';

function Applicants({ event, onClose }) {
  const [showVolunteers, setShowVolunteers] = React.useState(true);
  const applicants = showVolunteers ? event.applicants.filter(applicant => applicant.id.startsWith('volunteer')) : event.applicants.filter(applicant => applicant.id.startsWith('member'));

  return (
    <Wrapper>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <ToggleButtons>
        <button onClick={() => setShowVolunteers(true)}>Volunteers</button>
        <button onClick={() => setShowVolunteers(false)}>Members</button>
      </ToggleButtons>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant, index) => (
            <tr key={index}>
              <td>{applicant.id}</td>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.phone}</td>
              <td>{applicant.city}</td>
              <td>{applicant.gender}</td>
              <td>{applicant.age}</td>
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
  width: calc(100% - 270px); 
`;

const CloseButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #5a67d8;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const ToggleButtons = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  button {
    padding: 10px 20px;
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

export default Applicants;