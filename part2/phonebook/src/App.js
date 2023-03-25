import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Error from "./components/Error";
import servicePersons from "./services/persons";
import "./index.css"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  const setNotification = (type, message) => {
    if (type==="normal") {
      setSuccessNotification(message)
      setTimeout(() => {
        setSuccessNotification(null)
      }, 5000)}
    else if (type==="error") {
      setErrorNotification(message)
      setTimeout(() => {
        setErrorNotification(null)
      }, 5000)}
  }

  const getAllPersons = () => {
    servicePersons.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  useEffect(getAllPersons, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    const exist = persons.find(({ name }) => name === newName)
    if (!exist) {
      const newPerson = { name: newName, number: newNumber };
      servicePersons
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNotification("normal", `${newPerson.name} added to Phonebook`)
        })
        .catch(error => {
          setNotification("error", error.response.data.error)})

      
    } else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const replacedPerson = { ...exist, number: newNumber }
        servicePersons
          .replace(exist.id, replacedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id === exist.id ? returnedPerson : person))
            setNotification(`${returnedPerson.name}'s number changed to ${returnedPerson.number}`)
          })
          .catch(error => {
            setNotification("error", error.response.data.error)})
      };
    }
    setNewName("");
    setNewNumber("");
  };

  const handleDeleteButtonClick = (id) => {
    const name = persons.find((e) => e.id === id).name;
    if (window.confirm(`Do you want to remove ${name} from the Phonebook?`)) {
      servicePersons
        .remove(id)
        .then(setPersons(persons.filter((p) => p.id !== id)))
        setNotification("normal", `${name} deleted from Phonebook`)
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
      <Notification message={successNotification}/>
      <Error message={errorNotification}/>
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
