import React, {useState} from 'react';
// import './Grid.css';
import './ChannelsHeader.css';
import HeaderLogo from '../components/HeaderLogo';
// import SearchBar from '../components/SearchBar';
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


class ChannelsHeader extends React.Component {

    render(){
        return(
          <div className="chanHeadBar">

            <div className="chanHeaderLogo">
                <HeaderLogo />
            </div>

            <div className="chanHeaderExLogo">
                <h1 className='chanPageTitle'>Channel Search</h1>
            </div>
            
          </div>
        )
    }
}

export default ChannelsHeader


