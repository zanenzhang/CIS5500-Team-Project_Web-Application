import React from 'react';
import SideMenu from '../components/SideMenu';
import './TrendingVideosPage.css'
import { getTrendingVideos } from '../fetcher'
import HeaderBar from '../components/HeaderBar';
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import Navbar from '../components/Navbar';

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


class TrendingVideosPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      searchTerm: "",
      videoResults: [],
      pageCount: 1,
      loadLimit: 3,
      offset: this.getRandomOffset(),
      country: "United States"
    }

    this.handleMoreVideos = this.handleMoreVideos.bind(this)
    this.updateMoreVideos = this.updateMoreVideos.bind(this)
  }

  getRandomOffset(){
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  
    let randomRow = getRandomInt(2000);
    return randomRow;
  };


  updateMoreVideos() {
    getTrendingVideos(this.state.country, this.state.pageCount, this.state.offset).then(res => {
      this.setState({ videoResults: res.results })
    })
  }

  handleMoreVideos(){
    this.setState({pageCount: (this.state.pageCount + 1)})
    this.updateMoreVideos();
  }

  componentDidMount() {
    getTrendingVideos(this.state.country, this.state.pageCount, this.state.offset).then(res => {
      this.setState({ videoResults: res.results });
    })
    this.setState({pageCount: (this.state.pageCount + 1)})
  };

  render() {

    return (
      
      <div className='outerDiv'>
        <HeaderBar />
        <div id="page">
          <div id="sideBar">
              <Navbar />
          </div>
        
          <div id="pageContent">
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', marginBottom: '5vh' }}>
              <Grid header={this.state.searchTerm ? 'Search Result' : 'Video Search'}>
                
                {this.state.videoResults.map(video=>(
                  <VideoThumbnail
                    thumbLink = {video.thumbnail_link}
                    videoId = {video.video_id}
                    videoTitle = {video.video_title}
                  />
                ))}
                
              </Grid>
              <div >
                {this.state.pageCount <= this.state.loadLimit && (
                  <button id="loadMoreBtn" onClick={this.handleMoreVideos}>Load More Videos</button>
                )}
              
              </div>

            <div>
            
          </div>
        </div>
      </div>
    </div>
    </div>
    )
  };

}

export default TrendingVideosPage



/*
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
*/