/**
 * @file reducers/index.js
 * @module reducers
 * @desc This is the encapsulation for all reducers
 * @return {Object} List of reducers combined
 */
import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import allPostsReducer from "./allPosts.reducer";
import trendingReducer from "./trending.reducer";
import errorReducer from "./error.reducer";
import hintsReducer from "./hints.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  allPostsReducer,
  trendingReducer,
  errorReducer,
  hintsReducer,
});
