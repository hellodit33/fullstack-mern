import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./styles/index.scss";
import thunk from "redux-thunk";
//store from redux
import { legacy_createStore as createStore, applyMiddleware } from "redux";
//reducers
import rootReducer from "./reducers";

//devtools
import { composeWithDevTools } from "redux-devtools-extension";

//actions
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";
import { getHint } from "./actions/hints.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

//dispatch users, posts and hints so that they are always available on the site
store.dispatch(getUsers());
store.dispatch(getPosts());
store.dispatch(getHint());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
