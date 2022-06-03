import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_PLATFORMS = "UPDATE_PLATFORMS";
export const UPDATE_STREAMING_PATTERN = "UPDATE_STREAMING_PATTERN";
export const UPDATE_MOOD = "UPDATE_MOOD";
export const UPDATE_RENT = "UPDATE_RENT";
export const UPDATE_GENRES = "UPDATE_GENRES";
export const UPDATE_COGENRES = "UPDATE_COGENRES";
export const UPDATE_INTERESTS = "UPDATE_INTERESTS";
export const UPDATE_COWATCHING = "UPDATE_COWATCHING";
export const UPDATE_GENDER = "UPDATE_GENDER";
export const UPDATE_YEAR_BORN = "UPDATE_YEAR_BORN";

export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";

/**
 *
 * @param {string} uid
 * @returns the user data
 *
 */
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {object} data
 * @param {string} id
 * @returns posts the uploaded user picture (not working on Heroku)
 */
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {string} bio
 * @returns the updated bio
 */
export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {array} platforms
 * @returns the updated platforms array
 */
export const updatePlatforms = (userId, platforms) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { platforms },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PLATFORMS, payload: platforms });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {array} streamingPattern
 * @returns the streaming pattern array
 */
export const updateStreamingPatterns = (userId, streamingPattern) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { streamingPattern },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_STREAMING_PATTERN,
          payload: streamingPattern,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {string} mood
 * @returns the updated user's mood
 */
export const updateMood = (userId, mood) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { mood },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_MOOD,
          payload: mood,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {string} rent
 * @returns the rent value - yes or no
 */
export const updateRent = (userId, rent) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { rent },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_RENT,
          payload: rent,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {array} genres
 * @returns the updated genres array
 */
export const updateGenres = (userId, genres) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { genres },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_GENRES,
          payload: genres,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {array} cogenres
 * @returns the updated co-genres array
 */
export const updateCoGenres = (userId, cogenres) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { cogenres },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_COGENRES,
          payload: cogenres,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {array} interests
 * @returns the updated interests array
 */
export const updateInterests = (userId, interests) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { interests },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_INTERESTS,
          payload: interests,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {boolean} cowatching
 * @returns the updated cowatching boolean
 */
export const updateCoWatching = (userId, cowatching) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { cowatching },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_COWATCHING,
          payload: cowatching,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {string} gender
 * @returns the updated gender
 */
export const updateGender = (userId, gender) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { gender },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_GENDER,
          payload: gender,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} userId
 * @param {string} yearBorn
 * @returns the updated year born
 */
export const updateYearBorn = (userId, yearBorn) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/` + userId,
      data: { yearBorn },
    })
      .then((res) => {
        dispatch({
          type: UPDATE_YEAR_BORN,
          payload: yearBorn,
        });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} followerId
 * @param {string} idToFollow
 * @returns the id to follow
 */
export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/follow/` + followerId,
      data: { idToFollow },
    })
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((err) => console.log(err));
  };
};

/**
 *
 * @param {string} followerId
 * @param {string} idToUnfollow
 * @returns the id to unfollow
 */
export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/unfollow/` + followerId,
      data: { idToUnfollow },
    })
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnfollow } });
      })
      .catch((err) => console.log(err));
  };
};
