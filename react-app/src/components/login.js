import {signInWithGoogle} from '../Firebase'
export default function Login(){
    return(
        <div>
              <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
    )
}