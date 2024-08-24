import React from 'react';
import { useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';
import { Outlet } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();

  return (
    <div>
      <SideNavbar />
      <TopNavbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPage;