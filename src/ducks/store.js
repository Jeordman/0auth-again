import { createStore, combineReducers, applyMiddleware } from "redux";

import promiseMiddleware from "redux-promise-middleware";

//reducers
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
    applyMiddleware(promiseMiddleware)
  )
);
