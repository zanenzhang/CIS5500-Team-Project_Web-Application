import React, {useState} from 'react';
import './Grid.css';
import './FavoritedHeader.css';
import HeaderLogo from './HeaderLogo';
import SearchBar from './SearchBar';
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


class FavoritedHeader extends React.Component {

    render(){
        return(
          <div className="headerBar">

            <div className="headerLogo">
                <HeaderLogo />
            </div>

            <div className="headerExLogo">
                <h1 className='pageTitle'>Favorited Videos</h1>
            </div>
            
          </div>
        )
    }
}

export default FavoritedHeader


