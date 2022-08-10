import React from 'react';
import SideMenu from '../components/SideMenu';
import './SavedVideos.css'
import { getRecommendedVideo } from '../fetcher'
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
var fullLink = null
var videoId = null
if (window.localStorage.getItem('likedLink')== null){
  console.log("Nothing for cookie")
}
else{
  fullLink = window.localStorage.getItem('likedLink');
  videoId= fullLink.substring(fullLink.lastIndexOf('/')+1) ;
}

class VideoPage extends React.Component {
    
    state={
        videoInfo : [],
    };


    // componentDidMount() {
    //     getRecommendedVideo(videoId).then(res => {
    //       this.setState({ videoInfo: res.results });
    //       // const map1 = this.state.videoInfo.map(x=> x.video_title);
    //       // var array = JSON.parse("[" + x.video_title + "]");
    //       // console.log(array);
    //     })
    //   };
  
   
    render() {
  
      return (
        
        <div>
              <div className="headerBar">
            <div className="headerLogo">
              <HeaderLogo />
            </div>
            <div style={{ width: '67vw', margin: '0 auto', marginTop: '5vh', marginBottom: '5vh' }}>
              <h1 id="videoPageTitle">Liked Videos</h1>
              </div>
            </div>
  
            <div id="page">
            
    
                <div id="sideBar">
                    <div>
                    <SideMenu />
                    </div>
                </div>
            
                <div className="videoInfo">

                 <center><iframe id="videoFrame" width="320" height="180" 
                      src={fullLink}>
                  </iframe>
                  </center> 
                
                 
                    
                </div>
                {/* <h1>
                 {(videoId)} 
                 {this.state.videoInfo} 
                </h1> */}

                
{/*              
                {this.state.videoInfo.map(video=>(
                  <VideoThumbnail
                    thumbLink = {video.thumbnail_link}
                    videoId = {video.video_id}
                    videoTitle = {video.video_title}
                  />
                ))} */}
                
              
            
            
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