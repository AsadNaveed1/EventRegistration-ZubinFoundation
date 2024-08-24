import React,{useState} from 'react';
import ReminderSettings from './ReminderSettings';

function MyEventCard({ event,getDetails }) {
  const [showSettings, setShowSettings]=useState(false)
  const handleSettings = ()=>{
    setShowSettings(false)
  }
  const handleSubmit = (val)=>{
    setShowSettings(false)
    console.log(val)
  }
  return (
    <div style={styles.card}>
      {/* <img src={event.image} alt={event.title} style={styles.image} /> */}
      <div style={styles.rectangle}></div> 
      <div style={styles.content}>
         <div style={styles.topRight}><h2>{event.title}</h2>
        <div>
            <label >
              Remind Me
              <input type="checkbox" style={styles.switch} />
            </label>
            <button style={styles.optionsButton} onClick={()=>{setShowSettings(true)}}>⋮</button></div>
            <ReminderSettings isOpen={showSettings} onClose={handleSettings} onSubmit={handleSubmit}/>
          </div>
          <div style={{textAlign:'left'}}> 
        <p style={styles.description}>{event.description}</p>
        </div>
        <div style={{textAlign:'left'}}> 
        <button style={styles.readMore} onClick={getDetails}>Read More</button>
        </div>
        <div style={styles.bottomRow}>
          <button style={styles.cancelButton}>Cancel</button>
         
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
  },
  rectangle: {
    width: '10%', // Full width
    height: '200px', // Adjust height as needed
    backgroundColor: '#ccc', // Color for the rectangle
    marginBottom: '10px',
    marginRight:'10px' // Space between rectangle and details
  },
  image: {
    width: '100px',
    height: '100px',
    marginRight: '10px',
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  description: {
    fontSize: '0.9em',
    color: '#555',
  },
  readMore: {
    marginTop: '10px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  bottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10px',
  },
  cancelButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  topRight: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'space-between'

  },
  switch: {
    marginLeft: '5px',
    marginRight: '10px',

  },
  optionsButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5em',
    cursor: 'pointer',
    
  },
};

export default MyEventCard;