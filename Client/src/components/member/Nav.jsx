import { useState } from 'react'
import styles from "../styles/NavBar.module.css/"
import {Link, useNavigate} from 'react-router-dom'
import Home from './Home';

function Navbar() {
    // adding the states 
    const [isActive, setIsActive] = useState(false);
    //add the active class
    const toggleActiveClass = () => {
      setIsActive(!isActive);
    };
    //clean up function to remove the active class
    const removeActive = () => {
      setIsActive(false)
    }
    const navigate = useNavigate()
    return (
      <div className="App">
        <header className="App-header">
          <nav className={`${styles.navbar}`}>
            {/* logo */}
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
        <li>
          {/* <Link to="/member/">Home</Link> */}
          <Link to="/member/Home">Home</Link>
        </li>
        <li>
          <Link to="/member/MyEvents">My Events</Link>
        </li>
        <li>
          <Link to="/member/MyAppointments">My Appointments</Link>
        </li>
        <li>
          <Link to="/member/Profile">Profile</Link>
        </li>        
            </ul>
          </nav>
        </header>
      </div>
    );
  }

  export default Navbar;
  ;