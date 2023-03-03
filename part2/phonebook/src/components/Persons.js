const Persons = ({ showPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {showPersons.map((person) => (
            <li key={person.name}>
              {person.name} {person.number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Persons;
