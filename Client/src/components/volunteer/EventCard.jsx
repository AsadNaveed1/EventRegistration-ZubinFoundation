import React from 'react';

function EventCard({ image, title, description }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.content}>
         <div style={styles.topRight}><h2>{title}</h2>
<div>
            <label >
              Remind Me
              <input type="checkbox" style={styles.switch} />
            </label>
            <button style={styles.optionsButton}>⋮</button></div>
          </div>
        <p style={styles.description}>{description}</p>
        <button style={styles.readMore}>Read More</button>
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

export default EventCard;