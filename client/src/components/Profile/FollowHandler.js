import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { isEmpty } from "../Utils";

const FollowHandler = ({ idToFollow, type }) => {
  //redux gets the user data state
  const userData = useSelector((state) => state.userReducer);

  //state for follow handler
  const [isFollowed, setIsFollowed] = useState(false);

  //importing dispatch
  const dispatch = useDispatch();

  //follow and unfollow users when clicking on button
  const handleFollow = () => {
    dispatch(followUser(userData._id, idToFollow));
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
    setIsFollowed(false);
  };

  //is followed is true if the userData says that the user follows the person, otherwise it's false
  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setIsFollowed(true);
      } else setIsFollowed(false);
    }
  }, [userData, idToFollow]);

  return (
    <>
      {/*showing members to follow or that the user follows + suggestion to follow them if they don't follow them yet */}

      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Following</button>
          )}
          {type === "card" && <i className="fa-solid fa-user-check"></i>}
        </span>
      )}
      {isFollowed === false && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">Follow</button>
          )}
          {type === "card" && <i className="fa-solid fa-user-plus"></i>}
        </span>
      )}
    </>
  );
};

export default FollowHandler;
