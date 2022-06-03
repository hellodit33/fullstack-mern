import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import bucket from "../../bucket.png";
import drawer from "../../drawer.png";

import "aos/dist/aos.css";
import {
  updatePlatforms,
  updateRent,
  updateStreamingPatterns,
  updateGenres,
  updateCoGenres,
  updateInterests,
  updateCoWatching,
  updateGender,
  updateYearBorn,
} from "../../actions/user.actions";

import { isEmpty } from "../Utils";
import { trusted } from "mongoose";

const Onboarding = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const [first, setFirst] = useState(true);

  const [next1, setNext1] = useState(false);

  const [next2, setNext2] = useState(false);

  const [rent2, setRent2] = useState(false);

  const [next3, setNext3] = useState(false);

  const [next4, setNext4] = useState(false);

  const [next5, setNext5] = useState(false);

  const [cowatch2, setCoWatch2] = useState(false);

  const [next6, setNext6] = useState(false);

  const [next7, setNext7] = useState(false);

  const [gender2, setGender2] = useState(false);

  const [next8, setNext8] = useState(false);

  const [yearBorn, setYearBorn] = useState();

  const [platforms, setPlatforms] = useState([]);
  const [rent, setRent] = useState(null);
  const [streamingpattern, setStreamingPattern] = useState([]);
  const [genres, setGenres] = useState([]);
  const [cogenres, setCoGenres] = useState([]);
  const [interests, setInterests] = useState([]);
  const [cowatching, setCoWatching] = useState();
  const [gender, setGender] = useState();

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const startOnboarding = () => {
    setNext1(true);
    setFirst(false);
  };
  const handlePlatforms = () => {
    dispatch(updatePlatforms(userData._id, platforms));
    setNext1(false);
    setNext2(true);
  };

  useEffect(() => {
    const handleRent = () => {
      dispatch(updateRent(userData._id, rent));
      setNext2(false);
      setRent2(true);
    };
    handleRent();
  }, [rent]);

  const handleStreamingPattern = () => {
    dispatch(updateStreamingPatterns(userData._id, streamingpattern));
    setNext3(true);
    setRent2(false);
  };

  const handleGenres = (genres) => {
    dispatch(updateGenres(userData._id, genres));

    setNext3(false);
    setNext4(true);
  };

  const handleCoGenres = () => {
    dispatch(updateCoGenres(userData._id, cogenres));
    setNext4(false);
    setNext5(true);
  };

  const handleInterests = () => {
    dispatch(updateInterests(userData._id, interests));
    setNext5(false);
    setNext6(true);
    setCoWatch2(true);
  };

  useEffect(() => {
    const handleCoWatching = () => {
      dispatch(updateCoWatching(userData._id, cowatching));
      setNext6(false);
      setNext7(true);
      setCoWatch2(false);
      setGender2(true);
    };

    handleCoWatching();
  }, [cowatching]);

  const handleGender = (gender) => {
    dispatch(updateGender(userData._id, gender));
    setNext7(false);
    setNext8(true);
    setGender2(false);
  };

  const handleYearBorn = (yearBorn) => {
    dispatch(updateYearBorn(userData._id, yearBorn));
  };

  const [checked, setChecked] = useState(true);

  const generateYearOptions = () => {
    const arr = [];

    const startYear = 1900;
    const endYear = new Date().getFullYear();

    for (let i = endYear; i >= startYear; i--) {
      arr.push(<option value={i}>{i}</option>);
    }

    return arr;
  };

  return (
    <>
      <div className="onboarding">
        <div className="main">
          {first && (
            <div className="first-text">
              <div
                data-aos="zoom-in"
                data-aos-duration="1000"
                data-aos-delay="300"
                data-aos-offset="500"
              >
                <h1>The Streaming World is anything but small, right?</h1>
              </div>
              <div
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay="900"
                data-aos-offset="200"
              >
                <h1>Dozens of streaming platforms</h1>
              </div>
              <div
                data-aos="fade-right"
                data-aos-duration="1000"
                data-aos-delay="1500"
                data-aos-offset="100"
              >
                <h1>with 3000 shows and films on each of them</h1>
              </div>
              <div
                data-aos="zoom-in-left"
                data-aos-duration="1000"
                data-aos-delay="2000"
                data-aos-offset="100"
              >
                <h1>
                  making us spend 20 minutes everyday just scrolling for what to
                  watch...
                </h1>
              </div>
              <div
                data-aos="zoom-in-right"
                data-aos-duration="1000"
                data-aos-delay="2200"
                data-aos-offset="100"
              >
                <h1>and giving us just a few headaches...</h1>
              </div>
              <div
                data-aos="zoom-in-right"
                data-aos-duration="1000"
                data-aos-delay="2500"
                data-aos-offset="100"
              >
                <button onClick={startOnboarding}>start!</button>
              </div>
            </div>
          )}

          {next1 && (
            <>
              <div className="platforms">
                <div
                  data-aos="zoom-in"
                  data-aos-duration="1000"
                  data-aos-delay="300"
                  data-aos-offset="500"
                >
                  <h1>What about your own streaming world then?</h1>
                </div>
                <div
                  data-aos="fade-right"
                  data-aos-duration="1000"
                  data-aos-delay="600"
                  data-aos-offset="200"
                >
                  <h1>Let's open it up!</h1>
                </div>
                <div
                  data-aos="fade-out"
                  data-aos-duration="1000"
                  data-aos-delay="900"
                  data-aos-offset="200"
                >
                  <h2>Which platforms do you subscribe to?</h2>
                  <div className="group">
                    <input
                      type="checkbox"
                      id="netflix"
                      name="platforms"
                      value="netflix"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="netflix">Netflix</label>
                    <br />
                    <input
                      type="checkbox"
                      value="hbo"
                      id="hbo"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="hbo">HBO</label>
                    <br />
                    <input
                      type="checkbox"
                      value="Disney+"
                      id="Disney+"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="Disney+">Disney+</label>
                    <br />
                    <input
                      type="checkbox"
                      value="AmazonPrime"
                      id="AmazonPrime"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="AmazonPrime">Amazon Prime</label>
                    <br />

                    <input
                      type="checkbox"
                      value="SVTPlay"
                      id="SVTPlay"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="SVTPlay">SVT Play</label>
                    <br />
                    <input
                      type="checkbox"
                      value="Viaplay"
                      id="Viaplay"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="Viaplay">Viaplay</label>
                    <br />
                    <input
                      type="checkbox"
                      value="CMore"
                      id="CMore"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="CMore">CMore</label>
                    <br />
                    <input
                      type="checkbox"
                      value="Apple TV+"
                      id="Apple TV+"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="Apple TV+">Apple TV+</label>
                    <br />
                    <input
                      type="checkbox"
                      value="MUBI"
                      id="MUBI"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="MUBI">MUBI</label>
                    <br />
                    <input
                      type="checkbox"
                      value="Cineasterna"
                      id="Cineasterna"
                      name="platforms"
                      onClick={(e) =>
                        setPlatforms((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="Cineasterna">Cineasterna</label>
                  </div>
                  <br />
                  <button onClick={handlePlatforms}>keep going</button>
                </div>
              </div>
            </>
          )}

          {!next1 && next2 && (
            <>
              <div className="rent">
                <h2>
                  Sometimes, the best of streaming is{" "}
                  <strong>elsewhere.</strong>
                </h2>
                <h3>Do you happen to rent sometimes?</h3>
                <div className="buttons">
                  <button onClick={(e) => setRent(e.target.value)} value="yes">
                    YES!!
                  </button>
                  <button onClick={(e) => setRent(e.target.value)} value="no">
                    NO
                  </button>
                </div>
              </div>
            </>
          )}

          {!first && !next2 && !next3 && rent && rent2 && (
            <>
              <div className="streamingpattern">
                <h4>Let's continue with a game!</h4>
                <h5>
                  What's totally you?<br></br>Click the cards that tell the
                  truth about you.
                </h5>
                <div className="group">
                  <input
                    type="checkbox"
                    id="films-only"
                    name="streaming-pattern"
                    value="films-only"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="films-only">
                    You more or less only watch films
                  </label>

                  <input
                    type="checkbox"
                    value="mood-influenced"
                    id="mood-influenced"
                    name="streaming-pattern"
                    onChange={() => setChecked(!checked)}
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="mood-influenced">
                    Your mood always influences what you wanna watch
                  </label>

                  <input
                    type="checkbox"
                    value="films-weekends"
                    id="films-weekends"
                    name="streaming-pattern"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                    onChange={() => setChecked(!checked)}
                  />

                  <label htmlFor="films-weekends">
                    You watch films mostly on weekends
                  </label>

                  <input
                    type="checkbox"
                    value="genres-influenced"
                    id="genres-influenced"
                    name="streaming-patterns"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                    onChange={() => setChecked(!checked)}
                  />
                  <label htmlFor="genres-influenced">
                    You have a few genres you always go back to
                  </label>

                  <input
                    type="checkbox"
                    value="TV-shows-mostly"
                    id="TV-shows-mostly"
                    name="streaming-patterns"
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                    onChange={() => setChecked(!checked)}
                  />
                  <label htmlFor="TV-shows-mostly">
                    You're more into TV-shows than films
                  </label>

                  <input
                    type="checkbox"
                    value="no-mood"
                    id="no-mood"
                    name="streaming-patterns"
                    onChange={() => setChecked(!checked)}
                    onClick={(e) =>
                      setStreamingPattern((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="no-mood">
                    You don't let your mood decides for what to watch
                  </label>
                </div>
                <div className="buttons">
                  <button onClick={handleStreamingPattern}>next step</button>
                </div>
              </div>
            </>
          )}

          {/*userData.streamingpattern
            .map(streamingpattern)
            .includes("mood-influenced") &&
            next3 && (
              <>
                <h2>Mood! Interesting!</h2>
                <img></img>
                <p>
                  Click on the mirror if you usually look for something to watch
                </p>
              </>
            )*/}

          {!next2 && next3 && !rent2 && (
            <>
              <div className="genres">
                <h2>
                  Now get this popcorn box full of your favorite genres of all
                  times!
                </h2>

                <div className="group">
                  <input
                    type="checkbox"
                    id="history"
                    name="genres"
                    value="history"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="history">History</label>

                  <input
                    type="checkbox"
                    id="thriller"
                    name="genres"
                    value="thriller"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="thriller">Thriller</label>

                  <input
                    type="checkbox"
                    id="light-comedy"
                    name="genres"
                    value="light-comedy"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="light-comedy">Light comedy</label>
                  <input
                    type="checkbox"
                    id="romcoms"
                    name="genres"
                    value="romcoms"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="romcoms">Romcoms</label>

                  <input
                    type="checkbox"
                    id="sci-fi"
                    name="genres"
                    value="sci-fi"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="sci-fi">Sci-fi</label>

                  <input
                    type="checkbox"
                    id="documentaries"
                    name="genres"
                    value="documentaries"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="documentaries">Documentaries</label>

                  <input
                    type="checkbox"
                    id="drama"
                    name="genres"
                    value="drama"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="drama">Drama</label>
                  <input
                    type="checkbox"
                    id="warfilms"
                    name="genres"
                    value="warfilms"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="warfilms">War films</label>
                  <input
                    type="checkbox"
                    id="horror"
                    name="genres"
                    value="horror"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="horror">Horror</label>
                  <input
                    type="checkbox"
                    id="based-on-a-true-story"
                    name="genres"
                    value="based-on-a-true-story"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="based-on-a-true-story">
                    Based on a true story
                  </label>

                  <input
                    type="checkbox"
                    id="indie"
                    name="genres"
                    value="indie"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="indie">Indie</label>

                  <input
                    type="checkbox"
                    id="scandinavian"
                    name="genres"
                    value="scandinavian"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="scandinavian">Scandinavian</label>

                  <input
                    type="checkbox"
                    id="adventure"
                    name="genres"
                    value="adventure"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="adventure">Adventure</label>

                  <input
                    type="checkbox"
                    value="animated"
                    id="animated"
                    name="genres"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="animated">Animated</label>

                  <input
                    type="checkbox"
                    value="action"
                    id="action"
                    name="genres"
                    onClick={(e) =>
                      setGenres((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="action">Action</label>
                </div>
                <img src={bucket} alt="bucket of popcorn"></img>
                <button onClick={handleGenres}>done!</button>
              </div>
            </>
          )}

          {!first && !next2 && !next3 && rent && next4 && !rent2 && (
            <>
              <div className="co-genres">
                <h2>
                  We got you a drawer so you can store some more genres that you
                  enjoy from time to time!
                </h2>
                <div className="drawer-group">
                  <img src={drawer} alt="drawer"></img>

                  <div className="group">
                    <input
                      type="checkbox"
                      id="history"
                      name="genres-sometimes"
                      value="history"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="history">History</label>

                    <input
                      type="checkbox"
                      id="thriller"
                      name="genres-sometimes"
                      value="thriller"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="thriller">Thriller</label>

                    <input
                      type="checkbox"
                      id="light-comedy"
                      name="genres-sometimes"
                      value="light-comedy"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="light-comedy">Light comedy</label>
                    <input
                      type="checkbox"
                      id="romcoms"
                      name="genres-sometimes"
                      value="romcoms"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="romcoms">Romcoms</label>

                    <input
                      type="checkbox"
                      id="sci-fi"
                      name="genres-sometimes"
                      value="sci-fi"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="sci-fi">Sci-fi</label>

                    <input
                      type="checkbox"
                      id="documentaries"
                      name="genres-sometimes"
                      value="documentaries"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="documentaries">Documentaries</label>

                    <input
                      type="checkbox"
                      id="drama"
                      name="genres-sometimes"
                      value="drama"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="drama">Drama</label>
                    <input
                      type="checkbox"
                      id="warfilms"
                      name="genres-sometimes"
                      value="warfilms"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="warfilms">War films</label>
                    <input
                      type="checkbox"
                      id="horror"
                      name="genres-sometimes"
                      value="horror"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="horror">Horror</label>
                    <input
                      type="checkbox"
                      id="based-on-a-true-story"
                      name="genres-sometimes"
                      value="based-on-a-true-story"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="based-on-a-true-story">
                      Based on a true story
                    </label>

                    <input
                      type="checkbox"
                      id="indie"
                      name="genres-sometimes"
                      value="indie"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="indie">Indie</label>

                    <input
                      type="checkbox"
                      id="scandinavian"
                      name="genres-sometimes"
                      value="scandinavian"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="scandinavian">Scandinavian</label>

                    <input
                      type="checkbox"
                      id="adventure"
                      name="genres-sometimes"
                      value="adventure"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="adventure">Adventure</label>

                    <input
                      type="checkbox"
                      value="animated"
                      id="animated"
                      name="genres-sometimes"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="animated">Animated</label>

                    <input
                      type="checkbox"
                      value="action"
                      id="action"
                      name="genres-sometimes"
                      onClick={(e) =>
                        setCoGenres((state) => [...state, e.target.value])
                      }
                    />
                    <label htmlFor="action">Action</label>
                  </div>
                </div>
                <button onClick={handleCoGenres}>done!</button>
              </div>
            </>
          )}

          {!next4 && next5 && (
            <>
              <div className="interests">
                <h2>Now, what subjects are captivating you in films?</h2>
                <div className="group">
                  <input
                    type="checkbox"
                    id="history"
                    name="interests"
                    value="history"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="history">History</label>

                  <input
                    type="checkbox"
                    value="science"
                    id="science"
                    name="interests"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="science">Science</label>

                  <input
                    type="checkbox"
                    value="arts"
                    id="arts"
                    name="interests"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="arts">Arts</label>

                  <input
                    type="checkbox"
                    value="literaturewriting"
                    id="literaturewriting"
                    name="interests"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="literaturewriting">Literature/writing</label>
                  <input
                    type="checkbox"
                    id="movies"
                    name="interests"
                    value="movies"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="movies">Movies</label>

                  <input
                    type="checkbox"
                    id="sustainability"
                    name="interests"
                    value="sustainability"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="sustainability">Sustainability</label>
                  <input
                    type="checkbox"
                    id="feminism"
                    name="interests"
                    value="feminism"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="feminism">Feminism</label>
                  <input
                    type="checkbox"
                    id="politicseconomics"
                    name="interests"
                    value="politicseconomics"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="politicseconomics">
                    Politics and Economics
                  </label>
                  <input
                    type="checkbox"
                    id="finance"
                    name="interests"
                    value="finance"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="finance">Finance</label>
                  <input
                    type="checkbox"
                    id="tech"
                    name="interests"
                    value="tech"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="tech">Tech</label>
                  <input
                    type="checkbox"
                    id="nature"
                    name="interests"
                    value="nature"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="nature">Nature</label>
                  <input
                    type="checkbox"
                    id="psychology"
                    name="interests"
                    value="psychology"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="psychology">Psychology</label>
                  <input
                    type="checkbox"
                    id="travels"
                    name="interests"
                    value="travels"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="travels">Travels</label>
                  <input
                    type="checkbox"
                    id="space"
                    name="interests"
                    value="space"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="space">Space</label>
                  <input
                    type="checkbox"
                    id="sports"
                    name="interests"
                    value="sports"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="sports">Sports</label>
                  <input
                    type="checkbox"
                    id="entrepreneuring"
                    name="interests"
                    value="entrepreneuring"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="entrepreneuring">Entrepreneuring</label>
                  <input
                    type="checkbox"
                    id="familylife"
                    name="interests"
                    value="familylife"
                    onClick={(e) =>
                      setInterests((state) => [...state, e.target.value])
                    }
                  />
                  <label htmlFor="familylife">Family Life</label>
                </div>
                <button onClick={handleInterests}>keep going!</button>
              </div>
            </>
          )}

          {!next5 && next6 && cowatch2 && (
            <>
              <div className="co-watching">
                <h2>Awesome!</h2>
                <h2>Finally, do you often co-watch?</h2>
                <div className="buttons">
                  <button
                    onClick={(e) => setCoWatching(e.target.value)}
                    value="true"
                  >
                    YES!!
                  </button>
                  <button
                    onClick={(e) => setCoWatching(e.target.value)}
                    value="false"
                  >
                    NOPE
                  </button>
                </div>
              </div>
            </>
          )}

          {!next3 &&
            !next4 &&
            !next5 &&
            !next6 &&
            next7 &&
            gender2 &&
            !rent2 &&
            !cowatch2 && (
              <>
                <div className="gender">
                  <h2>By the way, what gender are you?</h2>
                  <div className="buttons">
                    <button
                      onClick={(e) => handleGender(e.target.value)}
                      value="female"
                    >
                      Female
                    </button>
                    <button
                      onClick={(e) => handleGender(e.target.value)}
                      value="nonbinary"
                    >
                      Non-binary
                    </button>
                    <button
                      onClick={(e) => handleGender(e.target.value)}
                      value="male"
                    >
                      Male
                    </button>
                  </div>
                </div>
              </>
            )}

          {!next3 &&
            !next4 &&
            !next5 &&
            !next6 &&
            !next7 &&
            !rent2 &&
            !gender2 &&
            next8 &&
            !cowatch2 && (
              <div className="age">
                <h3>Finally, what year were you born?</h3>
                <h4>
                  This can help us understand who your favorite actors can be.
                </h4>
                <select
                  className="form--dob-year"
                  name="year"
                  onChange={(e) => handleYearBorn(e.target.value)}
                >
                  <option value="0">Year</option>
                  {generateYearOptions()}
                </select>
                <br />
                <br />
                <br />
                <button onClick={(event) => (window.location.href = "/hints")}>
                  now, go get a hint
                </button>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default Onboarding;
