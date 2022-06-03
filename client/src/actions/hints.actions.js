import axios from "axios";

export const GET_HINT = "GET_HINT";
export const GET_ALL_HINTS = "GET_ALL_HINTS";

/**
 *
 * @param {string} num
 * @returns gets a slice of hints
 */
export const getHint = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/hint`)
      .then((res) => {
        const array = res.data.slice(0, num);

        dispatch({ type: GET_HINT, payload: array });
        dispatch({ type: GET_ALL_HINTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
