import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Row,
    Col,
    Divider,
} from 'antd'

import { getChannel, getFindChannels } from '../fetcher'

const { Column, ColumnGroup } = Table;

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

                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <h3>Channels</h3>
                    <Table onRow={(record, rowIndex) => {
                        return {
                        onClick: event => {this.executeSelectedSearch(record.Ranking)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        };
                        }} dataSource={this.state.channelsQueryResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                                
                                <Column title="Ranking" dataIndex="Ranking" key="Ranking" sorter= {(a, b) => a.Ranking-b.Ranking}/>
                                <Column title="Title" dataIndex="Title" key="Title" sorter= {(a, b) => a.Title.localeCompare(b.Title)}/>
                                <Column title="Country" dataIndex="country" key="country" sorter= {(a, b) => a.country.localeCompare(b.country)}/>
                                <Column title="Language" dataIndex="language" key="language" sorter= {(a, b) => a.language.localeCompare(b.language)}/>
                                
                                <ColumnGroup title="Viewership">
                                    <Column title="Subscribers" dataIndex="subscribers" key="subscribers" sorter= {(a, b) => a.subscribers-b.subscribers}/>
                                    <Column title="Total Views" dataIndex="views" key="views" sorter= {(a, b) => a.views-b.views}/>
                                </ColumnGroup>
                    </Table>
                </div>



                {/* Selected Channel will display via below structure */}
                <Divider />
                {this.state.selectedChannelDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card>
                        <CardBody>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                <h5>Channel Title</h5>
                                </Col>

                                <Col flex={2} style={{ textAlign: 'center' }}>
                                    <h5>Country</h5>
                                </Col>

                                <Col flex={2} style={{ textAlign: 'right' }}>
                                <h5>Subcribers</h5>
                                </Col>
                            </Row>

                            <Row gutter='30' align='middle' justify='center'>
                                <Col flex={2} style={{ textAlign: 'left' }}>
                                    <CardTitle>{this.state.selectedChannelDetails.channel_title}</CardTitle>
                                </Col>

                                <Col flex={2} style={{ textAlign: 'center' }}>
                                <CardTitle>{this.state.selectedChannelDetails.country}</CardTitle>
                                </Col>

                                <Col flex={2} style={{ textAlign: 'right' }}>
                                    <CardTitle>{this.state.selectedChannelDetails.subscribers}</CardTitle>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    
                </div> : null}
                <Divider />

            </div>
        )
    }
}

export default TopChannelsPage