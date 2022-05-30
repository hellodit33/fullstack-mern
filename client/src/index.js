import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import "./styles/index.scss";
import thunk from "redux-thunk";
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

//devtools
import { composeWithDevTools } from "redux-devtools-extension";
import { getUsers } from "./actions/users.actions";
import { getPosts } from "./actions/post.actions";
import { getHint } from "./actions/hints.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

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
