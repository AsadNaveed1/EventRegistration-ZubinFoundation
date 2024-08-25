import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { List, ListItem, ListItemText, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const Container = styled.div`
  padding: 20px;
`;

const StyledList = styled(List)`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
`;

const StyledListItem = styled(ListItem)`
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const StyledButton = styled(Button)`
  margin-left: 10px;
`;
function refreshPage(){
  window.location.reload();
}
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch CSRF token from cookies
  const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];
  axios.defaults.headers.common['X-CSRFToken'] = csrfToken;

  // Fetch appointments from the API
  useEffect(() => {
    axios.get('http://localhost:5001/api/appointments/')
      .then(response => {
        setAppointments(response.data);
        console.log('Fetched appointments:', response.data);
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);

  // Handle appointment selection
  const handleSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Handle appointment confirmation
  const handleConfirm = () => {
    if (selectedAppointment) {
      axios.put(`http://localhost:5001/api/book/${selectedAppointment.id}/`)
        .then(response => {
          console.log('Appointment booked:', response.data);
          setOpen(true); // Open the dialog box
        })
        .catch(error => console.error('Error booking appointment:', error));
    }
  };

  // Handle dialog close
  const handleClose = () => {
    setOpen(false);
    refreshPage();
  };

  return (
    <Container>
      <StyledList>
        {appointments.map((appointment) => (
          <StyledListItem key={appointment.id}>
            <ListItemText
              primary={`${appointment.type} - ${appointment.time}`}
              secondary={`Details: ${appointment.details}`}
            />
            <StyledButton 
              variant="contained" 
              color="primary" 
              onClick={() => handleSelect(appointment)}
            >
              Select
            </StyledButton>
          </StyledListItem>
        ))}
      </StyledList>
      {selectedAppointment && (
        <div>
          <Typography variant="h6">Selected Appointment:</Typography>
          <Typography>{`${selectedAppointment.type} - ${selectedAppointment.time}`}</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleConfirm}
          >
            Confirm Booking
          </Button>
        </div>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Appointment Confirmed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your appointment has been confirmed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppointmentList;
