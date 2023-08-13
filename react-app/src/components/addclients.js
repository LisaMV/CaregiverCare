import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import './AddClient.css'
import {db} from '../Firebase'
import { collection,addDoc,onSnapshot } from 'firebase/firestore';



// Styling for the modal
const modalStyles = {
  content: {
    width: '300px',
    margin: 'auto',
    textAlign: 'center',
    height:'300px',
  },
};

Modal.setAppElement('#root');

 //Your component
function AddClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clients, setClients] = useState([]); // Array to store clients

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFirstName('');
    setLastName('');
  };

  const handleEnter = async () => {
    const newClient = { firstName, lastName };
    const clientsRef = collection(db, 'clients'); // Reference to the Firestore collection

    try {
      await addDoc(clientsRef, newClient); // Add the new client data to Firestore
      handleCloseModal();
    } catch (error) {
      console.error('Error adding client: ', error);
    }
  };

useEffect(() => {
    const clientsRef = collection(db, 'clients');
    const unsubscribe = onSnapshot(clientsRef, snapshot => {
      const updatedClients = snapshot.docs.map(doc => doc.data());
      setClients(updatedClients);
    });
  });


  return (
    <div>
      {clients.length > 0 && (
        <div>
          <h2 className='header-client'>Clients List</h2>
          <ul className="client-table">
            {clients.map((client, index) => (
              <li key={index} className="client-row">
                <span className="client-cell">{client.firstName}</span>
                <span className="client-cell">{client.lastName}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="btn1" onClick={handleOpenModal}>
        Add Client
      </button>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} style={modalStyles}>
        <h2>Add Client</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button onClick={handleEnter}>Enter</button>
      </Modal>
    </div>
  );
}

export default AddClient;