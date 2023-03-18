const Filter = ({ handleFilterChange, value }) => {
  return (
    <div>
      filter: <input onChange={handleFilterChange} value={value} />
    </div>
  );
};
export default Filter;
