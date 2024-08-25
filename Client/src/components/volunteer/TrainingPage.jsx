import React,{useState,useEffect}from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';


function TrainingPage() {
  const [user,setUser]=useState('');
  const { userId } = useParams();
  console.log(userId)
  useEffect(() => {
    const fetch = async () => {
      try {
        // Use the correct endpoint and include the event ID in the URL
        console.log("response")
        const res = await axios.get(`user/find_user/${userId}`)
        
        setUser(res.data)
      } catch (error) {
        console.error('Error fetching events:', error);
        // Fallback to Sample.json on error, if you have it imported
        // setEventList(data); // Uncomment if you have Sample.json data
      }
    };

    fetch();
  }, []);
  const modules = user.registered_events
  .map(x => ({ title: x.title, image: x.image, link: x.learninglink })) // Use parentheses for object
  .filter(x => !user.completed_materials.includes(x.link));

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