import { GET_TRENDS } from "../actions/post.actions";

//sets the initial state
const initialState = {};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns action.payload for the trends
 */
export default function trendingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRENDS:
      return action.payload;
    default:
      return state;
  }
}
