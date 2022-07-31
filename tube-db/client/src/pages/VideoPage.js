import React from 'react';
import SideMenu from '../components/SideMenu';
import './HomePage.css'
import { getHomeVideos } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';

import {
  Table,
  Select
} from 'antd'

const { Column, ColumnGroup } = Table;
const { Option } = Select;


class Vodep extends React.Component {

    constructor(props) {
      super(props)
  
      this.state = {
        
      }
    }
  
    componentDidMount() {
      getHomeVideos(this.state.country, this.state.pageCount).then(res => {
        this.setState({ videoResults: res.results })
        console.log(this.state.videoResults)
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