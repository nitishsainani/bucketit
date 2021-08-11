import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middlewares = [thunk];

const showDevTools = () => {
  try {
    if (process.env.NODE_ENV === "development") {
      const devTool =
        (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose();
      return devTool;
    }
    return (a) => a;
  } catch (error) {
    console.warn("Please install redux devTools extension");
    return (a) => a;
  }
};

const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), showDevTools())
);

export default store;
