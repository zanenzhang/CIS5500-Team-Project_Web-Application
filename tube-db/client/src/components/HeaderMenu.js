
import React, {useState} from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import NavbarItem from './NavbarItem';
import './HeaderMenu.css';


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
      <Nav justified>
          <div className='header-labels'>
          <NavbarItem text="Saved Videos" />
        <NavItem >
          <NavLink href="#">Saved Videos</NavLink>
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
        </div>
      </Nav>
    );
  }
}


export default HeaderMenu;
