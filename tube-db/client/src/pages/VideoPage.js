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
  Select,
  Row,
  Col
} from 'antd'

import { ControlFilled } from '@ant-design/icons';

const { Column, ColumnGroup } = Table;
const { Option } = Select;

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


const geoMapData = [
  ["Country"],
  ["Japan"],
  ["United States"],
  ["Brazil"],
  ["Canada"],
  ["France"],
  ["RU"]
];

const geoOptions = {
  backgroundColor: '#000000',
  // datalessRegionColor: '#FFFFFF',
  colorAxis: {
    colors: "#ff0000"
  },
  legend: "none",
  tooltip: 'none',
  keepAspectRatio: false
  // {
  //   showTitle: false,
  //   textStyle: { fontSize: 14 }
  // }
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
      var height = countriesArray.length *43 + 30;
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


      if (trendingDateRows.length == this.state.finalCountriesArray.length - 1){

        const data = [ganttColumns, ...trendingDateRows]; //columns x rows 
        this.setState({finalTrendingDates : data});
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
      trendingDate.push(new Date(year, month, day));
      trendingDate.push(null);
      trendingDate.push(100);
      trendingDate.push(null);
      //push trendingDate into trendingDateRows
      trendingDateRows.push(trendingDate);

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

     
      this.setState({finalTrendingDates : data});

    }
   
    render() {
      const options = {
        textStyle: {
          color: "#FFFFFF"
        },
        height: this.state.gantHeight,
        backgroundColor: {fill: '#000000'},
  
        hAxis: {
          // textStyle:{color: '#fff'},
          textStyle: '#ffffff',
          baselineColor: '#FFFFFF'
       },
        gantt: {
          trackHeight: this.state.numCountries,
         
          criticalPathEnabled: false,
                  criticalPathStyle: {
                    stroke: '#e64a19',
                    strokeWidth: 5,
                  },
                 
                 
          labelStyle: {
            fontName: 'Arial',
          fontSize: 18,
          color: '#ffffff'
          },
          palette: [
            {
              "color": "#ffffff",
              "dark": "#ff0000"
            },
          ]
         
        }, 
      };
 
      return (
        
        <div className='videoRootWrapper'>
          <div className="headerBar">
            <div className="headerLogo">
              <HeaderLogo />
            </div>
            
            <div className='videoPageTitleWrapper'>
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
                    <h2 className='videoDescriptor'>Title: </h2>
                      {this.state.videoInfo.map(info => <h5 className='videoAttr'>{info.video_title}</h5>)}
                    {<h2 className='videoDescriptor'>Description:</h2>}
                      {this.state.videoInfo.map(info => <h5 className='videoAttr'>{info.description} </h5> ) }
                    <h2 className='videoDescriptor'>Views:</h2>
                      {this.state.videoInfo.map(info => <h5 className='videoAttr'> {numFormatter(info.views)}</h5>)}
                  </div>

                  <div className="likesNum">
                    <h2 className='videoDescriptor'>Likes:</h2>
                      {this.state.videoInfo.map(info => <h5 className='videoAttr'>{numFormatter(info.likes)}</h5>)}
                  </div>


                  <div id="likeButton">
                    {this.state.videoInfo.map(info=>(
                      <LikeButton
                        thumbLink = {info.thumbnail_link}
                        videoId = {info.video_id}
                        videoTitle = {info.video_title}
                      />
                    ))}
                  </div>
                  

                  <div id="geochart">

                    <h2 className='videoDescriptor'>Trending Countries:</h2>
                      <Chart className='dataDis' chartType="GeoChart" width="1000px" height="550px"  data={this.state.finalCountriesArray} options = {geoOptions} />
                  </div>



                  <div className="trending">
                    <h2 className='videoDescriptor'>Trending Time:</h2>
                      <Chart id="countryGantt" chartType="Gantt" data={this.state.finalTrendingDates} width = "1000px" height = "50%" options={options}/>
                 </div>
                  
                
                  
                  
                  
                  {/* <h2>Countries:</h2> */}
                  <div class="VideoInfoArea"></div>
                  
                  {/* <div className="viewsLikes"> */}


                  <div className="likes">
                  
                     
                  
                  </div>
                  <div className="bottom"></div>

                  
                </div>
                    
                </div>
            
            
            </div>
        // </div>
      )
    };
  
  }
  
 
  export default VideoPage;



