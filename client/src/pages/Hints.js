import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMood } from "../actions/user.actions";
import LeftNav from "../components/LeftNav";
import Trends from "../components/Trends";

const Hints = () => {
  const hintsList = useSelector((state) => state.hintsReducer);
  const userData = useSelector((state) => state.userReducer);
  const [mood, setMood] = useState();
  const [hint, setUpdateHint] = useState(false);

  const dispatch = useDispatch();
  console.log(hintsList);
  console.log(userData.mood);

  const handleMood = () => {
    dispatch(updateMood(userData._id, mood));
    setUpdateHint(true);
  };

  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <h1>Today's Hints</h1>
        {!hint && (
          <>
            {" "}
            <h2>What mood are you in?</h2>
            <label htmlFor="romance">Romance</label>
            <input
              type="radio"
              id="romance"
              name="mood"
              value="romance"
              onClick={(e) => setMood(e.target.value)}
            />
            <br />
            <label htmlFor="action">Action</label>
            <input
              type="radio"
              value="action"
              id="action"
              name="mood"
              onClick={(e) => setMood(e.target.value)}
            />
            <br />
            <label htmlFor="thriller">Thriller</label>
            <input
              type="radio"
              value="thriller"
              id="thriller"
              name="mood"
              onClick={(e) => setMood(e.target.value)}
            />
            <br />
            <label htmlFor="comedy">Comedy</label>
            <input
              type="radio"
              value="comedy"
              id="comedy"
              name="mood"
              onClick={(e) => setMood(e.target.value)}
            />
            <button onClick={handleMood}>get a hint</button>{" "}
          </>
        )}

        {/*  {!isEmpty(hintsList[0]) &&
            hintsList.map((hint) => <h1>{hint.filmTitle}</h1>)} //
             {hintsList.map((hints) => {
            if (userData.mood === hints.mood) {
              <Card post={hints} key={hints._id} />;
            } else return null;
          })}
          
              {hintsList
            .filter((hints) => hints.mood === userData.mood)
            .map((hints) => (
              <h1>{hints.filmTitle}</h1>
            ))}*/}
        <ul>
          {hint &&
            hintsList
              .filter((hints) => hints.mood === userData.mood)
              .map((hints) => (
                <>
                  <h1>{hints.filmTitle}</h1> <p>{hints.mood}</p>
                </>
              ))}
        </ul>
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
