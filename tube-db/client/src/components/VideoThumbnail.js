import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './VideoThumbnail.css';


const VideoThumbnail = ({thumbLink, videoId, videoTitle}) => {

  
  const [imgSrc, setImgSrc] = useState(thumbLink);
  
  const errorHandler = event => {
    setImgSrc("https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg");
    console.log(imgSrc)
  }

  return(
    <div>
      <Link to={`/video?videoid=${videoId}`}>
        <p1 className="videoTitle">{videoTitle}</p1>
        <img className="thumbnail" src={thumbLink} alt='video-thumb'/>
      </Link>
    </div>
  )
}

  

export default VideoThumbnail;