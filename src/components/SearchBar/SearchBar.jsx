import React, { useState, useCallback } from "react";
import "./SearchBar.css";

const  SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search by name

  // const handleSearch = () => {
  //   if (!query.trim()) return;
  //   onSearch(query, searchType);
  // };

  // better to use useCallback to memoize the function and break it out instead of having it inline
  const handleQueryChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  // better to use useCallback to memoize the function and break it out instead of having it inline

  const handleSearchTypeChange = useCallback((e) => {
    setSearchType(e.target.value);
  }, []);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault(); // Prevent default form submission
      if (!query.trim()) return; // Check if query is empty
      onSearch(query, searchType); // Call the onSearch prop with the query and search type
    },
    [query, searchType, onSearch] // Add dependencies to the useCallback hook
  );

  return (
    // <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
    <form className="search-bar" onSubmit={handleSearch}>
      {/* don't need to have a key-up event here, just use the onChange event 
      added arial-label for accessibility */        
      }

      <input
        type="text"
        placeholder="Search recipes..."
        value={query}
        // onChange={(e) => setQuery(e.target.value)}
        // onKeyUp={(e) => e.key === "Enter" && handleSearch()}
        onChange={handleQueryChange}
        aria-label="Search input"
      />
      <select 
        value={searchType} 
        // onChange={(e) => setSearchType(e.target.value)}
        onChange={handleSearchTypeChange}
        aria-label="Search type"
      >
        <option value="name">By Name</option>
        <option value="ingredient">By Ingredient</option>
        <option value="letter">By First Letter</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
