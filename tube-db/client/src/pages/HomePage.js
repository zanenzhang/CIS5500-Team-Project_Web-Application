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

/*
const videoDetails = [
  //title, trending_date, likes, thumbnail_link
  {
    title: 'Video Title',
    dataIndex: 'title',
    key: '1',
    sorter: (a, b) => a.title.localeCompare(b.title),
  },
  {
    title: 'Trending Date',
    dataIndex: 'trending_date',
    key: '2',
    sorter: (a, b) => a.trending_date.localeCompare(b.trending_date)
  },
  {
    title: 'Likes',
    dataIndex: 'likes',
    key: '3',
    sorter: (a, b) => a.likes.localeCompare(b.likes)
  },
  {
    title: 'Picture Thumbnail',
    dataIndex: 'thumbnail_link',
    key: '4'
  }
];
*/


class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: "",
      videoResults: [],
      pageCount: 1,
      country: "United States"
    }

    this.handleMoreVideos = this.handleMoreVideos.bind(this)
    this.updateMoreVideos = this.updateMoreVideos.bind(this)
  }

  updateMoreVideos() {
    getHomeVideos(this.state.country, this.state.pageCount).then(res => {
      this.setState({ videoResults: res.results })
    })
  }

  handleMoreVideos(){
    this.setState({pageCount: (this.state.pageCount + 1)})
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
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <Grid header={this.state.searchTerm ? 'Search Result' : 'Home'}>
          
          {this.state.videoResults.map(video=>(
            <VideoThumbnail
              thumbLink = {video.thumbnail_link}
              videoPage = ""
            />
          ))}
          
      </Grid>

      <div>
        <Table onRow={(record, rowIndex) => {
            //return {
             // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
            //};
          }} dataSource={this.state.videoResults} rowKey={'key'} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Random Videos">
              <Column title="Video Title" dataIndex="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
              <Column title="Trending Date" dataIndex="trend_start" sorter= {(a, b) => a.trend_start.localeCompare(b.trend_start)}/>
              <Column title="Trending Date" dataIndex="trend_stop" sorter= {(a, b) => a.trend_stop.localeCompare(b.trend_stop)}/>
              <Column title="Likes" dataIndex="likes" sorter= {(a, b) => a.likes.localeCompare(b.likes)}/>
              <Column title="Picture Thumbnail" dataIndex="thumbnail_link"/>
            </ColumnGroup>
          </Table>  
          </div>
        </div>
        </div>
      </div>
    </div>
    )
  };

}

export default HomePage

