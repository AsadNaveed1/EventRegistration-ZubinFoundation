import React from 'react';

function TrainingPage({ modules }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.leftHeader}>Training Modules</div>
        <div style={styles.rightHeader}>Status</div>
      </div>
      {modules.map((module) => (
        <div key={module.id} style={styles.listItem}>
          <div style={styles.left}>
            <img src={module.image} alt={module.title} style={styles.image} />
            <div>
              <h3 style={styles.title}>{module.title}</h3>
              <a href={module.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Complete the module
              </a>
            </div>
          </div>
          <div style={styles.right}>
            <input type="checkbox" 
              checked={module.status} 
              disabled />
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  leftHeader: {
    flex: 1,
    textAlign: 'left',
  },
  rightHeader: {
    width: '100px',
    textAlign: 'right',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '20px 0', // Increased padding for larger item
    fontSize: '1.3em', // Larger font size
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: '70px', // Increased image width
    height: '70px', // Increased image height
    marginRight: '15px', // Adjust margin for spacing
  },
  title: {
    margin: 0, // Remove default margin for h3
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1.1em', // Slightly larger font size for link
  },
  right: {
    width: '100px',
    textAlign: 'right',
  },
};

export default TrainingPage;