/**
 * @name allPostsReducer
 * @memberof module:reducers
 * @type {ReduxReducer}
 * @return {Object} Reducer Specification
 */
import { GET_ALL_POSTS } from "../actions/post.actions";

//Setting the initial state
const initialState = {};

/**
 *
 * @description show all posts
 * @param {object} state containing the reducer state
 * @param {object} action containing the action context
 * @returns {object} action context
 */
export default function allPostsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return action.payload;
    default:
      return state;
  }
}
