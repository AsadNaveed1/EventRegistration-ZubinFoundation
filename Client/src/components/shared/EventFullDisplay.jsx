import React from 'react';

function EventFullDisplay({ event, getDetails, register}) {
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={()=>{getDetails('')}}>Back</button>
      
      <div style={styles.columnLeft}>
        {/* <img src={event.image} alt="Event" style={styles.image} /> */}
        <div style={styles.rectangle}></div> 
        <div style={styles.details}>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Venue:</strong> {event.venue}</p>
        </div>
      </div>
      <div style={styles.columnRight}>
        <h2>{event.title}</h2>
        <br/>
        <br></br>
        <p>{event.description}</p>
        <br/>
        <br/>
        <br/>
        <br/>

        <button style={styles.registerButton} onClick={()=>{getDetails(''); register(event.id)}}>Register</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  columnLeft: {
    flex: '0 0 30%',
    paddingRight: '20px',
    boxSizing: 'border-box',
  },
  columnRight: {
    flex: '0 0 70%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  rectangle: {
    width: '100%', // Full width
    height: '200px', // Adjust height as needed
    backgroundColor: '#ccc', // Color for the rectangle
    marginBottom: '10px', // Space between rectangle and details
  },
  details: {
    marginTop: '10px',
  },
  backButton: {
    position: 'absolute',
    top: '100px',
    left: '100px',
    padding: '5px 10px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  registerButton: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default EventFullDisplay;