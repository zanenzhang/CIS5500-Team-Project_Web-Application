import TubeDBLogo from '../images/logo4.png';
import React, {useState} from 'react';

import { Nav, NavItem, NavLink } from "shards-react";


class HeaderMenu extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render () {
    return (
      <Nav>
        <NavItem>
          <NavItem>
          <img src={TubeDBLogo} width={120} />
          </NavItem>
        </NavItem>
        <NavItem>
          <NavLink href="#">Trending Videos</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#">Channels</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#">Profile</NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default HeaderMenu;
