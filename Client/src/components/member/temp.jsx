import { useState } from 'react'
import styles from "../styles/NavBar.module.css"
import EventSearchPage from '../volunteer/EventSearchPage';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

function Navbar() {

    return (
      
      <div className="App">
        <header className="App-header">
          <nav className={`${styles.navbar}`}>
            {/* logo */}
            {/* <a href='#home' className={`${styles.logo}`}>Dev. </a> */}
            <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
              <li onClick={removeActive}>
                {/* <Link to="/" className={`${styles.navLink}`}>
                  Home
                </Link> */}
                <a href='#home' className={`${styles.navLink}`}>Home</a>
              </li>
              <li onClick={removeActive}>
                {/* <Link to="/my-events" className={`${styles.navLink}`}>
                  My Events
                </Link> */}
                <a href='#home' className={`${styles.navLink}`}>My Events</a>
              </li>
              <li onClick={removeActive}>
              {/* <Link to="/my-appointments" className={`${styles.navLink}`}>
                  My Appointments
                </Link> */}
                <a href='#home' className={`${styles.navLink}`}>My Appointments</a>
              </li>
              <li onClick={removeActive}>
              {/* <Link to="/profile" className={`${styles.navLink}`}>
                  Profile
                </Link> */}
                <a href='#home' className={`${styles.navLink}`}>Profile</a>
              </li>
            </ul>
            <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`}  onClick={toggleActiveClass}>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
              <span className={`${styles.bar}`}></span>
            </div>
          </nav>
        </header>
        {/* <Switch>
          <Route path="/my-events">
            <MyEvents />
          </Route>
          <Route path="/my-appointments">
            <MyAppointments />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch> */}
      </div>);
    {/* </Router> */}
  }
  export default Navbar;
  ;

//   <li onClick={removeActive}>
//   {/* <CustomLink to="/Home">Home</CustomLink> */}
//   <a href='/member/Home' className={`${styles.navLink}`}>Home</a>
// </li>
// <li onClick={removeActive}>
// {/* <CustomLink to="/MyEvents">MyEvents</CustomLink> */}
//   <a href='#home' className={`${styles.navLink}`}>My Events</a>
// </li>
// <li onClick={removeActive}>
// {/* <CustomLink to="/MyAppointments">MyAppointments</CustomLink> */}
//   <a href='#home' className={`${styles.navLink}`}>My Appointments</a>
// </li>
// <li onClick={removeActive}>
//   {/* <CustomLink to="/Profile">Profile</CustomLink> */}
//   <a href='#home' className={`${styles.navLink}`}>My Profile</a>
// </li>