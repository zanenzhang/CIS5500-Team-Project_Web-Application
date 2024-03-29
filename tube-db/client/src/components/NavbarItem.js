import React from "react";
import "./NavbarItem.css";
import navitemLogo from '../images/view-grid@2x.svg';

function NavbarItem(props) {
  const { text, className } = props;

  return (
    <div className>
    <div className="nav-item">
      <img className="view-grid" src={navitemLogo} />
      <div className="text">{text}</div>
    </div>
    </div>
  );
}

export default NavbarItem;