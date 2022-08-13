import React, {useState} from 'react';
import './Grid.css';
import './HeaderBar.css';
import HeaderLogo from '../components/HeaderLogo';
import ComboBox from '../components/Autocomplete';
import { DatePicker, Space } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { SearchOutlined } from '@ant-design/icons';
import searchBarIcon from '../images/searchicon.svg';
import {
    Table,
    Select,
    Slider,
    Row,
    Col,
    Input,
    Button
  } from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;
const { RangePicker } = DatePicker;


const countryData = ['Brazil', 'Canada', 'France', 'Germany', 'India', 'Japan', 'Mexico', 'Russia', 'South Korea', 'United Kingdom', 'United States'];
const languageData = ['Select','Albanian', 'Arabic', 'Armenian', 'Bengali', 'Bhojpuri', 'Bosnian', 'Bulgarian', 'Catalan', 'Chichewa', 
    'Chinese', 'Croatian', 'Czech', 'Dutch', 'English', 'Estonian', 'Filipino', 'French', 'Georgian', 'German', 'Greek', 'Hebrew', 
    'Hindi', 'Hungarian', 'Indian', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Korean', 'Malay', 'Malayalam', 'Marathi', 'Nepali', 
    'Norwegian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 
    'Swedish', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'];
const dateFormat = 'YYYY-MM-DD';

const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;

const HeaderBar =({removeOffsetAndUpdate,handleCountryChange, handleUpdateTrendStart, 
  handleUpdateTrendStop, handleVideoTitleString, handleChannelTitleString, 
  handleTagString, handleUpdatePublishStart, handleUpdatePublishStop, handleUpdateViewsLow,
  handleUpdateViewsHigh, handleUpdateLikesLow, handleUpdateLikesHigh, handleUpdateDislikesLow, 
  handleUpdateDislikesHigh, handleUpdateCommentsLow, handleUpdateCommentsHigh,
handleLanguageChange, handleUpdateSubscribersLow, handleUpdateSubscribersHigh,
handleUpdateLibraryLow, handleUpdateLibraryHigh, handleCategoryString})=> {

  const [currentCountry, setCurrentCountry] = useState("United States");
  const [currentLanguage, setCurrentLanguage] = useState("Select");
  const [videoTitle, setVideoTitle] = useState('');
  const [channelTitle, setChannelTitle] = useState('');
  const [tagString, setTagString] = useState('');
  const [categoryString, setCategoryString] = useState('');

  const changeCountry = event => {
    setCurrentCountry(event);
    handleCountryChange(event);
  }

  const changeLanguage = event => {
    console.log(event)
    setCurrentLanguage(event);
    handleLanguageChange(event);
  }

  const changeTrendingDates = (date, dateString) => {
    console.log(dateString)
    handleUpdateTrendStart(dateString[0]);
    handleUpdateTrendStop(dateString[1]);
  };

  const changeViews = event => {
    console.log(event)
    handleUpdateViewsLow(event[0]);
    handleUpdateViewsHigh(event[1]);
  };

  const changeLikes = event => {
    console.log(event)
    handleUpdateLikesLow(event[0]);
    handleUpdateLikesHigh(event[1]);
  };

  const changeDislikes = event => {
    console.log(event)
    handleUpdateDislikesLow(event[0]);
    handleUpdateDislikesHigh(event[1]);
  };

  const changeComments = event => {
    console.log(event)
    handleUpdateCommentsLow(event[0]);
    handleUpdateCommentsHigh(event[1]);
  };

  const changeSubscribers = event => {
    console.log(event)
    handleUpdateSubscribersLow(event[0]);
    handleUpdateSubscribersHigh(event[1]);
  };

  const changeLibrarySize = event => {
    console.log(event)
    handleUpdateLibraryLow(event[0]);
    handleUpdateLibraryHigh(event[1]);
  };

  const changePublishedDates = (date, dateString) => {
    console.log(dateString)
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

  const changeCategoryString = (event, value) => {
    console.log(event.target.value);
    console.log(value);
    setCategoryString(event.target.value);
    handleCategoryString(event.target.value);
  };

  const updateSearch = (event) =>{
    removeOffsetAndUpdate(0);
  }

  function numFormatter(num) {
    let absNum = num;
    
    if(num < 0){
        absNum = Math.abs(num);
    }
    if(absNum >= 1000 && absNum < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K where num >= 1,000 but num < 1 mil
    }else if(absNum >= 1000000 && absNum < 1000000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M where num >= 1 mil but num < 1 bil
    }else if(absNum >= 1000000000){
        return (num/1000000000).toFixed(1) + 'B'; // convert to B where num >= 1 bil
    }else if(absNum < 900){
        return num; // if num < 1000, do nothing
    }
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
                              <p className='videoTitleSearch'>Video Title: </p>
                          </Col>
                          <Col span={15}>
                              <Input value={videoTitle} placeholder="Starts with..." onChange={changeVideoTitleString}/>
                          </Col>
                      </Row>
                      
                  </Col>
              
                  <Col span={8}>
                      <Row>
                          <Col span={9}>
                              <p className='channelTitleSearch'>Channel Title: </p>
                          </Col>
                          <Col span={15}>
                              <Input id="channelTitleInput" value={channelTitle} placeholder="Starts with..." onChange={changeChannelTitleString}/>
                          </Col>
                      </Row>
                      
                  </Col>
              
                  <Col span={8}>
                      <Row>
                          <Col span={9}>
                              <p className='categorySearch'>Category: </p>
                          </Col>
                          <Col span={15}>
                          <div style={{display: 'flex'}}>
                            <ComboBox id="autoCompleteInput" value={categoryString} onChange={changeCategoryString}/>
                            </div>
                          </Col>
                      </Row>
                      
                  </Col>
                </Row>
                <Row>
                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <p className='countryLabel'>Country: </p>
                            </Col>
                            <Col span={15} id="countrySelectCol">
                            <Select value={currentCountry} id="countrySelector" onChange={changeCountry} >
                            {countryData.map((country) => (<Option key={country} value={country}>{country}</Option>))}
                            </Select>
                            </Col>
                        </Row>
                        
                    </Col>

                    <Col span={9}>
                        <Row>
                            <Col span={9}>
                                <p className='selectTrendingDates'>Trending Dates: </p>
                            </Col>
                            <Col span={5} id="trendDateSelectCol">
                            <RangePicker
                            defaultValue={[moment('2020-08-01', dateFormat), moment('2022-06-20', dateFormat)]}
                            format={dateFormat} onChange={changeTrendingDates} id="trendDatePicker"
                            />
                            </Col>
                        </Row>
                        
                    </Col>

                    <Col span={9}>
                        <Row>
                            <Col span={8}>
                                <p className='selectPublishDates'>Publish Dates: </p>
                            </Col>
                            <Col span={5} id="publishDatePicker">
                            <RangePicker
                            format={dateFormat} onChange={changePublishedDates}
                            />
                            </Col>
                        </Row>
                        
                    </Col>

                </Row>
                <Row>
                    
                    <Col span={6}>

                        <Row>
                            <Col span={12}>
                                <p className='viewsLabel'>Video Views: </p>
                            </Col>
                            <Col span={12} id="viewsSlider">
                                <Slider tipFormatter={numFormatter} range defaultValue={[0, 300000000]} 
                                min={1} max={300000000} onChange={changeViews}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <p className='likesLabel'>Likes: </p>
                            </Col>
                            <Col span={15} id="likesSliderCol">
                                <Slider id="likesSlider" range min={0} max={17000000} defaultValue={[0, 17000000]} 
                                tipFormatter={numFormatter} onChange={changeLikes}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <p className='dislikesLabel'>Dislikes: </p>
                            </Col>
                            <Col span={15} class='sliderCol'>
                                <Slider range min={0} max={13000000} defaultValue={[0, 13000000]} 
                                tipFormatter={numFormatter} onChange={changeDislikes}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <p className='commentsLabel'>Comments: </p>
                            </Col>
                            <Col span={15} class='sliderCol'>
                                <Slider range defaultValue={[0, 7000000]} min={0} max={7000000} 
                                tipFormatter={numFormatter} onChange={changeComments}/>
                            </Col>
                        </Row>   
                    </Col>

                </Row>

                <Row>
                    
                    <Col span={6}>

                        <Row>
                            <Col span={12}>
                                <p className='channelSubscribersLabel'>Channel Subscribers: </p>
                            </Col>
                            <Col span={12} id="channelSubscribersCol">
                                <Slider tipFormatter={numFormatter} range defaultValue={[1, 220000000]} 
                                min={1} max={220000000} onChange={changeSubscribers}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <p className='channelLibraryLabel'>Channel Library: </p>
                            </Col>
                            <Col span={14} id="channelLibraryCol">
                                <Slider id="librarySlider" tipFormatter={numFormatter} range defaultValue={[0, 500000]} 
                                min={1} max={500000} onChange={changeLibrarySize}/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <p className='channelLanguageLabel'>Channel Language: </p>
                            </Col>
                            <Col span={10} id="languageCol">
                            <Select value={currentLanguage} id="languageSelector" onChange={changeLanguage}>
                            {languageData.map((language) => (<Option key={language} value={language}>{language}</Option>))}
                            </Select>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={6} id="submitButtonWrap">
                        
                    <div class="submitSearch">
                        <Button id="submitVideoSearch" onClick={updateSearch}><img id="searchIcon" src={searchBarIcon}/>Search</Button>
                    </div>
                            
                    </Col>

                </Row>

              </div>
              <div className="headerSelectors">
              </div>
              </div>
        
  </div>
  )     
};

export default HeaderBar;


