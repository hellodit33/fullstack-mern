import axios from "axios";

export const GET_HINT = "GET_HINT";

export const getHint = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/hint`)
      .then((res) => {
        dispatch({ type: GET_HINT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
