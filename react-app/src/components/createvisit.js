import {useState,useRef,useEffect} from 'react'
import './CreateVisit.css'
import { UserAuth } from '../context/AuthContext'
import {useJsApiLoader,GoogleMap,Marker,Autocomplete} from '@react-google-maps/api'
import { serverTimestamp } from 'firebase/firestore';
import {db } from '../Firebase';
import { collection,addDoc } from 'firebase/firestore';


const libraries=['places'];
export default function CreateVisit(){

  const {user}=UserAuth();

    const[name,setName]=useState('')
    const[currentDate,setCurrentDate]=useState('')
    const[startTime,setStartTime]=useState(null);
    const [endTime,setEndTime]=useState(null)
    const[location,setLocation]=useState('')
    const[map,setMap] =useState(/**@type google.maps.Map */(null))
    const [notes,setNotes]=useState('')
    const [selectedLocation,setSelectedLocation]=useState(null);

    const originRef=useRef()

    const handleButtonClick=()=>{
        const now= new Date();
        const options ={year:'numeric', month:'long',day:'numeric'};
        const formattedDate=now.toLocaleDateString(undefined,options);
        setCurrentDate(formattedDate)
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const createBy = {
          displayName: user.displayName,
          id: user.uid
        };

        try{
          const visitCollectionRef =collection(db,'visits');
          await  addDoc (visitCollectionRef,{
            name,
            currentDate,
            startTime,
            endTime,
            location,
            notes,
            createBy,
            timestamp:serverTimestamp(),
          });

          console.log('Visit data saved to Firestore')
        } catch (error) {
          console.error('Error saving visit data:',error);
        }
      };


  


    const updateTime=(isStartTime)=>{
     const currentTime =new Date();
     if(isStartTime){
      setStartTime(currentTime);
     }else{
      setEndTime(currentTime);
     }
    };

    useEffect(()=>{
      if (selectedLocation){
        console.log('Selected Location',selectedLocation);
      }
    },[selectedLocation]);

    const handlePlaceSelect =()=>{
      const addressObject =originRef.current.getPlace();
      if (addressObject.geometry){
        const selectedLat =addressObject.geometry.location.lat();
        const selectedLng =addressObject.geometry.location.lng ();
        setSelectedLocation({lat:selectedLat,lng:selectedLng});
      }
      
    };



    const {isLoaded,loadError} = useJsApiLoader({
      googleMapsApiKey:'AIzaSyDFkZs79zY3-7h5dAKuzEjeKt68W2Ok6Lw',
      libraries:libraries,
    });

    if (loadError){
      return <div>Error loading Google Maps API</div>
    }

    if (!isLoaded){
      return (
        <div>Loading...</div>
      )

    }

    const center= selectedLocation||{lat:48.8584, lng:2.2945};

    return(
        <div className='create-visit'>
          <h2 className='page-title'>Create a new visit</h2>
          <form onSubmit={handleSubmit}>
          <label>
            <p className='span'>Client Name</p>
            <input required type='text' onChange={(e)=>setName(e.target.value)}
                value={name}/>

          </label>

          <label>
           
            {currentDate && <p>Current Date:{currentDate}</p>}

            <button onClick={handleButtonClick}> Date</button>

          </label>

          <label>
           
          {startTime ? (
          <p>Current time:{''} {startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          ) : (
            <p>Click the button to show the time.</p>
          )}
          <button onClick={()=>updateTime(true)} disabled={startTime !==null}>StartTime</button>
          </label>

          <label>
            <p className='span'>Location</p>
            <Autocomplete onLoad={autoComplete => originRef.current=autoComplete}
            onPlaceChanged={handlePlaceSelect}>
              <input required tpe='text' placeholder='Enter address' value={location} onChange={e=>setLocation(e.target.value)}/>
            </Autocomplete>
          </label>

          <div style ={{height:'300px', width:'100%'}}>
         <GoogleMap center={center} zoom={13} onLoad={map =>setMap(map)}
         mapContainerStyle={{height:'100%',width:'100%'}}>
          {selectedLocation && <Marker position={selectedLocation}/>}
         </GoogleMap>
          </div>
          <label>
         
          {endTime? (
          <p>Current time: {endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          ) : (
            <p>Click the button to show the time.</p>
          )}
          <button onClick={()=>updateTime(false)} disabled={endTime !==null}>EndTime</button>
          </label>

          <label>
            <p className='span'> Notes</p>
            <textarea  className='notes'required type='text' onChange={(e)=>setNotes(e.target.value)}
                value={notes}></textarea>

          </label>

          <button type= 'submit' className='btn'>Submit</button>
          </form>
        </div>
    )
}