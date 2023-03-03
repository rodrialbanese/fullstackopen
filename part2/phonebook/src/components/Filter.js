const Filter = ({ handleFilterChange, value }) => {
  console.log(handleFilterChange, value);
  return (
    <div>
      filter: <input onChange={handleFilterChange} value={value} />
    </div>
  );
};
export default Filter;
