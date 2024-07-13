import { createStore } from "react-redux";
import { combineReducers, compose } from "redux";
import { app } from "./app";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = combineReducers({
  app,
});

const composeEnhancers =
  (typeof window !== "undefined" &&
    window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(reducers, composeEnhancers());

export type RootState = ReturnType<typeof store.getState>;
