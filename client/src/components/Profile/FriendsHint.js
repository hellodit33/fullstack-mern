import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import FollowHandler from "./FollowHandler";

const FriendsHint = () => {
  //Redux gets the user data, users data and error state

  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);

  //Redux gets the user data and users data error

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  /**
   * @desc notFriendsList suggests new friends to follow in a random way to the user
   */
  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id);
      });
      //suggesting friends in a randomly way
      array.sort(() => 0.5 - Math.random());
      //showing different amount of friends depending on size of screen
      if (window.innerHeight > 789) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 2;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else array.length = 0;
      setFriendsHint(array);
      console.log("array: ", array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {/* loading icon when info is loading from database */}
      {isLoading ? (
        <div className="icon">
          <i className="fa-solid fa-spinner"></i>
        </div>
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <img src={usersData[i].picture} alt="user-pic"></img>
                      <p>{usersData[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={usersData[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
