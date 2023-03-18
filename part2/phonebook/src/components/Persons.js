const Persons = ({ showPersons, handleClick }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {showPersons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}{" "}
              <button onClick={() => handleClick(person.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Persons;
