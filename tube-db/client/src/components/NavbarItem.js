import React from "react";
import "./NavbarItem.css";

function NavbarItem(props) {
  const { text, className } = props;

  return (
    <div className={`nav-item border-1px-black ${className || ""}`}>
      <img className="view-grid" src="/img/view-grid@2x.svg" />
      <div className="text inter-medium-pearl-lusta-18-7px">{text}</div>
    </div>
  );
}

export default NavbarItem;