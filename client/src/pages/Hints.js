import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHint } from "../actions/hints.actions";
import { updateMood } from "../actions/user.actions";
import LeftNav from "../components/LeftNav";
import Search from "../components/Search";
import Trends from "../components/Trends";
import AOS from "aos";
import { UidContext } from "../components/AppContext";
import Log from "../components/Log";
import { isEmpty } from "../components/Utils";

const Hints = () => {
  /**
   * @desc AOS is a transition style library
   */
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  const dispatch = useDispatch();

  /**
   * @desc uid is a condition for showing some info on Hints
   */
  const uid = useContext(UidContext);
  //redux gets the hints state and userData state
  const hintsList = useSelector((state) => state.hintsReducer);
  const userData = useSelector((state) => state.userReducer);

  //mood gets updated in db when user picks a mood
  const [mood, setMood] = useState();

  //the hint gets updated when mood is updated, it has to match
  const [hint, setUpdateHint] = useState(false);

  /*const [showMore, setShowMore] = useState(false);*/

  //Redirect is true when hint and mood are updated
  const [redirect, setRedirect] = useState(false);

  /*console.log(hintsList);
  console.log(userData.mood);*/

  /**
   * @desc handleMood updates the mood, while also picking a hint and redirecting
   */
  const handleMood = () => {
    dispatch(updateMood(userData._id, mood));
    setUpdateHint(true);
    setRedirect(true);
  };

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <h1>Today's Hints</h1>
        {/* the user can search and get a hint only when connected*/}
        {uid ? (
          <div>
            <Search />

            <div className="hint-question">
              <h2>What are you up for today?</h2>
              {/* picking a mood first */}
              <div className="group">
                <input
                  type="radio"
                  id="romance"
                  name="mood"
                  value="romance"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="romance">Romance</label>
                <br />

                <input
                  type="radio"
                  value="action"
                  id="action"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="action">Action</label>
                <br />

                <input
                  type="radio"
                  value="thriller"
                  id="thriller"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="thriller">Thriller</label>
                <br />

                <input
                  type="radio"
                  value="comedy"
                  id="comedy"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="comedy">Comedy</label>
                <br />

                <input
                  type="radio"
                  value="western"
                  id="western"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="western">Western</label>
                <br />

                <input
                  type="radio"
                  value="drama"
                  id="drama"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="drama">Drama</label>
                <br />

                <input
                  type="radio"
                  value="nature"
                  id="nature"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="nature">Nature</label>
                <br />

                <input
                  type="radio"
                  value="musical"
                  id="musical"
                  name="mood"
                  onClick={(e) => setMood(e.target.value)}
                />
                <label htmlFor="musical">Musical</label>
              </div>
              <br />
              {/* sending the mood second */}
              <button onClick={handleMood}>get a hint</button>{" "}
            </div>
          </div>
        ) : (
          {
            /* the user gets to log in if not connect */
          }(
            <div className="log-container">
              <Log signin={true} signup={false}></Log>
            </div>
          )
        )}
        {/* the user gets only one hint per mood */}
        <ul>
          {hint &&
            hintsList
              .filter((hints) => hints.mood === userData.mood)
              .slice(0, 1)
              .map((hints) => (
                <>
                  <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="300"
                    data-aos-offset="100"
                  >
                    <div className="hint">
                      <h2 className="hint-title">{hints.filmTitle}</h2>
                      <p className="hint-mood">
                        For when you're into: {hints.mood}
                      </p>
                      <iframe
                        src={hints.video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={hints.video}
                      ></iframe>
                      <p className="hint-synopsis">{hints.synopsis}</p>
                      <ul className="hint-platforms">
                        {hints.platforms.map((platforms) => (
                          <>
                            <li className="hint-platform">{platforms}</li>
                          </>
                        ))}
                      </ul>
                      <></>
                    </div>
                  </div>
                </>
              ))}
          {hint &&
            isEmpty(
              hintsList.filter((hints) => hints.mood === userData.mood)
            ) && (
              <>
                <div className="no-hint">
                  <p>
                    {/* the user gets to know when hints are not available for their mood (only example for assignment, since it's not great for the users) */}

                    <i style={{ color: "white", margin: "50px" }}>
                      Unfortunately, we don't have any {userData.mood} hint
                      today.
                    </i>
                  </p>
                </div>
              </>
            )}
        </ul>

        {/* when user has clicked on a mood a get another hint button appears under the hint, to go get another hint */}

        {redirect &&
          !isEmpty(
            hintsList.filter((hints) => hints.mood === userData.mood)
          ) && (
            <>
              <div className="another-hint">
                <button onClick={(event) => (window.location.href = "/hints")}>
                  get another hint
                </button>
              </div>
            </>
          )}
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
        </div>
      </div>
    </div>
  );
};

export default Hints;
