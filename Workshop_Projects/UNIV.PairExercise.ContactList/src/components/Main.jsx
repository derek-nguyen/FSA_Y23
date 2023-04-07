import React, { useEffect, useState } from 'react';
import ContactList from './ContactList';
import SingleContact from './SingleContact';


const Main = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState({});
  
  const getContacts = async () => {

    try {
      const response = await fetch(
        'http://jsonplace-univclone.herokuapp.com/users'
      );
      const result = await response.json();

      setContacts(result);

    } catch (error) {

      console.error(error)
    }
  }

    const selectContacts = async (contactId) => {
      try {
        const response = await fetch(`http://jsonplace-univclone.herokuapp.com/users/${contactId}`);
        const contact = await response.json();
        setSelectedContact(contact);
      } catch (error) {
        console.error(error);
      }
    }
  

  useEffect(() => {
    getContacts();
  }, [])

  return (
    <div id="main">
      <div id="navbar">
        <div>Contact List</div>
      </div>
      <div id="container">
      {
        selectedContact.id ? <SingleContact selectedContact={selectedContact}/> : <ContactList contacts={contacts} selectContacts={selectContacts}/>
      }
      </div>
    </div>
  );
};

export default Main;
