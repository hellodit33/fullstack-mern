import {
  GET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  UPDATE_POST,
  DELETE_POST,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/post.actions";

//Setting the initial state
const initialState = {};

/**
 *
 * @param {object} state
 * @param {object} action
 * @returns the states for each action case
 */
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            message: action.payload.message,
          };
        } else return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);
    case EDIT_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment._id === action.payload.commentId) {
                return {
                  ...comment,
                  text: action.payload.text,
                };
              } else {
                return comment;
              }
            }),
          };
        }
        return post;
      });
    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        }
        return post;
      });
    default:
      return state;
  }
}
