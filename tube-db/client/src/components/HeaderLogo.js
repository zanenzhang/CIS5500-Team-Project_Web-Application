
import React, {useState} from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import NavbarItem from './NavbarItem';
import { Nav, NavItem, NavLink } from "shards-react";
import {Menu} from 'antd';
import TubeDBLogo from '../images/Group_1.svg';

import './HeaderLogo.css';


class Header extends React.Component {
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
        <div id="header">
        <div id="headerLogo">
        <img src={TubeDBLogo} width={150} />
        </div>
        </div>
      </Nav>
    );
  }
}


export default Header;
