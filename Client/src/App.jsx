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
import './App.css';
import EventFullDisplay from './components/shared/EventFullDisplay';
import TrainingPage from './components/volunteer/TrainingPage';
import MyEventsPage from './components/volunteer/MyEventsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} >
            <Route path="myevents" element={<MyEventsPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="event" element={<EventFullDisplay />} />
          </Route>
          <Route path="/member" element={<MemberPage />} />
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