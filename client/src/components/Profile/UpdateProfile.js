import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import Onboarding from "./Onboarding";
import {
  updateBio,
  updatePlatforms,
  updateStreamingPatterns,
} from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";
import chatty from "./chatty.png";

const UpdateProfile = () => {
  const [bio, setBio] = useState("");
  const [onboarding, setOnboarding] = useState(false);

  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);

  const dispatch = useDispatch();

  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  const [checked, setChecked] = useState(true);

  return (
    <>
      <div className="profile-home">
        <LeftNav />
        <div className="">
          <div className="profile-title">
            <h1>Your Hint Profile</h1>
            {/*<h1>{userData.pseudo}</h1>*/}
          </div>
          <div className="update-container">
            <div className="left-part">
              <img src={userData.picture} alt="user-pic" />
              <div>
                <UploadImg />

                {error.maxSize}
                {error.format}
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
                <button
                  onClick={(event) => (window.location.href = "/onboarding")}
                >
                  Start Onboarding!
                </button>
              </div>

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
