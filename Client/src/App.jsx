import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import VolunteerPage from './components/volunteer/VolunteerPage';
import MemberPage from './components/member/MemberPage';
import AdminPage from './components/admin/AdminPage';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/volunteer" element={<VolunteerPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import react from "react"
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
// import Login from "./pages/Login"
// import Register from "./pages/Register"
// import Home from "./pages/Home"
// import NotFound from "./pages/NotFound"
// import ProtectedRoute from "./components/ProtectedRoute"

// function Logout() {
//   localStorage.clear()
//   return <Navigate to="/login" />
// }

// function RegisterAndLogout() {
//   localStorage.clear()
//   return <Register />
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/register" element={<RegisterAndLogout />} />
//         <Route path="*" element={<NotFound />}></Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App