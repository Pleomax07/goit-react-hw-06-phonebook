import { nanoid } from 'nanoid';
import React from 'react';
import { ContactForm }from './ContactForm/ContactForm';
import ContactFilter from './ContactFilter/ContactFilter';
import ContactList from './ContactList/ContactList';
import { useState, useEffect } from 'react';

const LS_KEY = 'contactsItem';
export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedContacts) {
      setContacts(savedContacts);
       // console.log({ contacts });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = (name, number) => {
    const contactName = contacts.map(contact => contact.name);
    if (contactName.includes(name)) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts([...contacts, { id: nanoid(3), name, number }]);
  }

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const deleteContact = idContact => {
    setContacts(contacts.filter(contact => contact.id !== idContact));
  };
 
   

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
 
  return (
    <>
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
      </div>
      <div>
        <h2>Contacts</h2>
        <ContactFilter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </>
  );
}
