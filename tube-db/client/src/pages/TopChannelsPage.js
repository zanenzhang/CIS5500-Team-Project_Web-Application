import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress, Container, CardSubtitle } from "shards-react";
import SideMenu from '../components/SideMenu';
import './TopChannels.css';
import TrendingVideoCard from '../components/TrendingVideoCard';

//import { FixedSizeList as List } from "react-window";

import {
    Table,
    Row,
    Col,
    Divider,
    Carousel
} from 'antd'

import { getChannel, getFindChannels, getChannelRecentTrending } from '../fetcher'
import { Footer } from 'antd/lib/layout/layout';

const { Column, ColumnGroup } = Table;

//add the case that values are negative (test abs. val and append - when negative) //perhaps make a utility.js file 
function numFormatter(num) {
    if(num >= 1000 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K where num >= 1,000 but num < 1 mil
    }else if(num >= 1000000 && num < 1000000000){
        return (num/1000000).toFixed(1) + 'M'; // convert to M where num >= 1 mil but num < 1 bil
    }else if(num >= 1000000000){
        return (num/1000000000).toFixed(1) + 'B'; // convert to B where num >= 1 bil
    }else if(num < 900){
        return num; // if num < 1000, do nothing
    }
}

function growthFormatter(deci){
    let newNum = deci;
    newNum*=100;
    if (newNum>=0){
        return "+" + newNum.toFixed(1) + "%";
    }else{
        return newNum.toFixed(1) + "%";
    }
}

class TopChannelsPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedQuery: "",
            channelsQuery: "",
            selectedQueryResults: [],
            channelsQueryResults: [],
            selectedTrendingQueryResults: [],
            selectedChannelDetails: null
        }
        this.updateChannelSearchBar = this.updateChannelSearchBar.bind(this)
        this.executeChannelSearch = this.executeChannelSearch.bind(this)
        this.executeSelectedSearch = this.executeSelectedSearch.bind(this)
    }

    updateChannelSearchBar(event) {
        this.setState({ selectedQuery: event.target.value })
    }

    executeChannelSearch() {
        getFindChannels().then(res => {    // 
            this.setState({ channelsQueryResults: res.results })
        })
    }

    executeSelectedSearch(Ranking) {
        getChannel(Ranking).then(res => {    // 
            this.setState({ selectedQueryResults: res.results })
            this.setState({ selectedChannelDetails: res.results[0] })
        })

        getChannelRecentTrending(Ranking).then(res => {    // 
            this.setState({ selectedTrendingQueryResults: res.results })
        })

        
    }

    componentDidMount() {

        getFindChannels().then(res => {    // 
            this.setState({ channelsQueryResults: res.results })
        })

        getChannel(1).then(res => {
            this.setState({ selectedChannelDetails: res.results[0] })
        })

        getChannelRecentTrending(3430).then(res => {
            this.setState({ selectedTrendingQueryResults: res.results });
        })
    }

    ////////////////////////////////////////////////////
    // Switch for number of recent trending (up to 5) //
    ///////////////////////////////////////////////////
    dynamicCarousel(){
        switch(this.state.selectedTrendingQueryResults.length){
            case 1: 
                return <TrendingVideoCard data={this.state.selectedTrendingQueryResults[0]} num={0}/>;
            case 2: 
                return <Carousel className='carousel' autoplay='true' dotPosition='right' effect='fade' autoplaySpeed={5000}>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[0]} num={0}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[1]} num={1}/>
            </Carousel>;
            case 3: 
                return <Carousel className='carousel' autoplay='true' dotPosition='right' effect='fade' autoplaySpeed={5000}>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[0]} num={0}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[1]} num={1}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[2]} num={2}/>
            </Carousel>;
            case 4: 
                return <Carousel className='carousel' autoplay='true' dotPosition='right' effect='fade' autoplaySpeed={5000}>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[0]} num={0}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[1]} num={1}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[2]} num={2}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[3]} num={3}/>
            </Carousel>;
            case 5: 
                return <Carousel className='carousel' autoplay='true' dotPosition='right' effect='fade' autoplaySpeed={5000}>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[0]} num={0}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[1]} num={1}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[2]} num={2}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[3]} num={3}/>
                <TrendingVideoCard data={this.state.selectedTrendingQueryResults[4]} num={4}/>
            </Carousel>;

            default: return <Carousel className='carousel' autoplay='true' dotPosition='right' effect='fade' autoplaySpeed={5000}>
            <TrendingVideoCard data={this.state.selectedTrendingQueryResults[0]} num={0}/>
            <TrendingVideoCard data={this.state.selectedTrendingQueryResults[1]} num={1}/>
            <TrendingVideoCard data={this.state.selectedTrendingQueryResults[2]} num={2}/>
            <TrendingVideoCard data={this.state.selectedTrendingQueryResults[3]} num={3}/>
            <TrendingVideoCard data={this.state.selectedTrendingQueryResults[4]} num={4}/>
        </Carousel>
        }
    }

    render() {
        return (
            <div className='page'>

                {/* <SideMenu /> */}

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Top Channels</h3>
                    <Table onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {this.executeSelectedSearch(record.Ranking)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        };
                        }} dataSource={this.state.channelsQueryResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                                
                                <Column title="Ranking" dataIndex="Ranking" key="Ranking" sorter= {(a, b) => a.Ranking-b.Ranking}/>
                                <Column title="Title" dataIndex="Title" key="Title" sorter= {(a, b) => a.Title.localeCompare(b.Title)}/>
                                <Column title="Country" dataIndex="country" key="country" sorter= {(a, b) => a.country.localeCompare(b.country)}/> {/* Need a way to deal with null here...*/}
                                <Column title="Language" dataIndex="language" key="language" sorter= {(a, b) => a.language.localeCompare(b.language)}/>
                                
                                <ColumnGroup title="Viewership">
                                    <Column title="Subscribers" dataIndex="subscribers" key="subscribers" render={(a)=>numFormatter(a)} sorter= {(a, b) => a.subscribers-b.subscribers}/>
                                    <Column title="Total Views" dataIndex="views" key="views" render={(a)=>numFormatter(a)} sorter= {(a, b) => a.views-b.views}/>
                                </ColumnGroup>
                    </Table>
                </div>



                {/* Selected Channel will display via below structure */}
                <Divider />
                {this.state.selectedChannelDetails ? 
                
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}> 
                    

                    {/*    START OF SELECTED CHANNEL CONTAINER    */}    
                    <h2 lex={2} style={{ textAlign: 'center' }}>{this.state.selectedChannelDetails.channel_title}</h2>
                        
                    <Row className='selectedContainer'>

                        {/*    START OF SELECTED CHANNEL STATS SECTION OF CONTAINER   */}    
                        <Col className='channelStats' span={6}>
                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'center', margin: '0rem', padding: '0rem'}}>
                                    <h3 className='statTopTitle'>Channel<br></br>Statistics</h3>
                                </Col>
                            </Row>


                            <Divider className='cardDivider'/>


                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'center'}}>
                                    <h4 className='statSectionTitle'>All Time</h4>
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2}  style={{ textAlign: 'left' }}>
                                        <p className='statTitle'>Views</p>
                                </Col>
                                <Col flex={2}  style={{ textAlign: 'right' }}>
                                        <p className='statTitle'>Subs</p>
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <p className='statText'>{numFormatter(this.state.selectedChannelDetails.views)}</p>
                                </Col>

                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <p className='statText'>{numFormatter(this.state.selectedChannelDetails.subscribers)}</p>
                                </Col>
                            </Row>



                            <Divider className='cardDivider'/>



                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'center' }}>
                                <h4 className='statSectionTitle'>Last 3 Months</h4>
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2}  style={{ textAlign: 'left' }}>
                                        <p className='statTitle'>Views</p>
                                </Col>
                                <Col flex={2}  style={{ textAlign: 'right' }}>
                                        <p className='statTitle'>Subs</p>
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <p className='statText'>{numFormatter(this.state.selectedChannelDetails.views_l3m)}
                                        <br></br>
                                        <p className={this.state.selectedChannelDetails.view_growth_rate_l3m > 0 ? 'posGrowth':'negGrowth'}>
                                            {growthFormatter(this.state.selectedChannelDetails.view_growth_rate_l3m)}
                                        </p>
                                    </p>
                                    
                                </Col>

                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <p className='statText'>{numFormatter(this.state.selectedChannelDetails.subscribers_l3m)}
                                        <br></br>
                                        <p className={this.state.selectedChannelDetails.subscriber_growth_rate_l3m > 0 ? 'posGrowth':'negGrowth'}>
                                        {growthFormatter(this.state.selectedChannelDetails.subscriber_growth_rate_l3m)}
                                        </p>
                                    </p>
                                </Col>
                            </Row>

                            <Divider className='cardDividerBottom'/>

                        </Col>

                {/*    START OF TRENDING VIDEO SECTION OF CONTAINER    */}
                        
                        <Col className='recentTrendingContainer' span={18}>
                            <Row className='trendingVideoSectionTitle'>
                                <h3 className='trendingTopTitle'>Most Recent Trending Videos</h3>
                            </Row>

                                {this.state.selectedTrendingQueryResults == null || this.state.selectedTrendingQueryResults.length < 1 ?
                                <Row className='noRecentTrends'>
                                    <h3 className='noRecentTrendsText'>
                                        No Recently Trending Videos
                                    </h3>
                                </Row>: <Row className='carouselSection'>
                                        {this.dynamicCarousel()}
                                    </Row>}
                                
                            
                        </Col>
                    </Row>
                        
                    {/* </Container> */}
                    <Footer></Footer>
                    
                </div> : null}
                <Divider />
                        {/* <Row>

                        <Col flex={2} style={{ textAlign: 'right' , 'border-radius': '0 1rem 1rem 0', 'background-color':'#2f4550'}}>
                            <h3 flex={2} className='cardTopTitle' style={{ textAlign: 'center', margin: '1rem 0 1rem 0'}}>Recent Trending Videos</h3>
                            <Carousel className='carousel' autoplay='true' dotPosition='right'>
                                <div>
                                    <a href='https://www.youtube.com/embed/5WjcDji3xYc'><img className='center' src="https://i.ytimg.com/vi/5WjcDji3xYc/mqdefault.jpg"/></a>
                                </div>
                                <div>
                                    <img className='center' src="https://i.ytimg.com/vi/DTvS9lvRxZ8/mqdefault.jpg"/>
                                </div>
                                <div>
                                    <img className='center' src="https://i.ytimg.com/vi/9nidKH8cM38/mqdefault.jpg"/>
                                </div>
                                <div>
                                    <img className='center' src="https://i.ytimg.com/vi/w-aidBdvZo8/mqdefault.jpg"/>
                                </div>
                                <div>
                                    <img className='center' src="https://i.ytimg.com/vi/vePc5V4h_kg/mqdefault.jpg"/>
                                </div>
                            </Carousel>
                        </Col>
                    </Row> */}
            </div>
        )
    }
}

export default TopChannelsPage