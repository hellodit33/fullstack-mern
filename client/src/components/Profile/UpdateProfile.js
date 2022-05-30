import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import {
  updateBio,
  updatePlatforms,
  updateStreamingPatterns,
} from "../../actions/user.actions";
import { dateParser } from "../Utils";
import FollowHandler from "./FollowHandler";

const UpdateProfile = () => {
  const [bio, setBio] = useState("");
  const [platforms, setPlatforms] = useState([]);
  const [streamingpattern, setStreamingPattern] = useState([]);
  const [step, setNextStep] = useState(false);

  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  console.log(platforms);

  const dispatch = useDispatch();

  const [followingPopup, setFollowingPopup] = useState(false);
  const [followersPopup, setFollowersPopup] = useState(false);

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  const handlePlatforms = () => {
    dispatch(updatePlatforms(userData._id, platforms));
    setNextStep(true);
  };

  const handleStreamingPattern = () => {
    dispatch(updateStreamingPatterns(userData._id, streamingpattern));
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
              <h2>Which platforms do you subscribe to?</h2>
              <label htmlFor="netflix">Netflix</label>
              <input
                type="checkbox"
                id="netflix"
                name="platforms"
                value="netflix"
                onClick={(e) =>
                  setPlatforms((state) => [...state, e.target.value])
                }
              />
              <label htmlFor="hbo">HBO</label>
              <input
                type="checkbox"
                value="HBO"
                id="hbo"
                name="platforms"
                onClick={(e) =>
                  setPlatforms((state) => [...state, e.target.value])
                }
              />
              <label htmlFor="disney+">Disney+</label>
              <input
                type="checkbox"
                value="Disney+"
                id="Disney+"
                name="platforms"
                onClick={(e) =>
                  setPlatforms((state) => [...state, e.target.value])
                }
              />
              <label htmlFor="amazon prime">Amazon Prime</label>
              <input
                type="checkbox"
                value="Amazon Prime"
                id="AmazonPrime"
                name="platforms"
                onClick={(e) =>
                  setPlatforms((state) => [...state, e.target.value])
                }
              />
              <button onClick={handlePlatforms}>save your platforms</button>

              {step && (
                <>
                  <h4>Let's continue with a game!</h4>
                  <h5>
                    What's totally you?<br></br>Keep the lines that tell the
                    truth about you.
                  </h5>

                  <label htmlFor="films-only">
                    You more or less only watch films
                  </label>
                  <input
                    type="checkbox"
                    id="films-only"
                    name="streaming-pattern"
                    value="films-only"
                    defaultChecked={!checked}
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                  />
                  <br />
                  <label htmlFor="mood-influenced">
                    Your mood always influences what you wanna watch
                  </label>
                  <input
                    type="checkbox"
                    value="mood-influenced"
                    id="mood-influenced"
                    name="streaming-pattern"
                    defaultChecked={!checked}
                    onChange={() => setChecked(!checked)}
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                  />
                  <br />
                  <label htmlFor="films-weekend">
                    You watch films mostly on weekends
                  </label>
                  <input
                    type="checkbox"
                    value="films-weekends"
                    id="films-weekends"
                    name="streaming-patterns"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                    defaultChecked={!checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <br />
                  <label htmlFor="genres-influenced">
                    You have a few genres you always go back to
                  </label>
                  <input
                    type="checkbox"
                    value="genres-influenced"
                    id="genres-influenced"
                    name="streaming-patterns"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                    defaultChecked={!checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <br />
                  <label htmlFor="TV-shows-mostly">
                    You're more into TV-shows than films
                  </label>
                  <input
                    type="checkbox"
                    value="TV-shows-mostly"
                    id="TV-shows-mostly"
                    name="streaming-patterns"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                    defaultChecked={!checked}
                    onChange={() => setChecked(!checked)}
                  />
                  <br />
                  <label htmlFor="no-mood">
                    You don't let your mood decides for what to watch
                  </label>
                  <input
                    type="checkbox"
                    value="no-mood"
                    id="no-mood"
                    name="streaming-patterns"
                    defaultChecked={!checked}
                    onChange={() => setChecked(!checked)}
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                  />
                  <button onClick={handleStreamingPattern}>next step</button>
                </>
              )}
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
    </>
  );
};

export default UpdateProfile;
