import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import  {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBUVl4fjswMPG-jEOz2zIJQtH4Gx9il8CI",
  authDomain: "caregivercare-ae44c.firebaseapp.com",
  projectId: "caregivercare-ae44c",
  storageBucket: "caregivercare-ae44c.appspot.com",
  messagingSenderId: "689401268884",
  appId: "1:689401268884:web:4f704f70db8c334eb48281"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};

/*const provider = new GoogleAuthProvider ();

export const signInWithGoogle = () =>{
    signInWithPopup (auth,provider)
    .then ((result)=>{
        const name=result.user.displayName;
        const email=result.user.email;

        localStorage.setItem('name',name);
        localStorage.setItem('email',email)
    })
    .catch((error)=>{
        console.log(error);
    });
};

export const logOut =()=>{

    signOut(auth)
}

//init firestore
const projectFirestore=getFirestore()

//init firebase auth
const projectAuth=getAuth()

export {projectFirestore,projectAuth}*/