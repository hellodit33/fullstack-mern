import { GET_USERS } from "../actions/users.actions";

//Sets the initial state
const initialState = {};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns action payload for all users
 */
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    default:
      return state;
  }
}
