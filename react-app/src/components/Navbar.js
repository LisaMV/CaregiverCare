       
import { Link } from 'react-router-dom';
import Logo from '../assests/logo.jpg';
import './Navbar.css'

export default function Navbar(){
    return (
        <div className='header'>
           <div className='Logo'>
           <img  src={Logo} alt='logo'/>
            <span >CaregiverCare</span>
           </div>
    
            <Link to='/login'>Login</Link>
            <button id='btn'>Logout</button>
        </div>

    )
            
        
        
    
    
}