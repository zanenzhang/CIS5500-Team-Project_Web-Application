import React from 'react';
import './TrendingVideosPage.css'
import HeaderBar from '../components/HeaderBar';
import { getTrendingVideos } from '../fetcher'
import Grid from '../components/Grid';
import VideoThumbnail from '../components/VideoThumbnail';
import Navbar from '../components/Navbar';

import {
  Table,
  Select,
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
      country: "United States",
      trendStart: "",
      trendStop: "",
      publishStart: "",
      publishStop: "",

      videoTitleString: "",
      channelTitleString: "",
      tagString: "",
      descriptionString: "",
      categoryString: "",

      viewsLow: 1000000,
      viewsHigh: 200000000000,
      likesLow: 10000,
      likesHigh: 1000000000,
      dislikesLow: 10000,
      dislikesHigh: 100000,
      commentsLow: 10000,
      commentsHigh: 100000000
    }

    this.handleMorePages = this.handleMorePages.bind(this)
    this.handleUpdateVideos = this.handleUpdateVideos.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.removeOffsetAndUpdate = this.removeOffsetAndUpdate.bind(this)

    this.handleUpdateTrendStart = this.handleUpdateTrendStart.bind(this)
    this.handleUpdateTrendStop = this.handleUpdateTrendStop.bind(this)
    this.handleUpdatePublishStart = this.handleUpdatePublishStart.bind(this)
    this.handleUpdatePublishStop = this.handleUpdatePublishStop.bind(this)

    this.handleVideoTitleString = this.handleVideoTitleString.bind(this)
    this.handleChannelTitleString = this.handleChannelTitleString.bind(this)
    this.handleTagString = this.handleTagString.bind(this)
    this.handleDescriptionString = this.handleDescriptionString.bind(this)
    this.handleCategoryString = this.handleCategoryString.bind(this)

    this.handleLikesLow = this.handleLikesLow.bind(this)
    this.handleLikesHigh = this.handleLikesHigh.bind(this)
    this.handleDislikesLow = this.handleDislikesLow.bind(this)
    this.handleDislikesHigh = this.handleDislikesHigh.bind(this)
    this.handleViewsLow = this.handleViewsLow.bind(this)
    this.handleViewsHigh = this.handleViewsHigh.bind(this)
    this.handleCommentsLow = this.handleCommentsLow.bind(this)
    this.handleCommentsHigh = this.handleCommentsHigh.bind(this)
  }

  getRandomOffset(){
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  
    let randomRow = getRandomInt(2000);
    return randomRow;
  };

  removeOffsetAndUpdate(value){
    this.setState({offset: value}, this.handleUpdateVideos);
  }

  handleUpdateVideos() {
    getTrendingVideos(this.state.country, this.state.pageCount, this.state.offset, this.state.trendStart, this.state.trendStop,
      this.state.publishStart, this.state.publishStop, this.state.videoTitleString, this.state.channelTitleString,
      this.state.tagString).then(res => {
      this.setState({ videoResults: res.results })
    })
  }

  handleVideoTitleString(value){
    this.setState({videoTitleString: value})
  }

  handleChannelTitleString(value){
    this.setState({channelTitleString: value})
  }

  handleTagString(value){
    this.setState({tagString: value})
  }

  handleDescriptionString(value){
    this.setState({descriptionString: value})
  }

  handleCategoryString(value){
    this.setState({categoryString: value})
  }

  handleViewsLow(value){
    this.setState({viewsLow: value})
  }

  handleViewsHigh(value){
    this.setState({viewsHigh: value})
  }

  handleCommentsLow(value){
    this.setState({commentsLow: value})
  }

  handleCommentsHigh(value){
    this.setState({commentsHigh: value})
  }

  handleLikesLow(value){
    this.setState({likesLow: value})
  }

  handleLikesHigh(value){
    this.setState({likesHigh: value})
  }

  handleDislikesLow(value){
    this.setState({dislikesLow: value})
  }

  handleDislikesHigh(value){
    this.setState({dislikesHigh: value})
  }

  handleUpdatePublishStart(value){
    this.setState({publishStart: value})
  }

  handleUpdatePublishStop(value){
    this.setState({publishStop: value})
  }

  handleUpdateTrendStart(value){
    this.setState({trendStart: value})
  }

  handleUpdateTrendStop(value){
    this.setState({trendStop: value})
  }

  handleMorePages(){
    this.setState({pageCount: (this.state.pageCount + 1)},this.handleUpdateVideos);
  }

  handleCountryChange(value){
    this.setState({country: value})
  }

  componentDidMount() {
    getTrendingVideos(this.state.country, this.state.pageCount, this.state.offset, this.state.trendStart, this.state.trendStop, 
      this.state.viewsLow, this.state.viewsHigh, this.state.likesLow, this.state.likesHigh, this.state.dislikesLow, this.state.dislikesHigh, 
      this.state.commentsLow, this.state.commentsHigh).then(res => {
      this.setState({ videoResults: res.results });
    })
  };

  render() {

    return (
      
      <div className='outerDiv'>
        <HeaderBar handleCountryChange={this.handleCountryChange} handleUpdateTrendStart={this.handleUpdateTrendStart} handleUpdateTrendStop={this.handleUpdateTrendStop}
        handleUpdatePublishStart={this.handleUpdatePublishStart} handleUpdatePublishStop={this.handleUpdatePublishStop}
        removeOffsetAndUpdate={this.removeOffsetAndUpdate} handleVideoTitleString={this.handleVideoTitleString}
        handleChannelTitleString={this.handleChannelTitleString} handleTagString={this.handleTagString}
        handleViewsLow={this.handleViewsLow} handleViewsHigh={this.handleViewsHigh} handleLikesLow={this.handleLikesLow} handleLikesHigh={this.handleLikesHigh} 
        handleDislikesLow={this.handleDislikesLow} handleDislikesHigh={this.handleDislikesHigh} handleCommentsLow={this.handleCommentsLow} handleCommentsHigh={this.handleCommentsHigh} 
        />
        
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
                  <button id="loadMoreBtn" onClick={this.handleMorePages}>Load More Videos</button>
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