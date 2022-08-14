import React from 'react';
import SideMenu from '../components/SideMenu';
import './VideoPage.css'
import { getHomeVideos, getSingleVideo } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import { useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import LikeButton from '../components/LikeButton';
import { Chart } from "react-google-charts";
import { useState } from 'react';


import {
  Table,
  Select
} from 'antd'
import { ControlFilled } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;
const { Option } = Select;

const columns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "string", label: "Resource" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

const rows = [[
  "TimePeriod",
  "Time Period",
  "time",
  new Date(2013, 2, 22),
  new Date(2013, 5, 20),
  null,
  100,
  null,
]
];
const data = [columns, ...rows];

const options = {
  height: 70,
  gantt: {
    trackHeight: 30,
    criticalPathEnabled: true,
            criticalPathStyle: {
              stroke: '#e64a19',
              strokeWidth: 5
            }
  },
};

const geoMapData = [
  ["Country", "Popularity"],
  ["Japan", 300],
  ["United States", 300],
  ["Brazil", 300],
  ["Canada", 300],
  ["France", 300],
  ["RU", 300]
];

const geoOptions = {
  backgroundColor: '#000000',
  datalessRegionColor: '#FFFFFF',
  colorAxis: {
    colors: ["#d43b08"]
  },
  legend: "none",
  tooltip: {
    showTitle: false,
    textStyle: { fontSize: 14 }
  }
}

class VideoPage extends React.Component {

  constructor(props) {
    super(props)

      this.state = {
        fullLink: "",
        videoInfo: [],
        videoId: "",
      };

      this.loadCountries = this.loadCountries.bind(this)
      this.trendingTime = this.trendingTime.bind(this)
  }

    fetchVideoId = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const videoId = urlParams.get("videoid");
      this.state.videoId = videoId;
      var linkBegin = "https://www.youtube.com/embed/";
      this.state.fullLink = linkBegin + `${this.state.videoId}`;
      window.localStorage.setItem('link', this.state.fullLink)
    };

    componentDidMount() {
      this.fetchVideoId();
      getSingleVideo(this.state.videoId).then(res => {
        this.setState({ videoInfo: res.results }, this.loadCountries);
        this.setState({ videoInfo: res.results }, this.trendingTime);
        // const map1 = this.state.videoInfo.map(x=> x.video_title);
        // var array = JSON.parse("[" + x.video_title + "]");
      });
    };

    loadCountries(){
      //return this.props.videoInfo[0].countries.substring(0,3);
      var countriesArray = [["Country"]];

      var countriesListObject = this.state.videoInfo.map(info =>  info.countries)
      
      var countriesString = JSON.stringify(countriesListObject);
      console.log(countriesString);
      var slicedString = countriesString.slice(2,(countriesString.length -2))
      var countriesStringArr = slicedString.split(",");

      for (var i=0; i<countriesStringArr.length; i++){
        var countryPlaceholder = [];
        countryPlaceholder.push(countriesStringArr[i]);
        //countryPlaceholder.push(300);
        countriesArray.push(countryPlaceholder);
        countryPlaceholder = [];
      }
      console.log(countriesArray);
      this.setState({finalCountriesArray : countriesArray});
    }

    trendingTime(){
      const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
      ];
      var trendingDateRows = []; 
      var trendingDate = ["TimePeriod", "Time period"];
      var trendStartObject = this.state.videoInfo.map(info =>  info.trend_start.substring(0,10));
      
      var trendStartString = JSON.stringify(trendStartObject);
      //console.log(trendStartString);
      var slicedString = trendStartString.slice(2,(trendStartString.length -2));
      var trendingStartStringArr = slicedString.split("-"); //year-month-day 
      //console.log(trendingStartStringArr);
      var yearS = trendingStartStringArr[0];
      var monthS = trendingStartStringArr[1]; 
      var dayS = trendingStartStringArr[2]; 
      console.log(trendingStartStringArr);
      //push the New Date trending start into trendingDate
      trendingDate.push(new Date(yearS, monthS, dayS));
      
      
      

      var trendEndObject = this.state.videoInfo.map(info =>  info.trend_stop.substring(0,10));

      var trendEndString = JSON.stringify(trendEndObject);
      //console.log(trendEndString);
      var slicedEndString = trendEndString.slice(2,(trendEndString.length -2));
      //console.log(slicedEndString);
      var trendingEndStringArr = slicedEndString.split("-"); //year-month-day 
      //console.log(trendingEndStringArr);
      //year
      var year = trendingEndStringArr[0];
      var month = trendingEndStringArr[1]; 
      var day = trendingEndStringArr[2]; 
      console.log(trendingEndStringArr);
      trendingDate.push(new Date(year, month, day));
      trendingDate.push(null);
      trendingDate.push(100);
      trendingDate.push(null);
      console.log(trendingDate);
      //push trendingDate into trendingDateRows
      trendingDateRows.push(trendingDate);
      console.log(trendingDateRows);

      const data = [columns, ...trendingDateRows]; //columns x rows 
     
      this.setState({finalTrendingDate : data});

    }

    
   
    render() {
      return (
        
        <div>
              <div className="headerBar">
            <div className="headerLogo">
              <HeaderLogo />
            </div>
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', marginBottom: '5vh' }}>
              <h1 id="videoPageTitle">Video Details</h1>
              </div>
            </div>
  
            <div id="page">
    
                <div id="sideBar">
                    <div>
                    <SideMenu />
                    </div>
                </div>
            
                <div className="videoInfo">

                  <iframe id="videoFrame" width="640" height="360" 
                      src={this.state.fullLink}>
                  </iframe>
                  <div className="description">
                  <h2>Title: </h2>
                  {this.state.videoInfo.map(info => <h5>{info.video_title}</h5>)}
                  <h2>Description:</h2>
                  {this.state.videoInfo.map(info => <h5>{info.description.substring(0, 150)}</h5>)}
                  {/* <h2>Trending Start Date:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.trend_start.substring(0,10)}</h5>)} */}
                  
                  <h2>Views:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.views}</h5>)}
                  <h2>Likes:</h2>
                  {this.state.videoInfo.map(info => <h5>{info.likes}</h5>)}
                  </div>
                  <div className="trending">
                  <h2>Trending Time:</h2>
                    <Chart chartType="Gantt" data={this.state.finalTrendingDate} width = "60%" height = "5%" options={options}/>
                    {/* <h2>Trending Time:</h2>
                    <Chart chartType="Gantt" data={data} width = "60%" height = "5%" options={options}/>
                     */}
                  <h2>Trending Countries:</h2>
                  <Chart chartType="GeoChart" width="300px" height="300px" data={this.state.finalCountriesArray} options = {geoOptions} />
                  
                  </div>
                  {/* <h2>Countries:</h2> */}
                  <div class="VideoInfoArea"></div>
                  {this.state.videoInfo.map(info => <h5>  {info.countries}</h5>)}
                  {/* <div className="viewsLikes"> */}

                  <div className="likes">
                  
                     
                  <div id="likeButton">
                  
                  {this.state.videoInfo.map(info=>(
                    <LikeButton
                      thumbLink = {info.thumbnail_link}
                      videoId = {info.video_id}
                      videoTitle = {info.video_title}
                    />
                  ))}
                  </div>
                  </div>
                  
                </div>
                    
                </div>
            
            
            </div>
        // </div>
      )
    };
  
  }
  
 
  export default VideoPage;
