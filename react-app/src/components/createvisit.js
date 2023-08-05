import {useState} from 'react'
import './CreateVisit.css'
export default function CreateVisit(){
    const[name,setName]=useState('')
    const[currentDate,setCurrentDate]=useState('')
    const[startTime,setStartTime]=useState('')
    const [endTime,setEndTime]=useState('')
    const[location,setLocation]=useState('')
    const [notes,setNotes]=useState('')

    const handleButtonClick=()=>{
        const now= new Date();
        const options ={year:'numeric', month:'long',day:'numeric'};
        const formattedDate=now.toLocaleDateString(undefined,options);
        setCurrentDate(formattedDate)
    };

    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(name,notes,currentDate)
    }

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
            <p className='span'>Date</p>
            <button onClick={handleButtonClick}>Show Date</button>
            {currentDate && <p>Current Date:{currentDate}</p>}

          </label>

          <label>
            <p className='span'> Notes</p>
            <textarea required type='text' onChange={(e)=>setNotes(e.target.value)}
                value={notes}></textarea>

          </label>

          <button className='btn'>Submit</button>
          </form>
        </div>
    )
}