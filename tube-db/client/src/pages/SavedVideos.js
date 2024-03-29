import React from 'react';
import SideMenu from '../components/SideMenu';
import './SavedVideos.css'
import './TrendingVideosPage.css'
import { getFavoritedVideos, getRecommendedVideos, getSingleVideo } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import { useParams } from 'react-router-dom';
import HeaderLogo from '../components/HeaderLogo';
import LikeButton from '../components/LikeButton';
import loadIcon from '../images/load-icon.png';




import {
  Table,
  Select
} from 'antd'


const { Column, ColumnGroup } = Table;
const { Option } = Select;

var fullLink = null
var linkBegin = "https://www.youtube.com/embed/";
if (window.localStorage.getItem('likedLink')== null){
  fullLink = "https://www.youtube.com/embed/__4i6CIg82o"
  console.log("Nothing for cookie")
}
else{
  fullLink = window.localStorage.getItem('likedLink');
  // videoId= fullLink.substring(fullLink.lastIndexOf('/')+1) ;
}



class VideoPage extends React.Component {
    
  constructor (props){

      super(props);
    //   this.state={
    //     videoInfo : [],
    //     videoId : ""
    //   };

    //   this.handleRecommendation = this.handleRecommendation.bind(this);
    // }

    // handleRecommendation(){
    //   this.state.videoId = fullLink.substring(fullLink.lastIndexOf('/')+1) ;
    //   getRecommendedVideo(this.state.videoId).then(res => {
    //     this.setState({ videoInfo: res.results });
    //   })
    // };
    this.state = {
      user: sessionStorage.getItem('userInfo'),
      videoResults: [],
      fullLink: "",
      videoInfo: [],
      videoId: ""
    };
  
  }

    fetchVideoId = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const videoId = urlParams.get("videoid");
      if ( fullLink== null){
        this.state.videoId = videoId
        console.log("Nothing is here");
      }
      else{
        this.state.videoId = fullLink.substring(fullLink.lastIndexOf('/')+1);
      }
      
    };

    handleUpdateVideos() {
      getFavoritedVideos(this.state.user).then(res => {
        this.setState({ videoResults: res.results });
      })
    }
  
    componentDidMount() {
      this.fetchVideoId();

      getFavoritedVideos(this.state.user).then(res => {
        this.setState({ videoResults: res.results });
      })
    
      getRecommendedVideos(this.state.videoId).then(res => {
        this.setState({ videoInfo: res.results });
        // const map1 = this.state.videoInfo.map(x=> x.video_title);
        // var array = JSON.parse("[" + x.video_title + "]");
        // console.log(array);
      })
    
    };
    


    // componentDidMount() {
    //     getSingleVideo(videoId).then(res => {
    //       this.setState({ videoInfo: res.results });
    //       // const map1 = this.state.videoInfo.map(x=> x.video_title);
    //       // var array = JSON.parse("[" + x.video_title + "]");
    //       // console.log(array);
    //     })
    //   };
    
   
    render() {
  
      return (
        
        <div className = "rootWrapper">
          <div className="headerBar">

            <div className="headerLogo">
              
              <HeaderLogo />
            </div>

            <div className='videoPageTitleWrapper'>

              <h1 id="videoPageTitle">Liked Videos Playlist</h1>

            </div>

            </div>
  
            <div id="page">
            
    
                <div id="sideBar">
                    <div className='sideMenuWrapper'>  
                    <SideMenu />
                    </div>
                </div>
                <div className="videoInfo" style = {{fontSize:'15px'}}>
                  <div className='likedPlaylist'>

                    <Grid>
                
                      {this.state.videoResults?.map(video=>(
                        <VideoThumbnail
                          thumbLink = {video.thumbnail_link}
                          videoId = {video.video_id}
                          videoTitle = {video.video_title}
                        />
                      ))}
                
                   </Grid>

                  </div>
                  

                  {/* recommendedVideos page */}
                <div id="pageContent">
                      <div className='recPlaylist'>
                  <p id="pageTitle">{this.state.searchTerm ? 'recommended videos' : 'Recommended Videos'}</p>
                 
                          <div class ="fade-in-videos" style = {{fontSize:'15px'}}>
                              <Grid>
                              {this.state.videoInfo.map(video=>(
                              <VideoThumbnail
                                // src = {linkBegin + `${video.videoId}`}
                                  thumbLink = {video.thumbnail_link}
                                  videoTitle = {video.video_title.substring(0,20)+"..." }
                                  Country = {video.channel_title}
                                  videoId = {video.video_id}
                                
                              />
                              ))}
                              </Grid>
                          </div>
                      </div>      
                  </div>         
              </div>    
            </div>
       </div>
      )
    };
  
  }
  
 
  export default VideoPage;

