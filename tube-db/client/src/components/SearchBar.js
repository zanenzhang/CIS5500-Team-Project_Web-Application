import React, { useState, useEffect, useRef } from 'react';
import searchBarIcon from '../images/searchicon.svg';
import './SearchBar.css';

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState('');
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
  }, [setSearchTerm, state]);

  return (
    <div class="Wrapper">
      <div class="SearchBar">
        <img src={searchBarIcon} alt='search-icon' class="SearchBarImg"/>
        <input class="SearchTerm"
          type='text'
          placeholder='Search Videos'
          onChange={event => setState(event.currentTarget.value)}
          value={state}
        />
      </div>
      </div>
  );
};

export default SearchBar;