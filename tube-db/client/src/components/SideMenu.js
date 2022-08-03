import React, {useState} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import NavbarItem from './NavbarItem';
import { Nav, NavItem, NavLink } from "shards-react";
import {Menu} from 'antd';
import Navbar from './Navbar';
import HeaderLogo from './HeaderLogo';

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
    <>
      <div className="navigation">
      <Navbar />
      </div>
    </>
     
    );
  }
}

export default SideMenu;



