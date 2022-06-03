/**
 * @name errorReducer
 * @memberof module:reducers
 * @type {ReduxReducer}
 * @return {Object} Reducer Specification
 */
import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

//Setting the initial state for user errors and post errors
const initialState = { userError: [], postError: [] };

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns post and user errors
 */
export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        userError: [],
      };
    case GET_USER_ERRORS:
      return {
        userError: action.payload,
        postError: [],
      };
    default:
      return state;
  }
}
