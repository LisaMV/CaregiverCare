import './Login.css'
import {GoogleButton} from 'react-google-button';
import {UserAuth} from '../context/AuthContext'

export default function Login(){
    const { googleSignIn, user } = UserAuth();
    const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
        } catch (error) {
          console.log(error);
        }
      };
    
    return(
 <div className='auth-form' >
    <h5>Login</h5>
    <GoogleButton onClick={handleGoogleSignIn} />
 
</div>
  
      
    )
}