import React, {useState} from 'react';
import './Grid.css';
import './HeaderBar.css';
import HeaderLogo from '../components/HeaderLogo';
import SearchBar from '../components/SearchBar';
import { DatePicker, Space } from 'antd';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import {
    Table,
    Pagination,
    Select,
    Slider
  } from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;

const IconSlider = (props) => {
const { max, min } = props;
const [value, setValue] = useState(0);
const mid = Number(((max - min) / 2).toFixed(5));
const preColorCls = value >= mid ? '' : 'icon-wrapper-active';
const nextColorCls = value >= mid ? 'icon-wrapper-active' : '';
return (
    <div className="icon-wrapper">
    <FrownOutlined className={preColorCls} />
    <Slider {...props} onChange={setValue} value={value} />
    <SmileOutlined className={nextColorCls} />
    </div>
);
};

const countryData = ['Brazil', 'Canada', 'France', 'Germany', 'India', 'Japan', 'Mexico', 'Russia', 'South Korea', 'United Kingdom', 'United States'];

const HeaderBar =({handleCountryChange, handleUpdateVideos})=> {

  const [currentCountry, setCurrentCountry] = useState("United States");

  const changeCountry = event => {
    setCurrentCountry(event);
    handleCountryChange(event);
  }

  return(
    <div className="headerBar">
        <div className="headerLogo">
          <HeaderLogo />
        </div>

        <div className="headerExLogo">

          <div className="headerSearch">
            <SearchBar />
          </div>
        
          <div className="headerSelectors">

          <Select value={currentCountry} id="countrySelector" onChange={changeCountry} >
          {countryData.map((country) => (<Option key={country} value={country}>{country}</Option>))}
          </Select>

              <RangePicker />
              <div>
              <button id="submitVideoSearch" onClick={handleUpdateVideos}>Submit Search</button>
              </div>
              
            </div>
          </div>
    </div>
  )     
};

export default HeaderBar;


