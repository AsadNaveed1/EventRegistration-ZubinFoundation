import styled from 'styled-components';
import {Outlet} from "react-router-dom"

import React, { useState } from 'react';

const MakeAppointment = () => {
  const [appointments, setAppointments] = useState([
    { time: '09:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '12:00 PM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '04:00 PM', available: true },
  ]);

  const handleBooking = (index) => {
    const newAppointments = [...appointments];
    newAppointments[index].available = !newAppointments[index].available;
    setAppointments(newAppointments);
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.time}</td>
              <td>{appointment.available ? 'Available' : 'Booked'}</td>
              <td>
                {appointment.available ? (
                  <button onClick={() => handleBooking(index)}>Book</button>
                ) : (
                  <button onClick={() => handleBooking(index)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MakeAppointment