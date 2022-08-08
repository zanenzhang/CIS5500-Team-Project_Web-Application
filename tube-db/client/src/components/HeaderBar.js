import React, {useState} from 'react';
import './Grid.css';
import './HeaderBar.css';
import HeaderLogo from '../components/HeaderLogo';
import SearchBar from '../components/SearchBar';
import { DatePicker, Space } from 'antd';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
    Table,
    Pagination,
    Select,
    Slider,
    Row,
    Col,
    Input
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

const dateFormat = 'YYYY-MM-DD';
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;

const HeaderBar =({removeOffsetAndUpdate,handleCountryChange, handleUpdateTrendStart, 
  handleUpdateTrendStop, handleVideoTitleString, handleChannelTitleString, 
  handleTagString, handleUpdatePublishStart, handleUpdatePublishStop})=> {

  const [currentCountry, setCurrentCountry] = useState("United States");
  const [videoTitle, setVideoTitle] = useState('');
  const [channelTitle, setChannelTitle] = useState('');
  const [tagString, setTagString] = useState('');

  const changeCountry = event => {
    setCurrentCountry(event);
    handleCountryChange(event);
  }

  const changeTrendingDates = (date, dateString) => {
    handleUpdateTrendStart(dateString[0]);
    handleUpdateTrendStop(dateString[1]);
  };

  const changePublishedDates = (date, dateString) => {
    handleUpdatePublishStart(dateString[0]);
    handleUpdatePublishStop(dateString[1]);
  };

  const changeVideoTitleString = (event) => {
    console.log(event.target.value);
    setVideoTitle(event.target.value);
    handleVideoTitleString(event.target.value);
  };

  const changeChannelTitleString = (event) => {
    console.log(event.target.value);
    setChannelTitle(event.target.value);
    handleChannelTitleString(event.target.value);
  };

  const changeTagString = (event) => {
    console.log(event.target.value);
    setTagString(event.target.value);
    handleTagString(event.target.value);
  };

  const updateSearch = (event) =>{
    removeOffsetAndUpdate(0);
  }

  return(
    <div className="headerBar">
        <div className="headerLogo">
          <HeaderLogo />
        </div>

        <div className="headerExLogo">

              <div className="headerSearch">
              <Row>
                  <Col span={8}>
                      <Row>
                          <Col span={9}>
                              <p className='videoTitleSearch'>Video Title Includes: </p>
                          </Col>
                          <Col span={15}>
                              <Input value={videoTitle} placeholder="type here" onChange={changeVideoTitleString}/>
                          </Col>
                      </Row>
                      
                  </Col>
              
                  <Col span={8}>
                      <Row>
                          <Col span={9}>
                              <p className='channelTitleSearch'>Channel Title Includes: </p>
                          </Col>
                          <Col span={15}>
                              <Input value={channelTitle} placeholder="type here" onChange={changeChannelTitleString}/>
                          </Col>
                      </Row>
                      
                  </Col>
              
                  <Col span={8}>
                      <Row>
                          <Col span={9}>
                              <p className='tagSearch'>Tag Keyword Includes: </p>
                          </Col>
                          <Col span={15}>
                              <Input value={tagString} placeholder="type here" onChange={changeTagString}/>
                          </Col>
                      </Row>
                      
                  </Col>
              </Row>
              </div>
        
              <div className="headerSelectors">
              <Row>
                  <Col span={8}>
                          <Row>
                              <Col span={9}>
                                  <p className='countrySelectText'>Country: </p>
                              </Col>
                              <Col span={15}>
                              <Select value={currentCountry} id="countrySelector" onChange={changeCountry} >
                              {countryData.map((country) => (<Option key={country} value={country}>{country}</Option>))}
                              </Select>
                              </Col>
                          </Row>
                          
                      </Col>

                      <Col span={8}>
                          <Row>
                              <Col span={9}>
                                  <p className='selectTrendingDates'>Trending Dates: </p>
                              </Col>
                              <Col span={15}>
                              <RangePicker
                                defaultValue={[moment('2020-08-01', dateFormat), moment('2022-06-20', dateFormat)]}
                              format={dateFormat} onChange={changeTrendingDates}
                              />
                              </Col>
                          </Row>
                          
                      </Col>

                      <Col span={8}>
                          <Row>
                              <Col span={9}>
                                  <p className='selectPublishDates'>Publish Date: </p>
                              </Col>
                              <Col span={15}>
                              <RangePicker
                              format={dateFormat} onChange={changePublishedDates}
                              />
                              </Col>
                          </Row>
                          
                      </Col>

              </Row>
              </div>

              <div class="submitSearch">
              <button id="submitVideoSearch" onClick={updateSearch}>Submit Search</button>
              </div>
                  
              </div>
        
  </div>
  )     
};

export default HeaderBar;


