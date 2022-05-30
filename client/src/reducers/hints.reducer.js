import { GET_HINT } from "../actions/hints.actions";

const initialState = {};

export default function hintsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HINT:
      return action.payload;
    default:
      return state;
  }
}
