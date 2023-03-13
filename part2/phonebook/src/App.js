import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import servicePersons from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const getAllPersons = () => {
    console.log("vino");
    servicePersons.getAll().then((persons) => {
      console.log(persons);
      setPersons(persons);
    });
  };

  useEffect(getAllPersons, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (!persons.find(({ name }) => name === newName)) {
      const newPerson = { name: newName, number: newNumber };
      servicePersons
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeleteButtonClick = (id) => {
    const name = persons.find((e) => e.id === id).name;
    if (window.confirm(`Do you want to remove ${name} from the Phonebook?`)) {
      servicePersons
        .remove(id)
        .then(setPersons(persons.filter((p) => p.id !== id)));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const showPersons = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={filter} />
      <Form
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleButtonClick={handleButtonClick}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons
        showPersons={showPersons}
        handleClick={handleDeleteButtonClick}
      />
    </div>
  );
};

export default App;
