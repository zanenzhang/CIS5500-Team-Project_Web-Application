import React from 'react';
import { Link } from 'react-router-dom';
import './VideoThumbnail.css';



const VideoThumbnail = ({thumbLink, videoId, videoTitle}) => (
  
  <Link to={`/video?videoid=${videoId}`}>
    <p1 className="videoTitle">{videoTitle}</p1>
    <img className="thumbnail" src={thumbLink} alt='video-thumb' />
  </Link>
    
);

export default VideoThumbnail;