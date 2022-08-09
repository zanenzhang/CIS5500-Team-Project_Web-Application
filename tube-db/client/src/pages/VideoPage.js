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

import {
  Table,
  Select
} from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class VideoPage extends React.Component {

      state = {
        fullLink: "",
        videoInfo: [],
        videoId: ""
      };

    fetchVideoId = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const videoId = urlParams.get("videoid");
      this.state.videoId = videoId;
      var linkBegin = "https://www.youtube.com/embed/";
      this.state.fullLink = linkBegin + `${this.state.videoId}`;
    };
  
    componentDidMount() {
      this.fetchVideoId();
      getSingleVideo(this.state.videoId).then(res => {
        this.setState({ videoInfo: res.results });
        // const map1 = this.state.videoInfo.map(x=> x.video_title);
        // var array = JSON.parse("[" + x.video_title + "]");
        // console.log(array);
      })
    };
    
  
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
                  <h2>Countries:</h2>
                  {this.state.videoInfo.map(info => <h5>  {info.countries}</h5>)}
                  
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
  
  export default VideoPage;


let Likecomment = `div id="LikeButton">
                      <div>
                      <LikeButton />
                      </div>
                  </div>
                  `