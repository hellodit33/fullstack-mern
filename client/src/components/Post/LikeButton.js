import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";

//the like function is in work in progress, not functioning yet
const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  return (
    <div className="like-container" style={{ backgroundColor: "white" }}>
      {uid === null && (
        <Popup
          trigger={<i className="fa-regular fa-heart"></i>}
          style={{ backgroundColor: "white" }}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div style={{ backgroundColor: "white" }}>
            Sign in to like a post!
          </div>
        </Popup>
      )}
      {uid && liked === false && (
        <i className="fa-regular fa-heart" onClick={like}></i>
      )}
      {uid && liked && <i className="fa-solid fa-heart" onClick={unlike}></i>}
    </div>
  );
};

export default LikeButton;
