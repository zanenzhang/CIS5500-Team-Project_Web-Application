import React from 'react';
import SideMenu from '../components/SideMenu';
import './VideoPage.css'
import { getHomeVideos, getSingleVideo, getCountryGantt } from '../fetcher'
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

// const options = {
//   height: 70,
//   gantt: {
//     trackHeight: 30,
//     backgroundColor: '#000000',
//     criticalPathEnabled: false,
//             criticalPathStyle: {
//               stroke: '#e64a19',
//               strokeWidth: 5
//             },
//     // labelStyle: {
//     //   color: "#cf2b08",
//     //   fontName: 'Arial',
//     // fontSize: 20
//     // },
//     palette: [
//       {
        
//         "color": "#cf2b08",
//         "dark": "#ff0000",
//         "light": "#ffffff"
//       },
//     ]
    
//   },
// };

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
  // datalessRegionColor: '#FFFFFF',
  colorAxis: {
    colors: "#ff0000"
  },
  legend: "none",
  tooltip: {
    showTitle: false,
    textStyle: { fontSize: 14 }
  }
}

const ganttColumns = [
  { type: "string", label: "Task ID" },
  { type: "string", label: "Task Name" },
  { type: "date", label: "Start Date" },
  { type: "date", label: "End Date" },
  { type: "number", label: "Duration" },
  { type: "number", label: "Percent Complete" },
  { type: "string", label: "Dependencies" },
];

class VideoPage extends React.Component {

