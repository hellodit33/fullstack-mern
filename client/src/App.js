import React, { createContext, useEffect, useState } from "react";
import { UidContext } from "./components/AppContext";
import axios from "axios";
import Ways from "./components/Routes/index";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

function App() {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  //the token is the uid so that we can identify the user in Context
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Ways />
    </UidContext.Provider>
  );
}

export default App;
