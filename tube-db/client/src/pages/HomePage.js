import React from 'react';
import HeaderMenu from '../components/HeaderMenu';
import './HomePage.css'
import TubeDBLogo from '../images/Group_1.svg';

import {
  Table,
  Select
} from 'antd'

import { getAllVideos, getAllChannels } from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;


const videoDetails = [
  {
    title: 'VideoTitle',
    dataIndex: 'Name',
    key: 'Name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
  },
  {
    title: 'TrendingDate',
    dataIndex: 'TrendingDate',
    key: 'Date',
    sorter: (a, b) => a.Date.localeCompare(b.TrendingDate)
  },
  {
    title: 'PublishedAt',
    dataIndex: 'PublicationTime',
    key: 'Time',
    sorter: (a, b) => a.PublicationTime.localeCompare(b.PublicationTime)
    
  }
];

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      videoResults: [],
      channelResults: []
    }

    this.goToVideo = this.goToVideo.bind(this)
    this.goToChannel = this.goToChannel.bind(this)
  }


  goToVideo(videoId) {
    window.location = `/videos?id=${videoId}`
  }

  goToChannel(channelId) {
    window.location = `/channels?id=${channelId}`
  }

  componentDidMount() {
    getAllVideos(null, null, null).then(res => {
      this.setState({ videoResults: res.results })
    })

    getAllChannels().then(res => {
      console.log(res.results)
      this.setState({ channelResults: res.results })
    })

  };

  render() {

    return (
      
      <div>

      <div id="headerBar">
        <div id="headerLogo">
        <img src={TubeDBLogo} width={150} />
        </div>
        <div id="headerContent">
        Content here
        </div>
      </div>

      <div id="page">
        <div id="sideBar">
            <div>
            <HeaderMenu />
            </div>
        </div>
      
        <div id="pageContent">
        content
        </div>
      </div>
    </div>
    )
  };

}

export default HomePage

