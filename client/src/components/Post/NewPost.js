import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";

const NewPostForm = () => {
  //state for is loading
  const [isLoading, setIsLoading] = useState(true);

  //states for the inputs for the post
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();

  //Redux gets the user data and the error state
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postError);

  //import dispatch for the redux store
  const dispatch = useDispatch();

  //sending the post to the redux store
  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      //the file upload does not work on heroku so the image icon to upload is desactivated
      if (file) data.append("file", file);
      data.append("video", video);
      //dispatch the data so that it creates a post
      await dispatch(addPost(data));
      //dispatch the posts again so that the post gets published immediately on the feed
      dispatch(getPosts());
      //cancel the post so that the user's post is not kept in the input field
      cancelPost();
    } else {
      alert("Please write a personal hint.");
    }
  };
  //the handle picture function does not work on heroku so it's desactivated
  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  //Cancel post function appears when the user starts writing something
  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    //this function embeds the youtube links as a preview and as a video when posted
    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fa-solid fa-spinner"></i>
      ) : (
        <>
          <div className="data">
            <p>
              <span>{userData.following ? userData.following.length : 0}</span>{" "}
              Following
              {userData.following && userData.following.length > 1 ? "s" : null}
            </p>
            <p>
              <span>{userData.followers ? userData.followers.length : 0}</span>{" "}
              Follower
              {userData.followers && userData.followers.length > 1 ? "s" : null}
            </p>
          </div>
          <NavLink to="/profile">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="What is your personal hint today?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.pseudo}</h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <span className="icon">
                {/* the image input is desactivated because it does not work on heroku
                isEmpty(video) && (
                  <>
                    <i className="fa-solid fa-image icon"></i>
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )*/}
                {video && (
                  <button onClick={() => setVideo("")}>delete video</button>
                )}
              </span>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    cancel your post
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
