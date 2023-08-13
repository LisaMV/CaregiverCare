import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, getDocs } from 'firebase/firestore';
import './Dashboard.css'
import {doc,updateDoc,deleteDoc} from 'firebase/firestore'

function Dashboard() {
    const [visits, setVisits] = useState([]);
   const [editingVisit,setEditingVisit]=useState(null);
   const [editedNotes, setEditedNotes] = useState('');

    useEffect(() => {
        const fetchVisits = async () => {
            const visitCollectionRef = collection(db, 'visits');
            const snapshot = await getDocs(visitCollectionRef);
            const visitData = snapshot.docs.map((doc) => {
                const data = {
                    id: doc.id,
                    ...doc.data(),
                };
                console.log("Visit Data:", data); // Log the data to see its structure
                return data;
            });
            setVisits(visitData);
        };
        fetchVisits();
    }, []);

    const calculateDuration = (startTime, endTime) => {
        const start = startTime.seconds * 1000;
        const end = endTime.seconds * 1000;
        const durationInSeconds = (end - start) / 1000;
        return (durationInSeconds / 3600).toFixed(2); // Duration in hours
    };

    const [expandedVisit, setExpandedVisit] = useState(null);

    const toggleVisitDetails = (visitId) => {
        if (expandedVisit === visitId) {
            setExpandedVisit(null); // Hide details if clicking on the same visit
        } else {
            setExpandedVisit(visitId);
            // Scroll to the details row
            const detailsRow = document.getElementById(`details-row-${visitId}`);
            if (detailsRow) {
                detailsRow.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleEditVisit = (visitId) => {
        setEditingVisit(visitId);
        const visit = visits.find((v) => v.id === visitId);
        setEditedNotes(visit.notes);

    };
    
    const handleSaveNotes = async (visitId) => {
        // Update the notes in the database
        const visitRef = doc(db, 'visits', visitId);
        await updateDoc(visitRef, { notes: editedNotes });
    
        // Update the local state
        setEditingVisit(null);
        setVisits((prevVisits) =>
            prevVisits.map((visit) =>
                visit.id === visitId ? { ...visit, notes: editedNotes } : visit
            )
        );
    };

    const handleDeleteVisit = async (visitId) => {
        // Delete the visit from the database
        const visitRef = doc(db, 'visits', visitId);
        await deleteDoc(visitRef);

        // Update the local state by filtering out the deleted visit
        setVisits((prevVisits) => prevVisits.filter((visit) => visit.id !== visitId));
    };

    return (
        <div className='dashboard'>
            <h2>Created Visits</h2>
            <table className='visit-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {visits.map((visit) => (
                        <React.Fragment key={visit.id}>
                            <tr className='visit-row' onClick={() => toggleVisitDetails(visit.id)}>
                                <td>{visit.name}</td>
                                <td>{new Date(visit.currentDate).toLocaleDateString()}</td>
                                <td>{new Date(visit.startTime.seconds * 1000).toLocaleTimeString()}</td>
                                <td>{new Date(visit.endTime.seconds * 1000).toLocaleTimeString()}</td>
                                <td>
                                    <button onClick={(e) => {
                                        e.stopPropagation(); // Prevent toggling details when clicking delete
                                        handleDeleteVisit(visit.id);
                                    }}>Delete</button>
                                </td>

                         

                            </tr>
                         
                            {expandedVisit === visit.id && (
    <tr className='visit-details-row' id={`details-row-${visit.id}`}>
        <td colSpan="4">
            <div className='visit-details'>
                {editingVisit === visit.id ? (
                    <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                    />
                ) : (
                    <p>Notes: {visit.notes}</p>
                )}
                <p>Duration: {calculateDuration(visit.startTime, visit.endTime)} hours</p>
                <p>Location:{visit.location}</p>
            </div>
            <div className='edit-buttons'>
                {editingVisit === visit.id ? (
                    <>
                        <button onClick={() => handleSaveNotes(visit.id)}>Save</button>
                        
                    </>
                ) : (
                    <button onClick={() => handleEditVisit(visit.id)}>Edit Notes</button>
                )}
            </div>
        </td>
    </tr>
)}
                        </React.Fragment>
                        
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Dashboard;
