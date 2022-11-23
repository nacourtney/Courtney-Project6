import { combineReducers, createStore } from "redux";

import photos from "./photos/reducers";

const reducers = combineReducers({
  photos,
});

const store = createStore(reducers);
export default store;
