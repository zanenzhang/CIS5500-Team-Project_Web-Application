import React from 'react';
import SideMenu from '../components/SideMenu';
import './HomePage.css'
import { getHomeVideos, getSingleVideo } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';

import {
  Table,
  Select
} from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class VideoPage extends React.Component {

  constructor(props) {
    super(props)

      this.state = {
        videoInfo: []
      }
    }
  
    componentDidMount() {
      getSingleVideo(this.state.videoId).then(res => {
        this.setState({ videoInfo: res.results });
      })
    };
  
    render() {
  
      return (
        
        <div>
  
            <HeaderBar />
  
            <div id="page">
    
                <div id="sideBar">
                    <div>
                    <SideMenu />
                    </div>
                </div>
            
                <div id="pageContent">
                video details here
    
                </div>
            
            
            </div>
        </div>
      )
    };
  
  }
  
  export default VideoPage