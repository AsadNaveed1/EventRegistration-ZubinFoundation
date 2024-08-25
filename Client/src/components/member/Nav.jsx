import { useState } from 'react'
import styles from "../styles/NavBar.module.css/"
import {Link, useNavigate} from 'react-router-dom'
import Home from './Home';
import logo from "../img/logo.png";
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

function Navbar({ userTypeLinks, nav }) {
    // adding the states 
    const [isActive, setIsActive] = useState(false);
    //add the active class
    const toggleActiveClass = () => {
      setIsActive(!isActive);
    };

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
          <Link to="/member/MakeAppointment">Make An Appointment</Link>
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
            <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
        </header>
      </div>
    );
  }

  export default Navbar;
  ;