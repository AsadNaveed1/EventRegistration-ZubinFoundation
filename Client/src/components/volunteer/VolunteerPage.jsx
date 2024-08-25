import React,{useState} from 'react';
import Navbar from '../shared/Navbar';
import { Outlet } from 'react-router-dom';
function VolunteerPage() {
 const routes= [
  {title:'Events Search',
    link:''
  },
  {title:'My Events',
    link:'MyEvents'
  },
  {title:'Trainings',
    link:'Training'
  },
]
  return (
    <div>
    <Navbar routes={routes} />
     <Outlet></Outlet>

    </div>
  );
}

export default VolunteerPage;