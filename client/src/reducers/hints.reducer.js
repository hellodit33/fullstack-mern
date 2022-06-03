import { GET_HINT } from "../actions/hints.actions";

//sets initial state for all hints
const initialState = {};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns all hints in payload
 */
export default function hintsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HINT:
      return action.payload;
    default:
      return state;
  }
}
