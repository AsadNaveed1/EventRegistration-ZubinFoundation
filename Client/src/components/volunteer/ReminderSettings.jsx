import React, { useState } from 'react';

const ReminderSettings = ({ isOpen, onClose,onSubmit}) => {
  const [reminderMethod, setReminderMethod] = useState('whatsapp');
  const [frequency, setFrequency] = useState('5');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (e.g., save preferences)
    console.log(`Reminder Method: ${reminderMethod}, Frequency: ${frequency}`);
    onClose(); // Close the dialog after submission
  };

  if (!isOpen) return null; // Don't render if not open

  return (
    <div style={styles.popupDialog}>
      <h2 style={styles.header}>Reminder Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reminderMethod">Choose Reminder Method:</label>
          <select
            id="reminderMethod"
            value={reminderMethod}
            onChange={(e) => setReminderMethod(e.target.value)}
          >
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency">Choose Frequency:</label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="5">5 minutes</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </div>
        <button type="submit" onClick={()=>{onSubmit({reminderMethod,frequency})}}>Save Preferences</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

// Inline styles
const styles = {
  popupDialog: {
    position: 'fixed',
    top: '50%', // Center vertically
    left: '50%', // Center horizontally
    transform: 'translate(-50%, -50%)', // Adjust position
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // Ensure it floats above other content
  },
  header: {
    marginTop: 0, // Remove top margin
  },
};

export default ReminderSettings;