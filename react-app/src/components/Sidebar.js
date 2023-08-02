import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import CalendarIcon from '../assests/CalendarIcon.svg';
import AddClient from '../assests/AddClient.svg';
import VisitIcon from '../assests/VisitIcon.jpg';
import DashboardIcon from '../assests/Home.svg';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        <div className='user'>
          <p>Hey user</p>
        </div>
        <nav className='link'>
          <ul>
          <NavLink  exact to='/'>
              <img src={DashboardIcon} alt='dashboard icon' />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to='/calendar'>
              <img src={CalendarIcon} alt='calendar icon' />
              <span>Calendar</span>
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
