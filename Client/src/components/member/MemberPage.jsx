import React from 'react';
import Navbar from './Nav';
import { Outlet, Navigate } from 'react-router-dom';
import Home from './Home';

function MemberPage() {
  return (
    <div>
      <Navbar/>  
      <Outlet/>
    </div>
  );
}

export default MemberPage;