  constructor(props) {
    super(props)

      this.state = {
        fullLink: "",
        videoInfo: [],
        videoId: "",
        finalTrendingDates: [],
        finalCountriesArray: [],
        desciption: "",
        gantHeight: ""
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
        this.setState({ videoInfo: res.results });
        // const map1 = this.state.videoInfo.map(x=> x.video_title);
        // var array = JSON.parse("[" + x.video_title + "]");
      }).then(this.loadCountries).then(this.createDates);
    };

    loadCountries(){
      //return this.props.videoInfo[0].countries.substring(0,3);
      var countriesArray = [["Country","Popularity"]];

      var countriesListObject = this.state.videoInfo.map(info =>  info.countries)
      
      var countriesString = JSON.stringify(countriesListObject);
      console.log(countriesString);
      var slicedString = countriesString.slice(2,(countriesString.length -2))
      var countriesStringArr = slicedString.split(",");

      if (this.state.videoInfo.description != null){
        var descriptionText = this.state.videoInfo.map(info => info.description.substring(0, 150)) 
        this.setState({description: descriptionText})
      }

      for (var i=0; i<countriesStringArr.length; i++){
        var countryPlaceholder = [];
        countryPlaceholder.push(countriesStringArr[i]);
        countryPlaceholder.push(1);
        countriesArray.push(countryPlaceholder);;
      }
      //get the size of countries array Gantt chart height will be based on 
      var height = countriesArray.length *30 + 40;
      this.setState({gantHeight: height}); 
      this.setState({finalCountriesArray : countriesArray});
    }

    createDates = async () => {

      var trendingDateRows = []; 

      for (var idx =1; idx < this.state.finalCountriesArray.length; idx++){

        await getCountryGantt(this.state.videoId, this.state.finalCountriesArray[idx][0]).then(res =>{

          var countriesListObject = res.results.map(info =>  info.country)
      
          var countriesString = JSON.stringify(countriesListObject);
          var slicedString = countriesString.slice(2,(countriesString.length -2))

          var trendingDate = [slicedString, slicedString];
          var trendStartObject = res.results.map(info => info.trend_start.substring(0,10));
          var trendEndObject = res.results.map(info => info.trend_stop.substring(0,10));

          var trendStartString = JSON.stringify(trendStartObject);
          //console.log(trendStartString);
          var slicedString = trendStartString.slice(2,(trendStartString.length -2));
          var trendingStartStringArr = slicedString.split("-"); //year-month-day 
          //console.log(trendingStartStringArr);
          var yearS = parseInt(trendingStartStringArr[0]);
          var monthS = parseInt(trendingStartStringArr[1]); 
          var dayS = parseInt(trendingStartStringArr[2]); 
          //push the New Date trending start into trendingDate
          trendingDate.push(new Date(yearS, monthS, dayS));

          var trendEndString = JSON.stringify(trendEndObject);
          //console.log(trendEndString);
          var slicedEndString = trendEndString.slice(2,(trendEndString.length -2));
          //console.log(slicedEndString);
          var trendingEndStringArr = slicedEndString.split("-"); //year-month-day 
          //console.log(trendingEndStringArr);
          //year
          var year = parseInt(trendingEndStringArr[0]);
          var month = parseInt(trendingEndStringArr[1]); 
          var day = parseInt(trendingEndStringArr[2]); 
          //console.log(trendingEndStringArr);
          trendingDate.push(new Date(year, month, day));
          trendingDate.push(null);
          trendingDate.push(100);
          trendingDate.push(null);

          trendingDateRows.push(trendingDate);
          
        });
      }

      console.log(trendingDateRows.length)

      if (trendingDateRows.length == this.state.finalCountriesArray.length - 1){
        console.log(trendingDateRows)

      const data = [ganttColumns, ...trendingDateRows]; //columns x rows 

      console.log(data)
      this.setState({finalTrendingDates : data});
        console.log(this.state.finalTrendingDates);
      }

      return trendingDateRows
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

      console.log(columns)
      console.log(typeof(columns))
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

      const rows = [
        [
          "Research",
          "Find sources",
          new Date(2015, 0, 1),
          new Date(2015, 0, 5),
          null,
          100,
          null,
        ],
        [
          "Write",
          "Write paper",
          null,
          new Date(2015, 0, 9),
          daysToMilliseconds(3),
          25,
          "Research,Outline",
        ],
        [
          "Cite",
          "Create bibliography",
          null,
          new Date(2015, 0, 7),
          daysToMilliseconds(1),
          20,
          "Research",
        ],
        [
          "Complete",
          "Hand in paper",
          null,
          new Date(2015, 0, 10),
          daysToMilliseconds(1),
          0,
          "Cite,Write",
        ],
        [
          "Outline",
          "Outline paper",
          null,
          new Date(2015, 0, 6),
          daysToMilliseconds(1),
          100,
          "Research",
        ],
      ];

      function daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
      }

      const data = [columns, ...rows]; //columns x rows 

      console.log(rows)
      console.log(typeof(rows))
     
      this.setState({finalTrendingDates : data});

    }
   
    render() {
      const options = {
        height: this.state.gantHeight,
        gantt: {
          trackHeight: this.state.numCountries,
          // Colors only the chart area, with opacity
        chartArea: {
          backgroundColor: {
            fill: '#000000',
            fillOpacity: 0.1
          },
        },
          criticalPathEnabled: false,
                  criticalPathStyle: {
                    stroke: '#e64a19',
                    strokeWidth: 5
                  },
          // labelStyle: {
          //   color: "#cf2b08",
          //   fontName: 'Arial',
          // fontSize: 20
          // },
          palette: [
            {
              
              "color": "#cf2b08",
              "dark": "#ff0000",
              "light": "#ffffff"
            },
          ]
          
        },
      };
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
                  <div>
                  <iframe id="videoFrame" width="640" height="360" 
                      src={this.state.fullLink}>
                  </iframe>

                  <div className="description">
                  <h2>Title: </h2>
                  {this.state.videoInfo.map(info => <h5>{info.video_title}</h5>)}
                  <h2>Description:</h2>
                  <h5>{this.state.description}</h5>
                  {/* <h2>Trending Start Date:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.trend_start.substring(0,10)}</h5>)} */}
                  
                  <h2>Views:</h2>
                  {this.state.videoInfo.map(info => <h5> {info.views}</h5>)}
                  <h2>Likes:</h2>
                  {this.state.videoInfo.map(info => <h5>{info.likes}</h5>)}
                  </div>

                  
                 <div id="geochart">
                  
                  <h2 id="trendingCountryLabel">Trending Countries:</h2>
                  <Chart chartType="GeoChart" width="300px" height="300px" data={this.state.finalCountriesArray} options = {geoOptions} />
                  
                  </div>
                  </div>
                  
                  
                  
                  {/* <h2>Countries:</h2> */}
                  <div class="VideoInfoArea"></div>
                  {this.state.videoInfo.map(info => <h5>  {info.countries}</h5>)}
                  {/* <div className="viewsLikes"> */}

                  <div className="trending">
                  <h2>Trending Time:</h2>
                  <h2></h2>
                    <Chart id="countryGantt" chartType="Gantt" data={this.state.finalTrendingDates} width = "80%" height = "50%" options={options}/>
                    {/* <h2>Trending Time:</h2>
                    <Chart chartType="Gantt" data={data} width = "60%" height = "5%" options={options}/>
                     */}
                 </div>

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



