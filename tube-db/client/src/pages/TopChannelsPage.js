import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress, Container, CardSubtitle } from "shards-react";
import HeaderMenu from '../components/HeaderMenu';
import './TopChannels.css';

//import { FixedSizeList as List } from "react-window";

import {
    Table,
    Row,
    Col,
    Divider,
} from 'antd'

import { getChannel, getFindChannels } from '../fetcher'

const { Column, ColumnGroup } = Table;

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
    }

    componentDidMount() {

        getFindChannels().then(res => {    // 
            this.setState({ channelsQueryResults: res.results })
        })

        getChannel(1).then(res => {
            this.setState({ selectedChannelDetails: res.results[0] })
        })
    }

    render() {
        return (
            <div>

                {/* <HeaderMenu /> */}

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Channels</h3>
                    <Table onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {this.executeSelectedSearch(record.Ranking)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        };
                        }} dataSource={this.state.channelsQueryResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 10, showQuickJumper:true }}>
                                
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
                {this.state.selectedChannelDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Container>
                     <h2 lex={2} style={{ textAlign: 'center' }}>{this.state.selectedChannelDetails.channel_title}</h2>
                        <Row>
                            <Col>
                                <Card style={{ 'border-radius': '1rem 0rem 0rem 1rem', 'background-color':'black'}}>
                                    <CardBody >
                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'center', margin: '0rem', padding: '0rem'}}>
                                                <h3 className={'cardText cardTitle'}>Statistics</h3>
                                            </Col>

                                            <Divider className='cardDivider'/>
                                        
                                        </Row>
                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'center'}}>
                                                <CardTitle className='cardText'>{"All Time"}</CardTitle>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign:'left'}}>
                                                <CardSubtitle className='cardText'>Views</CardSubtitle>
                                            </Col>


                                            <Col flex={2} style={{ textAlign: 'right' }}>
                                                <CardSubtitle className='cardText'>Subs</CardSubtitle>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <p className='cardText'>{numFormatter(this.state.selectedChannelDetails.views)}</p>
                                            </Col>

                                            <Col flex={2} style={{ textAlign: 'right' }}>
                                                <p className='cardText'>{numFormatter(this.state.selectedChannelDetails.subscribers)}</p>
                                            </Col>
                                        </Row>

                                        <Divider className='cardDivider'/>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'center' }}>
                                                <CardTitle className='cardText'>{"Last 3 Months"}</CardTitle>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign:'left'}}>
                                                <CardSubtitle className='cardText'>Views</CardSubtitle>
                                            </Col>


                                            <Col flex={2} style={{ textAlign: 'right' }}>
                                                <CardSubtitle className='cardText'>Subs</CardSubtitle>
                                            </Col>
                                        </Row>

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <p className='cardText'>{numFormatter(this.state.selectedChannelDetails.views_l3m)}</p>
                                            </Col>

                                            <Col flex={2} style={{ textAlign: 'right' }}>
                                                <p className='cardText'>{numFormatter(this.state.selectedChannelDetails.subscribers_l3m)}</p>
                                            </Col>
                                        </Row>

                                        {/* <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                            <h5 className='cardText'>Growth</h5>
                                            </Col>

                                            <Col flex={2} style={{ textAlign: 'right' }}>
                                            <h5 className='cardText'>Growth</h5>
                                            </Col>
                                        </Row> */}

                                        <Row gutter='30' align='middle' justify='center'>
                                            <Col flex={2} style={{ textAlign: 'left' }}>
                                                <p className={this.state.selectedChannelDetails.view_growth_rate_l3m > 0 ? 'posGrowth':'negGrowth'}>
                                                    {growthFormatter(this.state.selectedChannelDetails.view_growth_rate_l3m)}
                                                </p>
                                            </Col>

                                            <Col flex={2} style={{ textAlign: 'right' }}>
                                                <p className={this.state.selectedChannelDetails.subscriber_growth_rate_l3m > 0 ? 'posGrowth':'negGrowth'}>
                                                    {growthFormatter(this.state.selectedChannelDetails.subscriber_growth_rate_l3m)}
                                                </p>
                                            </Col>
                                        </Row>

                                    </CardBody>
                                </Card>
                            </Col>

                            <Col flex={2} style={{ textAlign: 'right' , 'border-radius': '0 1rem 1rem 0', 'background-color':'#2f4550'}}>
                                <h3 flex={2} style={{ textAlign: 'center', color: 'whitesmoke', margin: '1rem 0 1rem 0'}}>Trending Videos</h3>
                            </Col>
                        </Row>
                        
                    </Container>
                    
                    
                </div> : null}
                <Divider />

            </div>
        )
    }
}

export default TopChannelsPage