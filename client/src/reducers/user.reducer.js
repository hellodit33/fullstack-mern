import {
  FOLLOW_USER,
  GET_USER,
  UNFOLLOW_USER,
  UPDATE_BIO,
  UPDATE_PLATFORMS,
  UPLOAD_PICTURE,
  UPDATE_STREAMING_PATTERN,
  UPDATE_MOOD,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    case UPDATE_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case UPDATE_STREAMING_PATTERN:
      return {
        ...state,
        streamingPattern: action.payload,
      };
    case UPDATE_MOOD:
      return {
        ...state,
        mood: action.payload,
      };
    case FOLLOW_USER:
      return {
        ...state,
        following: [action.payload.idToFollow, ...state.following],
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        following: state.following.filter(
          (id) => id !== action.payload.idToUnfollow
        ),
      };
    default:
      return state;
  }
}
