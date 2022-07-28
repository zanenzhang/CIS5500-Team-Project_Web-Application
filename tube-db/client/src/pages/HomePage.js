import React from 'react';
import SideMenu from '../components/SideMenu';
import './HomePage.css'
import { getHomeVideos } from '../fetcher'
import Header from '../components/Header';

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
      console.log(this.state.videoResults);
    })
  };

  render() {

    return (
      
      <div>

      <div id="headerBar">
        
        <div id="headerLogo">
          <Header />
        </div>
        <div id="headerContent">
          Search bar here
        </div>
      </div>

      <div id="page">

        <div id="sideBar">
            <div>
            <SideMenu />
            </div>
        </div>
      
        <div id="pageContent">
        content
        <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
        <h3>Thumbnail Testing</h3>
        <Table onRow={(record, rowIndex) => {
            //return {
             // onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
            //};
          }} dataSource={this.state.videoResults} rowKey={'key'} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
            <ColumnGroup title="Random Videos">
              <Column title="Video Title" dataIndex="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
              <Column title="Trending Date" dataIndex="trending_date" sorter= {(a, b) => a.trending_date.localeCompare(b.trending_date)}/>
              <Column title="Likes" dataIndex="likes" sorter= {(a, b) => a.likes.localeCompare(b.likes)}/>
              <Column title="Picture Thumbnail" dataIndex="thumbnail_link"/>
            </ColumnGroup>
          </Table>  
        </div>
        </div>
      </div>
    </div>
    )
  };

}

export default HomePage

