import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";


import {
    Table,
    Row,
    Col,
    Divider,
} from 'antd'

import { getChannel } from '../fetcher'

class TopChannelsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            channelQuery: "",
            queryResults: [],
            selectedChannelDetails: null
        }
        this.updateChannelSearchBar = this.updateChannelSearchBar.bind(this)
        this.executeChannelSearch = this.executeChannelSearch.bind(this)
    }

    updateChannelSearchBar(event) {
        this.setState({ channelQuery: event.target.value })
    }

    executeChannelSearch() {
        getChannel(this.state.channelQuery).then(res => {    // 
            this.setState({ queryResults: res.results })
            this.setState({ selectedChannelDetails: res.results[0] })

        })
    }

    componentDidMount() {
        getChannel("neebsgaming").then(res => {
            this.setState({ selectedChannelDetails: res.results[0] })
        })
    }

    render() {
        return (
            <div>
                <Form style={{ width: '80vw', margin: '0 auto', marginTop: '5vh' }}>
                    <Row>
                        <Col flex={2}><FormGroup style={{ width: '20vw', margin: '0 auto' }}>
                            <label>Channel Name</label>
                            <FormInput placeholder="Channel Name" value={this.state.channelQuery} onChange={this.updateChannelSearchBar} />
                        </FormGroup></Col>
                        
                        <Col flex={2}><FormGroup style={{ width: '10vw' }}>
                            <Button style={{ marginTop: '4vh' }} onClick={this.executeChannelSearch}>Execute Search</Button>
                        </FormGroup></Col>
                    </Row>
                </Form>


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
                                    {this.state.selectedChannelDetails.country}
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