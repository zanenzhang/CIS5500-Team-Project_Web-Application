import React from 'react';
import './Grid.css';

const Grid = ({ header, children }) => (
  <div id="Wrapper">
    <h1>{header}</h1>
    <div id="Content">{children}</div>
  </div>
);

export default Grid;