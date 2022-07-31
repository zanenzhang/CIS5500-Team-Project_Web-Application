import React from 'react';
import { Link } from 'react-router-dom';

const VideoThumbnail = ({thumbLink, videoPage}) => (
  <div>
      <Link to={`/${videoPage}`}>
        <img src={thumbLink} alt='video-thumb' />
      </Link>
  </div>
);

export default VideoThumbnail;