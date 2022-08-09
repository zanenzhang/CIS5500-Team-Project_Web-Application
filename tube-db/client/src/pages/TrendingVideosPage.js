import React from 'react';
import './TrendingVideosPage.css'
import HeaderBar from '../components/HeaderBar';
import { getTrendingVideos } from '../fetcher'
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
      loadLimit: 2,
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

      viewsLow: 0,
      viewsHigh: 0,
      likesLow: 0,
      likesHigh: 0,
      dislikesLow: 0,
      dislikesHigh: 0,
      commentsLow: 0,
      commentsHigh: 0
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

    this.handleUpdateLikesLow = this.handleUpdateLikesLow.bind(this)
    this.handleUpdateLikesHigh = this.handleUpdateLikesHigh.bind(this)
    this.handleUpdateDislikesLow = this.handleUpdateDislikesLow.bind(this)
    this.handleUpdateDislikesHigh = this.handleUpdateDislikesHigh.bind(this)
    this.handleUpdateViewsLow = this.handleUpdateViewsLow.bind(this)
    this.handleUpdateViewsHigh = this.handleUpdateViewsHigh.bind(this)
    this.handleUpdateCommentsLow = this.handleUpdateCommentsLow.bind(this)
    this.handleUpdateCommentsHigh = this.handleUpdateCommentsHigh.bind(this)
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
      this.state.publishStart, this.state.publishStop, this.state.videoTitleString, this.state.channelTitleString, this.state.tagString,
      this.state.viewsLow, this.state.viewsHigh, this.state.likesLow, this.state.likesHigh, this.state.dislikesLow, this.state.dislikesHigh, 
      this.state.commentsLow, this.state.commentsHigh).then(res => {
      this.setState({ videoResults: res.results });
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

  handleUpdateViewsLow(value){
    this.setState({viewsLow: value})
  }

  handleUpdateViewsHigh(value){
    this.setState({viewsHigh: value})
  }

  handleUpdateLikesLow(value){
    this.setState({likesLow: value})
  }

  handleUpdateLikesHigh(value){
    this.setState({likesHigh: value})
  }

  handleUpdateDislikesLow(value){
    this.setState({dislikesLow: value})
  }

  handleUpdateDislikesHigh(value){
    this.setState({dislikesHigh: value})
  }

  handleUpdateCommentsLow(value){
    this.setState({commentsLow: value})
  }

  handleUpdateCommentsHigh(value){
    this.setState({commentsHigh: value})
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
      this.state.publishStart, this.state.publishStop, this.state.videoTitleString, this.state.channelTitleString, this.state.tagString,
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
        handleUpdateViewsLow={this.handleUpdateViewsLow} handleUpdateViewsHigh={this.handleUpdateViewsHigh} handleUpdateLikesLow={this.handleUpdateLikesLow} handleUpdateLikesHigh={this.handleUpdateLikesHigh} 
        handleUpdateDislikesLow={this.handleUpdateDislikesLow} handleUpdateDislikesHigh={this.handleUpdateDislikesHigh} handleUpdateCommentsLow={this.handleUpdateCommentsLow} handleUpdateCommentsHigh={this.handleUpdateCommentsHigh} 
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
                  <button id="loadMoreBtn" onClick={this.handleMorePages}><img id="loadIcon" src={loadIcon}/> Load More Videos</button>
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