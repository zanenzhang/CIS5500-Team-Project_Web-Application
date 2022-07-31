import React from 'react';
import { Link } from 'react-router-dom';
import './VideoThumbnail.css';

const VideoThumbnail = ({thumbLink, videoPage}) => (
  <div>
      <Link to={`/${videoPage}`}>
        <img className="thumbnail" src={thumbLink} alt='video-thumb' />
      </Link>
  </div>
);

export default VideoThumbnail;