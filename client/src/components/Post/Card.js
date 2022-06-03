import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import FollowHandler from "../Profile/FollowHandler";
import { dateParser, isEmpty } from "../Utils";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  //state for the loading icon
  const [isLoading, setIsLoading] = useState(true);

  //state for the updates
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

  //state for showing comments
  const [showComments, setShowComments] = useState(false);

  //redux gets the user data and the users data state
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  //import dispatch for the redux store
  const dispatch = useDispatch();

  /**
   * @desc updateItem updates the post
   */
  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post._id, textUpdate));
    }
    setIsUpdated(false);
  };

  //isLoading disappears when userData appears, if it's not empty
  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fa-solid fa-spinner"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="poster-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData
                      .map((user) => {
                        if (user._id === post.posterId) return user.pseudo;
                        else return null;
                      })
                      .join("")}
                </h3>
                {post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
                <div></div>
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                ></textarea>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Send
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic"></img>
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <i
                  className="fa-solid fa-comment"
                  /* this button shows and hides comments on clicks */
                  onClick={() => setShowComments(!showComments)}
                ></i>
                <span>{post.comments.length}</span>
              </div>
              <LikeButton />
              <i className="fa-solid fa-share"></i>
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
