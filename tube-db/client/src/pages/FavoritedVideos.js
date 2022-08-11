import React from 'react';
import './TrendingVideosPage.css'
import FavoritedHeader from '../components/FavoritedHeader';
import { getFavoritedVideos, getTrendingVideos } from '../fetcher'
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import Navbar from '../components/Navbar';
import loadIcon from '../images/load-icon.png';

import {
  Table,
  Select,
} from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class FavoritedVideosPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      user: sessionStorage.getItem('userInfo'),
      videoResults: [],
      videoid: "--0bCF-iK2E"
    }

  }

  handleUpdateVideos() {
    getFavoritedVideos(this.state.videoid).then(res => {
      this.setState({ videoResults: res.results });
    })
  }

  componentDidMount() {
    getFavoritedVideos(this.state.videoid).then(res => {
      this.setState({ videoResults: res.results });
    })
  };

  render() {

    return (
      
      <div className='outerDiv'>
        <FavoritedHeader/>
        
        <div id="page">
          <div id="sideBar">
              <Navbar />
          </div>
        
          <div id="pageContent">
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', marginBottom: '5vh' }}>
              <Grid>
                
                {this.state.videoResults?.map(video=>(
                  <VideoThumbnail
                    thumbLink = {video.thumbnail_link}
                    videoId = {video.video_id}
                    videoTitle = {video.video_title}
                  />
                ))}
                
              </Grid>

            <div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
    )
  };

}

export default FavoritedVideosPage


