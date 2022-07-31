import React from 'react';
import './Grid.css';
import HeaderLogo from '../components/HeaderLogo';
import SearchBar from '../components/SearchBar';
import {
    Table,
    Pagination,
    Select
  } from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class HeaderBar extends React.Component {

    render(){
        return(
            <div id="headerBar">
            
            <div id="headerLogo">
              <HeaderLogo />
            </div>
            <div id="headerContent">
              <SearchBar />
              <Select defaultValue="United States" style={{ width: 200 }} onChange="">
              <Option value="Brazil">Brazil</Option>
                <Option value="Canada">Canada</Option>
                <Option value="France">France</Option>
                <Option value="Germany">Germany</Option>
                <Option value="India">India</Option>
                <Option value="Japan">Japan</Option>
                <Option value="Mexico">Mexico</Option>
                <Option value="Russia">Russia</Option>
                <Option value="SouthKorea">South Korea</Option>
                <Option value="UnitedKingdom">United Kingdom</Option>
                <Option value="UnitedStates">United States</Option>
              </Select>
            </div>
          </div>
        )
    }
}

export default HeaderBar


