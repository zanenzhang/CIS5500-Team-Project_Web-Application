
import React, {useState} from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import NavbarItem from './NavbarItem';
import { Nav, NavItem, NavLink } from "shards-react";
import {Menu} from 'antd';
import TubeDBLogo from '../images/Group_1.svg';

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
        <div id="sideMenu">
        <div id="headerLogo">
        <img src={TubeDBLogo} width={150} />
        </div>
          <div className='header-labels'>
          <NavbarItem text="Saved Videos" href="#"/>
          <NavbarItem text="Trending Videos" href="#"/>
          <NavbarItem text="Channels" href="#"/>
          <NavbarItem text="Profile" href="#"/>
        </div>
        </div>
      </Nav>
    );
  }
}


export default SideMenu;
