import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSearchClick = () => {
    setShowSearchInput((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setShowSearchInput(false);
  };

  useEffect(() => {
    if (showSearchInput && inputRef.current) {
      inputRef.current.focus(); // Focus the input when it is shown
    }
  }, [showSearchInput]);

  return (
    <div className="search d-flex align-items-center">
      <button
        onClick={handleSearchClick}
        aria-label="Search"
        className="btn btn-outline-dark"
        aria-expanded={showSearchInput}
      >
        <FaSearch />
      </button>
      {showSearchInput && (
        <form className="search-input-container ml-2" onSubmit={handleSearchSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by Name,Email"
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
          />
        </form>
      )}
    </div>
  );
};

export default Search;
