import { NavLink } from 'react-router-dom';
import './Sidebar.css';

import AddClient from '../assests/AddClient.svg';
import VisitIcon from '../assests/VisitIcon.svg';
import DashboardIcon from '../assests/Home.svg';
import { UserAuth } from '../context/AuthContext';
export default function Sidebar() {
  const {user}=UserAuth();
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          {!user && <p>Hey user</p>}
         {user && <p>Hey {user.displayName}</p>}
        </div>
        <nav className='link'>
          <ul>
          <NavLink  exact to='/'>
              <img src={DashboardIcon} alt='dashboard icon' />
              <span>Dashboard</span>
            </NavLink>
           
            <NavLink to='/addclients'>
              <img src={AddClient} alt='add client icon' />
              <span>Add Client</span>
            </NavLink>
            <NavLink to='/createvisit'>
              <img src={VisitIcon} alt='create visit icon' />
              <span>Create New Visit</span>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}
