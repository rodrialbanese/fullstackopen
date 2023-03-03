const Form = ({
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
  handleButtonClick,
}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button onClick={handleButtonClick} type="submit">
          add
        </button>
      </div>
    </form>
  );
};

export default Form;
