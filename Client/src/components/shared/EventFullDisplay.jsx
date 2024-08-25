import React from 'react';
import { Link,useParams } from 'react-router-dom';

function EventFullDisplay() {
  const { id } = useParams();
  const eventList = [
    { id: 1,
      imageSrc:"../img/Img1.png",
      title:"Charity Event",
      date:"April 15, 2023",
      time:"10:00 AM - 2:00 PM",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      location:"City Park, New York"},
      {id: 2,imageSrc:"../img/Img2.png",
        title:"Fundraising Event",
        date:"May 10, 2023",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time:"10:00 AM - 2:00 PM",
        location:"Community Center, Los Angeles"},
      {id: 3,imageSrc:"../img/Img2.png",
        title:"Fundraising Event",
        date:"May 10, 2023",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        time:"10:00 AM - 2:00 PM",
        location:"Community Center, Los Angeles"},
      ]
      const selectedEvent = eventList.find(x => x.id === Number(id));
      console.log(id)
      return (
        <div>
        <Link to='/volunteer' style={{marginTop:30,marginLeft:30}}>
        <button style={styles.backButton}>Back</button>
    </Link>
        <div style={styles.container}>
           
            <div style={styles.content}>
                <div style={styles.columnLeft}>
                    <div style={styles.rectangle}></div>
                    <div style={styles.details}>
                        <p><strong>Time:</strong> {selectedEvent.time}</p>
                        <p><strong>Date:</strong> {selectedEvent.date}</p>
                        <p><strong>Venue:</strong> {selectedEvent.location}</p>
                    </div>
                </div>
                <div style={styles.columnRight}>
                    <h2>{selectedEvent.title}</h2>
                    <p>{selectedEvent.description}</p>
                    <Link to='/volunteer'>
                        <button style={styles.registerButton} onClick={() => { console.log('registered') }}>Register</button>
                    </Link>
                </div>
            </div>
        </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column', // Stack back button above columns
        alignItems: 'center', // Center horizontally
        justifyContent: 'center', // Center vertically
        height: '80vh', // Full height of the viewport
        padding: '20px',
        boxSizing: 'border-box',
    },
    content: {
        display: 'flex',
        flexDirection: 'row', // Maintain two-column layout
        width: '100%',
        maxWidth: '1200px', // Optional: limit max width
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
        padding: '5px 10px',
        backgroundColor: '#ccc',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '20px', // Space below the back button
    },
    registerButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px', // Space above the register button
    },
};

export default EventFullDisplay;