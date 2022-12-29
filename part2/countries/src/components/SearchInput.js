const SearchInput = ({query, handleQueryChange}) => {
  return (
    <label>
      find countries <input value={query} onChange={handleQueryChange} />
    </label>
  );
};
export default SearchInput;
