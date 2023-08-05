       
import { Link } from 'react-router-dom';
import Logo from '../assests/logo.jpg';
import './Navbar.css'
import { UserAuth } from '../context/AuthContext';

export default function Navbar(){
    const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='header'>
      <div className='Logo'>
        <img src={Logo} alt='logo' />
        <span>CaregiverCare</span>
      </div>

      {user?  (
        <button id='btn' onClick={handleSignOut}>
          Logout
        </button>
      ) : (
        <Link to='/login'>Login</Link>
      )}
    </div>
  );
}