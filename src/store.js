import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import rootReducer from "./redux/reducers";

const initialState = {}; // Fix the typo in the variable name

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer, // Change 'rootReducer' to 'reducer'
  preloadedState: initialState, // Change 'intialState' to 'preloadedState'
  devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

export default store;
