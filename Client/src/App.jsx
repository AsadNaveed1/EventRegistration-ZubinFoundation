import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import VolunteerPage from './components/volunteer/VolunteerPage';
import MemberPage from './components/member/MemberPage';
import AdminPage from './components/admin/AdminPage';
import Dashboard from './components/admin/Dashboard';
import AddEvent from './components/admin/AddEvent';
import ManageEvents from './components/admin/ManageEvents';
import Applications from './components/admin/Applications';
import Home from './components/member/Home';
import MyEvents from './components/member/MyEvents';
import MyAppointments from './components/member/MyAppointments';
import Profile from './components/member/Profile';
import './App.css';
import MakeAppointment from './components/member/MakeAppointment';
import EventsSection from './components/volunteer/EventsSection';
import AppointmentList from './components/member/AppointmentList';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} >
            <Route path="MyEvents" element={<MyEventsPage />} />
            <Route path="" element={<div><EventSearchPage /><EventsSection/></div>} />
            <Route path="Training" element={<TrainingPage />} />
            <Route path="Event/:id" element={<EventFullDisplay />} />
          </Route>
          <Route path="/member" element={<MemberPage />}>
            <Route path="Home" element={<Home/>} />
            <Route path="MyEvents" element={<MyEvents/>} />
            <Route path="MyAppointments" element={<MyAppointments/>} />
            <Route path="Profile" element={<Profile/>} />
            <Route path ="MakeAppointment" element={<MakeAppointment/>}/>
            <Route path="AppointmentList" element={<AppointmentList/>}/>
          </Route>
          {/* <Route path="" element={<div><EventSearchPage /><EventsSection/></div>} /> */}
          <Route path="/admin" element={<AdminPage />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addevent" element={<AddEvent />} />
            <Route path="manageevents" element={<ManageEvents />} />
            <Route path="applications" element={<Applications />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;