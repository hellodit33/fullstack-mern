import SocialHints from "../components/SocialHints.js";
import LeftNav from "../components/LeftNav";
import { UidContext } from "../components/AppContext";
import { useContext } from "react";
import NewPost from "../components/Post/NewPost.js";
import Log from "../components/Log";
import Trends from "../components/Trends.js";
import FriendsHint from "../components/Profile/FriendsHint.js";

const Trending = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {uid ? <NewPost /> : <Log signin={true} signup={false} />}
        </div>
        <SocialHints />
      </div>
      <div className="right-side">
        <div className="right-side-containe">
          <div className="wrapper">
            <Trends />
            {uid && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
