import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";

const Profile = () => {
  const uid = useContext(UidContext);

  return (
    <div className="profile-page">
      {uid ? (
        <UpdateProfile />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default Profile;
