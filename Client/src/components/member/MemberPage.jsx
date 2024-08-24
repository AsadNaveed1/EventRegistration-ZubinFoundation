import React from 'react';
import Navbar from './Nav';;
import { Outlet } from 'react-router-dom';

function MemberPage() {
  return (
    <div>
      <Navbar/>
      <Outlet />
    </div>
  );
}

export default MemberPage;