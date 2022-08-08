import React from 'react';
import SideMenu from '../components/SideMenu';
import { getTrendingVideos } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import Navbar from '../components/Navbar';
import { getChannel, getFindChannels, getChannelRecentTrending } from '../fetcher';
import { SearchOutlined } from '@ant-design/icons';

import {
    Table,
    Select,
    Input,
    Button,
    Slider,
    Row,
    Col,
    Divider, 
  } from 'antd'
  
  const { Column, ColumnGroup } = Table;
  const { Option } = Select;

  const countryData = ['Brazil', 'Canada', 'France', 'Germany', 'India', 'Japan', 'Mexico', 'Russia', 'South Korea', 'United Kingdom', 'United States'];

const languageData = ['Select','Albanian', 'Arabic', 'Armenian', 'Bengali', 'Bhojpuri', 'Bosnian', 'Bulgarian', 'Catalan', 'Chichewa', 
    'Chinese', 'Croatian', 'Czech', 'Dutch', 'English', 'Estonian', 'Filipino', 'French', 'Georgian', 'German', 'Greek', 'Hebrew', 
    'Hindi', 'Hungarian', 'Indian', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Korean', 'Malay', 'Malayalam', 'Marathi', 'Nepali', 
    'Norwegian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Serbian', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 
    'Swedish', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'];


const producerData = ['Select', 'Creator', 'Entertainer or Event', 'Entertainer/Event', 'Expert', 
    'Institution', 'Manufacturer', 'Media/Content Brand', 'Retailer', 'Service Provider', 'User'];

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
  
  function growthFormatter(deci){
      let newNum = deci;
      newNum*=100;
      if (newNum>=0){
          return "+" + newNum.toFixed(1) + "%";
      }else{
          return newNum.toFixed(1) + "%";
      }
  }

  class FinalSearchHeader extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      
      selectedQuery: "",
      channelsQuery: "",
      selectedQueryResults: [],
      channelsQueryResults: [],
      selectedTrendingQueryResults: [],
      selectedChannelDetails: null,
      searchString: null,
      country: 'Select',
      language: 'Select',
      producer: 'Select',
      rankingLow: 1,
      rankingHigh: 10000,
      viewsLow: 1000000,
      viewsHigh: 194000000000,
      subsLow: 100000,
      subsHigh: 218000000,
      libSizeLow: 10,
      libSizeHigh: 50000,
      viewsPerLow: 100000,
      viewsPerHigh: 100000000,
      viewsGrowthLow: -1,
      viewsGrowthHigh: 1,
      subsGrowthLow: -1,
      subsGrowthHigh: 1
    }

    
    this.updateChannelSearchBar = this.updateChannelSearchBar.bind(this)
    this.executeChannelSearch = this.executeChannelSearch.bind(this)

    this.handleSearchStringChange = this.handleSearchStringChange.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
    this.handleProducerChange = this.handleProducerChange.bind(this)
    
    this.handleRankingChange = this.handleRankingChange.bind(this)
    this.handleViewsChange = this.handleViewsChange.bind(this)
    this.handleSubsChange = this.handleSubsChange.bind(this)
    this.handleLibSizeChange = this.handleLibSizeChange.bind(this)
    this.handleViewsPerChange = this.handleViewsPerChange.bind(this)
    this.handleViewsGrowthChange = this.handleViewsGrowthChange.bind(this)
    this.handleSubsGrowthChange = this.handleSubsGrowthChange.bind(this)

  }

  
  updateChannelSearchBar(event) {
    this.setState({ selectedQuery: event.target.value })
  }

  handleSearchStringChange(event){
      this.setState({searchString: event.target.value})
  }

  handleCountryChange(value) {
      this.setState({ country: value})
  }


  handleLanguageChange(value) {
      this.setState({ language: value})
  }


  handleProducerChange(value) {
      this.setState({ producer: value})
  }

  handleRankingChange(value) {
      this.setState({ rankingLow: value[0] })
      this.setState({ rankingHigh: value[1] })
  }

  handleViewsChange(value) {
      this.setState({ viewsLow: value[0] })
      this.setState({ viewsHigh: value[1] })
  }

  handleSubsChange(value) {
      this.setState({ subsLow: value[0] })
      this.setState({ subsHigh: value[1] })
  }

  handleLibSizeChange(value) {
      this.setState({ libSizeLow: value[0] })
      this.setState({ libSizeHigh: value[1] })
  }

  handleViewsPerChange(value) {
      this.setState({ viewsPerLow: value[0] })
      this.setState({ viewsPerHigh: value[1] })
  }

  handleViewsGrowthChange(value) {
      this.setState({ viewsGrowthLow: value[0] })
      this.setState({ viewsGrowthHigh: value[1] })
  }

  handleSubsGrowthChange(value) {
      this.setState({ subsGrowthLow: value[0] })
      this.setState({ subsGrowthHigh: value[1] })
  }

  executeChannelSearch() {
      getFindChannels(this.state.searchString,this.state.country, this.state.language, this.state.producer, 
                      this.state.rankingLow, this.state.rankingHigh, this.state.viewsLow, this.state.viewsHigh,
                      this.state.subsLow, this.state.subsHigh, this.state.libSizeLow, this.state.libSizeHigh,
                      this.state.viewsPerLow, this.state.viewsPerHigh, this.state.viewsGrowthLow, this.state.viewsGrowthHigh,
                      this.state.subsGrowthLow, this.state.subsGrowthHigh).then(res => {  
          this.setState({ channelsQueryResults: res.results })
      })
  }


    render (){
        return(
            <div style={{ width: '70vw', margin: '0 auto' }}>
        <div className='searchMenu'>
                                
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={9}>
                                                <p className='titleSearchName'>Title Includes: </p>
                                            </Col>
                                            <Col span={15}>
                                                <Input value={this.state.searchString} placeholder="type here" onChange={this.handleSearchStringChange}/>
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                    
                                    <Col span={5}>
                                        <Row>
                                            <Col span={9}>
                                                <p className='titleSearchName'>Country: </p>
                                            </Col>
                                            <Col span={15}>
                                            <Select defaultValue={countryData[10]} id="countrySelector" >
                                            {countryData.map((country) => (<Option key={country}>{country}</Option>))}
                                            </Select>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={5}>
                                        <Row>
                                            <Col span={9}>
                                                <p className='titleSearchName'>Language: </p>
                                            </Col>
                                            <Col span={15}>
                                                <Select defaultValue={languageData[0]} style={{width: 120,}} onChange={this.handleLanguageChange}>
                                                    {languageData.map((language) => (<Option key={language}>{language}</Option>))}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col span={12}>
                                                <p className='titleSearchName'>Producer-Type: </p>
                                            </Col>
                                            <Col span={12}>
                                                <Select defaultValue={producerData[0]} style={{width: 120,}} onChange={this.handleProducerChange}>
                                                    {producerData.map((producer) => (<Option key={producer}>{producer}</Option>))}
                                                </Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>



                                <Row>
                                    <Col span={6}>

                                        <Row>
                                            <Col span={8}>
                                                <p className='titleSearchName'>Rank: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider tipFormatter={numFormatter} range defaultValue={[1, 10000]} 
                                                min={1} max={10000} onChange={this.handleRankingChange}/>
                                            </Col>
                                        </Row>



                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col span={8}>
                                                <p className='titleSearchName'>Views: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider range min={1000000} max={194000000000} defaultValue={[2000000, 194000000000]} 
                                                tipFormatter={numFormatter} onChange={this.handleViewsChange}/>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col span={8}>
                                                <p className='titleSearchName'>Subs: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider range min={100000} max={218000000} defaultValue={[100000, 218000000]} 
                                                tipFormatter={numFormatter} onChange={this.handleSubsChange}/>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col span={6}>
                                        <Row>
                                            <Col span={8}>
                                                <p className='titleSearchName'>Lib-Size: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider range defaultValue={[10, 50000]} min={10} max={50000} 
                                                tipFormatter={numFormatter} onChange={this.handleLibSizeChange}/>
                                            </Col>
                                        </Row>   
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Row>
                                            <Col span={12}>
                                                <p className='titleSearchName'>Views per Video: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider range defaultValue={[100000, 100000000]} min={100000} max={100000000} 
                                                tipFormatter={numFormatter} onChange={this.handleViewsPerChange}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={7}>
                                        <Row>
                                            <Col span={10}>
                                                <p className='titleSearchName'>View Growth: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider range defaultValue={[-1, 1]} min={-1} max={1} step={0.01} 
                                                tipFormatter={growthFormatter} onChange={this.handleViewsGrowthChange}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={7}>
                                        <Row>
                                            <Col span={10}>
                                                <p className='titleSearchName'>Sub Growth: </p>
                                            </Col>
                                            <Col span={10}>
                                                <Slider range defaultValue={[-1, 1]} min={-1} max={1} step={0.01} 
                                                tipFormatter={growthFormatter} onChange={this.handleSubsGrowthChange}/>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col span={2}>
                                        <Button className='searchIcon' style={{display: 'flex','justify-content': 'center','align-items': 'center', backgroundColor:'#d2001a'}} 
                                        shape="circle" onClick={this.executeChannelSearch} 
                                        icon={<SearchOutlined style={{color:'whiteSmoke', fontSize: '18px','margin-left': 'auto', 'margin-right': 'auto', display: 'block !important'}}/>}></Button>
                                    </Col>
                                    
                                </Row>
                            </div>
                        </div>
        )
    }
}


export default FinalSearchHeader;
        