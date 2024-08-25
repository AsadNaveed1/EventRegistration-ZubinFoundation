import React from 'react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import data from '../sample.json';

function UpcomingEvents() {
  const now = new Date();
  const upcomingEvents = data.filter(event => new Date(event.time) > now);

  const downloadExcel = () => {
    const formattedData = upcomingEvents.map(event => {
      const startTime = new Date(event.time);
      const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); 
      return {
        Title: event.title,
        Date: startTime.toLocaleDateString(),
        Time: `${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} to ${endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`,
        Volunteers: event.applicants.filter(applicant => applicant.id.includes('volunteer')).map(v => v.name).join(', '),
        Members: event.applicants.filter(applicant => applicant.id.includes('member')).map(m => m.name).join(', ')
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData, {
      header: ["Title", "Date", "Time", "Volunteers", "Members"],
      skipHeader: true
    });
    XLSX.utils.sheet_add_aoa(worksheet, [["Title", "Date", "Time", "Volunteers", "Members"]], { origin: "A1" });
    worksheet['!cols'] = [{ width: 20 }, { width: 15 }, { width: 20 }, { width: 30 }, { width: 30 }];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Upcoming Events");
    XLSX.writeFile(workbook, "UpcomingEvents.xlsx");
  };

  return (
    <Wrapper>
      <h3>Upcoming Events</h3>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <StyledButton onClick={downloadExcel}>
          <FontAwesomeIcon icon={faDownload} />
          &nbsp;Download Excel
        </StyledButton>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type of Event</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Total Members</th>
            <th>Total Volunteers</th>
          </tr>
        </thead>
        <tbody>
          {upcomingEvents.map((event, index) => {
            const startTime = new Date(event.time);
            const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); 
            return (
              <tr key={index}>
                <td>{event.title}</td>
                <td>{event.eventType}</td>
                <td>{event.location}</td>
                <td>{startTime.toLocaleDateString()}</td>
                <td>{`${startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} to ${endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`}</td>
                <td>
                  {event.applicants.filter(applicant => applicant.id.includes('member')).length}
                </td>
                <td>
                  {event.applicants.filter(applicant => applicant.id.includes('volunteer')).length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  margin-top: 20px;
  width: 100%;
`;

const StyledButton = styled.button`
  background-color: #4CAF50; 
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;

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

export default UpcomingEvents;