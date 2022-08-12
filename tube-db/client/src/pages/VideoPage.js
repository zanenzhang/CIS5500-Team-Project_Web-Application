import React from 'react';
import SideMenu from '../components/SideMenu';
import './VideoPage.css'
import { getHomeVideos, getSingleVideo } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import { useParams } from 'react-router-dom';
import { Chart } from "react-google-charts";
import { useState } from 'react';

import {
  Table,
  Select
} from 'antd'
import { FaBlackberry } from 'react-icons/fa';

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

export const options = {
  height: 70,
  backgroundColor: "black",
  gantt: {
    trackHeight: 30,
  },
};

export const geoMapData = [
  ["Country", "Popularity"],
  ["Japan", 300],
  ["United States", 300],
  ["Brazil", 300],
  ["Canada", 300],
  ["France", 300],
  ["RU", 300]
];

const geoOptions = {
  backgroundColor: "black"
}
class VideoPage extends React.Component {

      state = {
        fullLink: "",
        videoInfo: [],
        videoId: "",
        year: "",
      };
      
      
    fetchVideoId = async () => {
      
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const videoId = urlParams.get("videoid");
      this.state.videoId = videoId;
      var linkBegin = "https://www.youtube.com/embed/";
      this.state.fullLink = linkBegin + `${this.state.videoId}`;
      //const year = this.state.videoInfo.map(info => info.trend_start.substring(0,4));
    };
  
    componentDidMount() {
      this.fetchVideoId();
      //this.getDate();
      getSingleVideo(this.state.videoId).then(res => {
        this.setState({ videoInfo: res.results });
        //const year = this.state.videoInfo.map(info => info.trend_start.substring(0,4)); 
        
      })
    };
  
    //function that obtains the dereferenced 
    //separate the comma
    countries = () => {
      //return this.props.videoInfo[0].countries.substring(0,3);
      var countriesListObject = this.state.videoInfo.map(info =>  info.countries)
      var countriesString = JSON.stringify(countriesListObject);
      var countriesListString = countriesString.substring(2,countriesString.length-2);
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
      const country = this.countries();
      //const {year} = this.state.videoInfo.map(info => info.trend_start.substring(0,4)); 
      return (
        
        <div>
  
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
                  <div className="info1">
                    <h2>Title: </h2>
                    {this.state.videoInfo.map(info => <h5>{info.video_title}</h5>)}
                    <h2>Description:</h2>
                    {this.state.videoInfo.map(info => <h5>{info.description.substring(0, 150)}</h5>)}
                    <h2>Trending Time:</h2>
                    <Chart chartType="Gantt" data={data} width = "60%" height = "5%" options={options}/>
                  </div>
                  
                  {/* <h2>Trending Start Date:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.trend_start.substring(0,10)}</h5>)} */}
                  {/* <h2>Trending End Date:</h2>
                  <h5>{year}</h5> */}
                  {/* <h2>Trending End Date:</h2>
                  <h5>{new Date({year}, 10, 10)}</h5> */}
                  {/* <h2>Trending End Date:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.trend_stop.substring(0,10)}</h5>)} */}
                  
                  <div className="info2">
                  
                  <h2></h2>
                  <h2>Trending Counries:</h2>
                  <Chart chartType="GeoChart" width="100%" height="300px" data={geoMapData} options = {geoOptions} />
                  <h2>Countries:</h2>
                  {this.state.videoInfo.map(info => <h5>  {info.countries}</h5>)}
                  {/* <h2>Dereferenced Country:</h2>
                  <h5>{country}</h5> */}
                  </div>
                  <h2>Views:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.views}</h5>)}
                  <h2>Likes:</h2>
                  {this.state.videoInfo.map(info => <h5>{info.likes}</h5>)}
                  
    
                </div>
            
            
            </div>
        </div>
      )
    };
  
  }
  
  export default VideoPage