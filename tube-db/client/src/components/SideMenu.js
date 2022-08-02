
import React, {useState} from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import NavbarItem from './NavbarItem';
import { Nav, NavItem, NavLink } from "shards-react";
import {Menu} from 'antd';

import './SideMenu.css';


class SideMenu extends React.Component {
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
        <div className="sideMenuBar">
          <div className='header-labels'>
          <NavbarItem text="Saved Videos" href="#"/>
          <NavbarItem text="Trending Videos" href="#"/>
          <a className='menuItem' href='./topchannels'><NavbarItem text="Channels"/></a>
          <NavbarItem text="Profile" href="#"/>
        </div>
        </div>
      </Nav>
    );
  }
}


export default SideMenu;
