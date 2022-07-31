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
              <RangePicker style={{width: 250}} />
              <div id="slider" style={{width: 250}}>
              <IconSlider min={0} max={20} />;
              </div>
            </div>
          </div>
        )
    }
}

export default HeaderBar


