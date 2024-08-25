import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function TrainingPage() {
  const [user, setUser] = useState('');
  const [modules, setModules] = useState([]);

  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`user/find_user/${userId}`);
        console.log("response", res);
        setUser(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetch();
  }, [userId]);

  useEffect(() => {
    if (user.registered_events) {
      const mod2 = user.registered_events.map(x => ({
        title: x.title,
        link: x.learning_materials
      }));

      let temp = mod2;
      if (user.completed_materials) {
        temp = temp.filter(x => !user.completed_materials.includes(x.link));
      }
      temp = temp.filter(x => x.link);
      console.log('temp', temp);
      setModules(temp);
    }
  }, [user]);

  const handleLinkClick = (link) => {
    console.log('link', link);
    axios.post('user/complete_materials', {
      user_id: userId,
      completed_materials: [link]
    });

    // Open the link in a new tab
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.leftHeader}>Training Modules</div>
      </div>
      {modules.map((module) => (
        <div key={module.link} style={styles.listItem}>
          <div style={styles.left}>
            <span style={styles.exclamation}>!</span> {/* Exclamation mark instead of image */}
            <div>
              <h3 style={styles.title}>{module.title}</h3>
              <a 
                href={module.link} 
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  handleLinkClick(module.link); // Call your custom function
                }} 
                style={styles.link}
              >
                Complete the module
              </a>
            </div>
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
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '20px 0',
    fontSize: '1.3em',
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  exclamation: {
    fontSize: '2em', // Size of the exclamation mark
    marginRight: '15px', // Adjust margin for spacing
    color: 'red' // You can style it as needed
  },
  title: {
    margin: 0,
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '1.1em',
  },
};

export default TrainingPage;