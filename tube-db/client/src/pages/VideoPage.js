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
],
];
const data = [columns, ...rows];

const options = {
  height: 70,
  backgroundColor: "black",
  gantt: {
    trackHeight: 30,
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

var finalCountriesArray = [["Country", "Popularity"]];

const geoOptions = {
  backgroundColor: "black"
}


class VideoPage extends React.Component {

  constructor(props) {
    super(props)

      this.state = {
        fullLink: "",
        videoInfo: [],
        videoId: ""
      };

      this.loadCountries = this.loadCountries.bind(this)
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
        // const map1 = this.state.videoInfo.map(x=> x.video_title);
        // var array = JSON.parse("[" + x.video_title + "]");
        // console.log(array);
      })
    };

    loadCountries() {
      //return this.props.videoInfo[0].countries.substring(0,3);
      var countriesListObject = this.state.videoInfo.map(info =>  info.countries)

      var countriesString = JSON.stringify(countriesListObject);
      var countriesListString = countriesString.substring(2,countriesString.length-2);

      var slicedString = countriesString.slice(2,(countriesString.length -2))
      var countriesStringArr = slicedString.split(",");
      console.log(slicedString)
      for (var i=0; i<countriesStringArr.length; i++){
        console.log(countriesStringArr[i]);
        var countryPlaceholder = [];
        countryPlaceholder.push(countriesStringArr[i]);
        countryPlaceholder.push(300);
        finalCountriesArray.push(countryPlaceholder);
        countryPlaceholder = [];
      }
        
      

      console.log(finalCountriesArray)

      const countriesArray = [];
      for (var i = 0; i < countriesListString.length; i++) {
        var string = '';
        string += countriesListString[i];
        if (countriesListString.charAt(i) == ',') {
          //add the string to arry
          countriesArray.push(string);
          string = ''; //reset string for the next country
          continue;
        }
      }
      //countriesListString.substring(0, countriesString.indexOf(",")-2)
      return(countriesListString);
      // return countriesListString.split(",");

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

                  <h2>Title: </h2>
                  {this.state.videoInfo.map(info => <h5>{info.video_title}</h5>)}
                  <h2>Description:</h2>
                  {this.state.videoInfo.map(info => <h5>{info.description.substring(0, 150)}</h5>)}
                  <h2>Trending Start Date:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.trend_start.substring(0,10)}</h5>)}
                  <h2>Trending Time:</h2>
                    <Chart chartType="Gantt" data={data} width = "60%" height = "5%" options={options}/>
                    <h2></h2>
                    
                  <h2>Trending Counries:</h2>
                  <Chart chartType="GeoChart" width="100%" height="300px" data={finalCountriesArray} options = {geoOptions} />
                
                
                  <h2>Countries:</h2>
                  {this.state.videoInfo.map(info => <h5>  {info.countries}</h5>)}
                  
                  <h2>Views:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.views}</h5>)}
                  <h2>Likes:</h2>
                  {this.state.videoInfo.map(info => <h5>{info.likes}</h5>)}
                
                  <div id="likeButton">
                  <div>
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
      )
    };
  
  }
  
 
  export default VideoPage;
