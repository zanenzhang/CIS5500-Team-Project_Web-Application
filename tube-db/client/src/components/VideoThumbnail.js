import React from 'react';
import { Link } from 'react-router-dom';
import './VideoThumbnail.css';

const VideoThumbnail = ({thumbLink, videoId}) => (
  
  <Link to={`/video?videoid=${videoId}`}>
    <img className="thumbnail" src={thumbLink} alt='video-thumb' />
  </Link>
    
);

export default VideoThumbnail;