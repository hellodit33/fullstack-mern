import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import FollowHandler from "../Profile/FollowHandler";
import { isEmpty, timestampParser } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = ({ post }) => {
  //state for the comment text
  const [text, setText] = useState("");

  //redux gets the users and user data state
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  //import dispatch for the redux store
  const dispatch = useDispatch();

  /**
   *
   * @param {string} e
   * @desc handleComment dispatches the new comment and adds it to the database and to the posts so that it is published immediately through a double dispatch
   */
  const handleComment = (e) => {
    e.preventDefault();
    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };
  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <div
            className={
              comment.commentatorId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commentatorId)
                        return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commentator-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.commentatorPseudo}</h3>
                  {comment.commentatorId !== userData._id && (
                    <FollowHandler
                      idToFollow={comment.commentatorId}
                      type={"card"}
                    />
                  )}
                </div>
                <span>{timestampParser(comment.timestamp)}</span>
              </div>
              <p>{comment.text}</p>
              <EditDeleteComment comment={comment} postId={post._id} />
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            placeholder="Comment here"
          />
          <input type="submit" value="send" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
