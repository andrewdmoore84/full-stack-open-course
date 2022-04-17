import { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/filter';
import PersonForm from './components/personform';
import Persons from './components/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('name to add');
  const [ newNumber, setNewNumber ] = useState('phone number');
  const [ filterBy, setFilterBy ] = useState('');
  const [ showAllContacts, setShowAllContacts ] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const contactsToShow = showAllContacts
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()));

  const handleAddContact = (event) => {
    event.preventDefault();

    // alert user and avoid adding duplicate contact
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already in phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
      setNewName('name to add');
      setNewNumber('phone number');
    }
  };

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);

    if (filterBy === '') {
      setShowAllContacts(true);
    } else {
      setShowAllContacts(false);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filterBy={filterBy}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add new contact</h3>

      <PersonForm
        handleAddContact={handleAddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Contacts</h3>

      <Persons
        contactsToShow={contactsToShow}
      />
    </div>
  );
}

export default App;
