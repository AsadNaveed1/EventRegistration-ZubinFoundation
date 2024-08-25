import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [open, setOpen] = useState(false);
  console.log("cry")



const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken=')).split('=')[1];

axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/appointments/')
      .then(response => {
        setAppointments(response.data);
        console.log(appointments)
      })
      .catch(error => console.error('Error fetching appointments:', error));
  }, []);  

  console.log("happy")

  const handleSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };



  const handleConfirm = () => {
    if (selectedAppointment) {
      axios.put(`/api/book/${selectedAppointment.id}/`)
        .then(response => {
          console.log('Appointment booked:', response.data);
          setOpen(true); // Open the dialog box
        })
        .catch(error => console.error('Error booking appointment:', error));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <List>
        {appointments.map((appointment) => (
          <ListItem key={appointment.id}>
            <ListItemText
              primary={`${appointment.type} - ${appointment.time}`}
              secondary={`Details: ${appointment.details}`}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => handleSelect(appointment)}
            >
              Select
            </Button>
          </ListItem>
        ))}
      </List>
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
    </div>
  );
};

export default AppointmentList;
