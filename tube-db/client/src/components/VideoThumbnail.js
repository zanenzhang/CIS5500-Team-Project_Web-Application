import React from 'react';
import { Link } from 'react-router-dom';
import './VideoThumbnail.css';

const VideoThumbnail = ({thumbLink, videoId}) => (
  <div>
      <Link to={`/video?videoid=${videoId}`}>
        <img className="thumbnail" src={thumbLink} alt='video-thumb' />
      </Link>
  </div>
);

export default VideoThumbnail;