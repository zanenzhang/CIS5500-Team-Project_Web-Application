import React from "react";
import "./TrendingVideoCard.css";

import {
    Row,
    Col
} from 'antd'

function TrendingVideoCard() {
  

  return (
    <div className="videoCard">
        <Row className='trendingVideoNameSection'>
            <Col className='trendingVideoNameSection'>
                <Row className='videoTitleContainer'>
                    <h4 className='videoTitle'>Video Name Placeholder with a super long example, dont get to crazy this is now 2 lines</h4>
                </Row>
                
                <Row>
                    <Col span={6}>
                        <h5 className='videoData'>Views: 31.4M</h5>
                    </Col>
                    <Col span={9}>
                        <h5 className='videoData'>Trending for: 13 days</h5>
                    </Col>
                    <Col span={9}>
                        <h5 className='videoData'>Published: 2022-03-07</h5>
                    </Col>
                </Row>
            </Col>
            
        </Row>
        
        {/* <Row className='videoThumbnailSection'>
            <Col>
                <h5>this is the place</h5>
            </Col>
        </Row> */}
    </div>
  );
}

export default TrendingVideoCard;