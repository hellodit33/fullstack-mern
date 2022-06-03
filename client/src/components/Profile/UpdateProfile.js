import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import chatty from "./chatty.png";

const UpdateProfile = () => {
  //importing dispatch for the redux store
  const dispatch = useDispatch();

  //states for updating the bio
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  //Redux gets the user data, users data and error state
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  //states for showing the followers and following popup, at first false, get true when the user clicks
  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  /**
   * @desc handleUpdate updates the bio
   */
  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <>
      <div className="profile-home">
        <LeftNav />
        <div className="">
          <div className="profile-title">
            <h1>Your Hint Profile</h1>
          </div>
          <div className="update-container">
            <div className="left-part">
              <img src={userData.picture} alt="user-pic" />
              <div>
                <UploadImg />

                {/* the upload image does not work on Heroku so the errors are also commented out 
                {errors.maxSize}}
              {errors.format}*/}
              </div>
              <div className="bio-update">
                <h3>Bio</h3>
                {updateForm === false && (
                  <>
                    <p onClick={() => setUpdateForm(!updateForm)}>
                      {userData.bio}
                    </p>
                    <button onClick={() => setUpdateForm(!updateForm)}>
                      change your bio
                    </button>
                  </>
                )}
                {updateForm && (
                  <>
                    <textarea
                      type="text"
                      defaultValue={userData.bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                    <button onClick={handleUpdate}>change your bio</button>
                  </>
                )}
              </div>
              <h4>
                {/* parsing the created at date from mongodb thanks to the function in utils */}
                Hint Member since: <br />
                {dateParser(userData.createdAt)}
              </h4>
              <h5 onClick={() => setFollowingPopup(true)}>
                Following :{" "}
                {userData.following ? userData.following.length : ""} Hint
                members
              </h5>
              <h5 onClick={() => setFollowersPopup(true)}>
                Followers :{" "}
                {userData.followers ? userData.followers.length : ""} Hint
                members
              </h5>
            </div>
            <div className="right-part">
              <div className="button-onboarding">
                <img src={chatty} alt="chatty-mcchatbot"></img>
                {/* taking the user to onboarding process */}
                <button
                  onClick={(event) => (window.location.href = "/onboarding")}
                >
                  Start Onboarding!
                </button>
              </div>

              {/* showing to the users the followers and subscriptions */}
              {followingPopup && (
                <div className="popup-profil-container">
                  <div className="modal">
                    <h3>Following</h3>
                    <span
                      className="cross"
                      onClick={() => setFollowingPopup(false)}
                    >
                      &#10005;
                    </span>
                    <ul>
                      {usersData.map((user) => {
                        for (let i = 0; i < userData.following.length; i++) {
                          if (user._id === userData.following[i]) {
                            return (
                              <li key={user._id}>
                                <img src={user.picture} alt="user-pic" />
                                <h4>{user.pseudo}</h4>
                                <div className="follow-handler">
                                  <FollowHandler
                                    idToFollow={user._id}
                                    type={"suggestion"}
                                  />
                                </div>
                              </li>
                            );
                          }
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {followersPopup && (
                <div className="popup-profil-container">
                  <div className="modal">
                    <h3>Followers</h3>
                    <span
                      className="cross"
                      onClick={() => setFollowersPopup(false)}
                    >
                      &#10005;
                    </span>
                    <ul>
                      {usersData.map((user) => {
                        for (let i = 0; i < userData.followers.length; i++) {
                          if (user._id === userData.followers[i]) {
                            return (
                              <li key={user._id}>
                                <img src={user.picture} alt="user-pic" />
                                <h4>{user.pseudo}</h4>
                                <div className="follow-handler">
                                  <FollowHandler
                                    idToFollow={user._id}
                                    type={"suggestion"}
                                  />
                                </div>
                              </li>
                            );
                          }
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
