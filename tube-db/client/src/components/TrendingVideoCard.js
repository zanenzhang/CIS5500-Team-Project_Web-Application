import React from "react";
import "./TrendingVideoCard.css";

import {
    Row,
    Col
} from 'antd'




const prototype = [{"title":"I’ve Got a Huge Secret Hiding Behind This Fake Office","published":"2022-06-15T04:00:00.000Z","video_id":"h8g9wfI9nGI","views":9075972,"trend_stop":"2022-06-18T04:00:00.000Z","trend_start":"2022-06-16T04:00:00.000Z","countries":"Canada,Germany,India,United Kingdom,United States"},{"title":"Pranks Destroy Scam Callers- GlitterBomb Payback","published":"2022-05-08T04:00:00.000Z","video_id":"xsLJZyih3Ac","views":30868590,"trend_stop":"2022-05-17T04:00:00.000Z","trend_start":"2022-05-09T04:00:00.000Z","countries":"Canada,Germany,India,United Kingdom,United States"},{"title":"Robot Piano Catches Fire Playing Rush E (World’s Hardest Song)","published":"2022-03-19T04:00:00.000Z","video_id":"uBEL3YVzMwk","views":9185225,"trend_stop":"2022-03-27T04:00:00.000Z","trend_start":"2022-03-27T04:00:00.000Z","countries":"United Kingdom"},{"title":"This Piano Speaks English","published":"2022-03-19T04:00:00.000Z","video_id":"uBEL3YVzMwk","views":8014045,"trend_stop":"2022-03-26T04:00:00.000Z","trend_start":"2022-03-20T04:00:00.000Z","countries":"Canada,Germany,United Kingdom,United States"},{"title":"World's Largest T-Shirt Cannon","published":"2021-12-20T05:00:00.000Z","video_id":"QiKZYt9070U","views":6387831,"trend_stop":"2021-12-22T05:00:00.000Z","trend_start":"2021-12-21T05:00:00.000Z","countries":"Canada,Germany,India,United Kingdom,United States"}];


function TrendingVideoCard({data, num}) {

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


    console.log(data);
    let record_data = data;
    
    let days = record_data.trend_stop - record_data.trend_stop;

    let countries = "";

    if(record_data.countries.includes(",")){
        countries = (record_data.countries).split(",").join(" ");
    }else{
        countries = record_data.countries
    }
    

    const trend_start = new Date(record_data.trend_start.slice(0,19));
    const trend_stop = new Date(record_data.trend_stop.slice(0,19));

    const trend_duration_ms = trend_stop.getTime() - trend_start.getTime();
    let trend_duration_hr = (trend_duration_ms / 3600000).toFixed(0);

    let gradient = "videoThumbnailSection"+num;

    if (trend_duration_hr < 24){
        trend_duration_hr = '< 24'
    }

    let img_url = "https://i.ytimg.com/vi/"+ record_data.video_id + "/hqdefault.jpg";

    return (
        <div className="videoCard">
            <Row className='trendingVideoNameSection'>
                <Col className='trendingVideoNameSection'>
                    <Row className='videoTitleContainer'>
                        <h4 className='videoTitle'>{record_data.title}</h4>
                    </Row>
                    
                    <Row>
                        <Col span={6}>
                            <h5 className='videoData'><b className="videoDataTitle">Views:</b> {numFormatter(record_data.views)}</h5>
                        </Col>
                        <Col span={9}>
                            <h5 className='videoData'><b className="videoDataTitle">Trending for:</b> {trend_duration_hr} hours</h5>
                        </Col>
                        <Col span={9}>
                            <h5 className='videoData'><b className="videoDataTitle">Published:</b> {record_data.published.slice(0,10)}</h5>
                        </Col>
                    </Row>
                </Col>
                
            </Row>
            
            <Row className={gradient}>
                <Col span={6}>
                    <h5 className='videoDataCountries'><b className="videoDataTitle">Countries:</b><br></br>{countries}</h5>
                </Col>
                <Col span={18}>
                    <img className='videoTile' src={img_url}/>
                </Col>
            </Row>
        </div>
    );
 }

 

export default TrendingVideoCard;