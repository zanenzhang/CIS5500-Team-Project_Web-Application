import React, { useState } from "react";
import cn from "classnames";
import { ReactComponent as Hand } from "../images/hand.svg";
import Axios from 'axios';

import "./LikeButton.scss";

const particleList = Array.from(Array(10));


const LikeButton = ({thumbLink, videoId, videoTitle}) => {
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);

  var user = sessionStorage.getItem("userInfo");

  return (
    <button
      onClick={() => {
        setLiked(!liked);
        setClicked(true);
       
        var fullLink = window.localStorage.getItem('link');
        window.localStorage.setItem('likedLink', fullLink);

        Axios.post('http://localhost:8080/api/insert',
            {user: user,
            videoId: videoId}).then(() => {
              console.log("successful insert");
            });
        
      }}

      onAnimationEnd={() => setClicked(false)
        
      }
      className={cn("like-button-wrapper", {
        liked,
        clicked,
       
      })}
      
    >
      {liked && (
        <div className="particles">
          {particleList.map((_, index) => (
            <div
              className="particle-rotate"
              style={{
                transform: `rotate(${
                  (360 / particleList.length) * index + 1
                }deg)`,
              }}
            >
              <div className="particle-tick" />
            </div>
          ))}
        </div>
      )}
      <div className="like-button">
        <Hand />
        <span>Favorite This Video</span>
        <span className={cn("suffix", {liked})}></span>
      </div>
    </button>
  );
};

export default LikeButton;