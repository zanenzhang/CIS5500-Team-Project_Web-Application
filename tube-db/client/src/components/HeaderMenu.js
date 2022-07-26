
import React, {useState} from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Nav, NavItem, NavLink } from "shards-react";
import {Menu} from 'antd';
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
          <NavItem>
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
