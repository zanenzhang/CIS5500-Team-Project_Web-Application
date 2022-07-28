import React, { useState, useEffect, useRef } from 'react';
import searchBarIcon from '../../images/searchbar.png';

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState('');
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 800);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
      <div id="searchbar">
        <img src={searchBarIcon} alt='search-icon' />
        <input
          type='text'
          placeholder='Search Movie'
          onChange={event => setState(event.currentTarget.value)}
          value={state}
        />
      </div>
  );
};

export default SearchBar;